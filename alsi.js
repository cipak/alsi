const UPLOAD_FILE = 'Upload file...';
const LOCAL_URL = 'Local url...';
let AGGS = {1: null, 2: null};
let PROMISES = {1: null, 2: null};
let TOTAL_DIFFS;
let LOCAL_URLS = {};

(function () {
    let opts = [UPLOAD_FILE];
    for (let [appKey, app] of _.entries(CONFIG)) {
        opts.push('-');
        opts.push(..._.keys(app.envs).map(x => appKey + ' - ' + x));
        opts.push(appKey + ' - ' + LOCAL_URL);
        LOCAL_URLS[appKey] = app.localUrl;
    }
    setOptions($('#env1'), opts);
    setOptions($('#env2'), opts);
}());

function $(sel) {
    return document.querySelector(sel);
}

function $$(sel) {
    return document.querySelectorAll(sel);
}

function setenv(k) {
    var fileInput = $('#file' + k);
    var urlInput = $('#url' + k);

    showStatus(k, '');
    setaggs(k, null);
    hide($('#save' + k));
    hide(fileInput);
    hide(urlInput);
    hide($('#refresh_button'));
    fileInput.value = '';

    var appenv = $('#env' + k).value;
    if (!appenv) {
        return;
    }

    let [app] = appenv.split(' - ');

    var isFile = appenv === UPLOAD_FILE;
    var isUrl = appenv.includes(LOCAL_URL);

    if (isFile) {
        show(fileInput);
        fileInput.click();
    } else if (isUrl) {
        urlInput.value = LOCAL_URLS[app];
        show(urlInput);
        if (urlInput.value) {
            load_agg(k);
        }
    } else {
        load_agg(k);
    }
}

function load_agg(k) {
    showStatus(k, 'Loading...');
    var appenv = $('#env' + k).value;
    let [app, env] = appenv.split(' - ');
    PROMISES[k] = getagg(app, env, $('#url' + k).value).then(aggs => {
        setaggs(k, aggs);
        showStatus(k, 'OK');
        show($('#save' + k));
    }, err => {
        showStatus(k, String(err));
    });
}

function upload(k) {
    showStatus(k, 'Loading file...');
    setaggs(k, null);
    PROMISES[k] = readAggFile($('#file' + k).files[0]).then(json => {
        try {
            var aggs = JSON.parse(json);
            setaggs(k, aggs);
            showStatus(k, 'OK');
        } catch (e) {
            showStatus(k, 'Bad JSON: ' + e);
            throw(e);
        }
    });
}


function update_local_url(k) {
    var appenv = $('#env' + k).value;
    let [app] = appenv.split(' - ');
    LOCAL_URLS[app] = $('#url' + k).value;
    load_agg(k);
}

function comp() {
    showStatus(3, 'Comparing...');
    empty($('#aggs'));

    Promise.all([PROMISES[1], PROMISES[2]]).then(() => {
        showStatus(3, '');
        TOTAL_DIFFS = {eq: 0, neg: 0, pos: 0};
        var allKeys = _.union(_.keys(AGGS[1]), _.keys(AGGS[2])).sort();
        allKeys.forEach(key => showAgg(key, AGGS[1][key] || {}, AGGS[2][key] || {}));

        var num_dif = TOTAL_DIFFS.neg + TOTAL_DIFFS.pos;
        if (num_dif) {
            showStatus(4, num_dif + ' differences found.');
        } else {
            showStatus(4, 'No differences found.', 'ok');
        }

        show($('#refresh_button'));

        $('#num_eq').innerText = TOTAL_DIFFS.eq;
        $('#num_neg').innerText = TOTAL_DIFFS.neg;
        $('#num_pos').innerText = TOTAL_DIFFS.pos;
        $('#num_dif').innerText = num_dif;
        $('#num_all').innerText = num_dif + TOTAL_DIFFS.eq;
    });
}

function getagg(app, env, localUrl) {
    let isUrl = env === LOCAL_URL;

    return Promise.all(_.map(CONFIG[app].indexes, (aggDef, type) => {
        let request = {
            "aggs": _.mapValues(aggDef, field => ({
                "terms": {"order": {"_term": "asc"}, "size": 99999, "field": field}
            }))
        };

        if (!isUrl) {
            request = {
                "context": {"index": "dev", "type": type},
                "request": request
            };
        }

        let url = isUrl ? (localUrl + '/' + type + '/_search') : CONFIG[app].envs[env];

        return esRequest(url, request).then(resp => {
            var aggs = {};
            let results = isUrl ? resp : resp.Results;
            for (let [key, agg] of Object.entries(results.aggregations)) {
                let name = type + ': ' + key;
                aggs[name] = {};
                agg.buckets.forEach(b => aggs[name][b.key] = b.doc_count);
            }
            return aggs;
        });

    })).then(allAggs => _.merge.apply(_, allAggs));
}

function esRequest(url, body) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    }).then(resp => {
        if (!resp.ok) {
            throw Error(resp.statusText);
        }
        return resp.json();
    });
}

function showAgg(aggKey, agg1, agg2) {
    var tab = el('table');

    tab.innerHTML = '<tr><th>Key</th><th>Old</th><th>New</th><th>Diff</th></tr>';

    var keys1 = _.keys(agg1);
    var keys2 = _.keys(agg2);
    var allkeys = _.union(keys1, keys2);

    tab.appendChild(buildRow('=== COUNT ===', keys1.length, keys2.length));
    tab.appendChild(buildRow('=== TOTAL ===', calcTotal(agg1), calcTotal(agg2)));
    allkeys.forEach(key => tab.appendChild(buildRow(key, agg1[key], agg2[key])));

    var cont = el('div');
    cont.appendChild(el('h4', aggKey));
    cont.appendChild(tab);
    $('#aggs').appendChild(cont);
}

function buildRow(key, val1, val2) {
    var tr = el('tr');
    var td = el('td', key);
    tr.appendChild(td);
    td = el('td', val1);
    tr.appendChild(td);
    td = el('td', val2);
    tr.appendChild(td);
    var dif = (Number(val2) || 0) - (Number(val1) || 0);
    td = el('td', dif);

    if (dif < 0) {
        TOTAL_DIFFS.neg++;
    }
    else if (dif > 0) {
        TOTAL_DIFFS.pos++;
    }
    else {
        TOTAL_DIFFS.eq++;
    }

    tr.classList.add(dif < 0 ? 'negative-dif' : dif > 0 ? 'positive-dif' : 'no-dif');

    tr.appendChild(td);
    return tr;
}

function el(tag, text, attrs) {
    let el = document.createElement(tag);
    el.innerText = text === undefined ? '' : text;
    if (attrs) {
        for (let [aName, aValue] of Object.entries(attrs)) {
            el.setAttribute(aName, aValue);
        }
    }
    return el;
}

function showENP(eq, neg, pos) {
    $$('.no-dif').forEach(el => toggle(el, eq));
    $$('.negative-dif').forEach(el => toggle(el, neg));
    $$('.positive-dif').forEach(el => toggle(el, pos));
}

function toggle(el, show) {
    el.classList.toggle('hidden', !show);
}

function show(el) {
    toggle(el, true);
}

function hide(el) {
    toggle(el, false);
}

function calcTotal(agg) {
    return Object.values(agg).reduce((a, b) => a + b, 0);
}

function setOptions(select, options) {
    empty(select);
    select.append(buildOption('', ''));
    options.forEach(opt => select.appendChild(buildOption(opt, opt)));
}

function buildOption(val, text) {
    if (val === '-') {
        text = '──────────';
    }
    let opt = el('option', text, {value: val});
    if (val === '-') {
        opt.disabled = true;
    }
    return opt;
}

function empty(el) {
    el.innerHTML = '';
}

function readAggFile(file) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(file);
    });
}

function showStatus(k, status, type) {
    let elem = $('#status' + k);
    elem.innerText = status;
    type = type || (status === 'OK' ? 'ok' : status.endsWith('...') ? 'loading' : 'error');
    elem.className = 'status ' + type;
}

function setaggs(k, aggs) {
    AGGS[k] = aggs;

    let bothReady = AGGS[1] && AGGS[2];
    toggle($('#actions'), bothReady);
    empty($('#aggs'));

    showStatus(4, '');
    if (bothReady) {
        comp();
    }
}

function saveFile(k) {
    var now = new Date().toISOString();
    var name = $('#env' + k).value + ' ' + now.slice(0, 10) + ' ' + now.slice(11, 13) + 'h' + now.slice(14, 16) + '.json';
    var json = JSON.stringify(AGGS[k], null, 4);
    download(name, json);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function refresh(k) {
    var appenv = $('#env' + k).value;

    var isFile = appenv === UPLOAD_FILE;
    if (isFile) {
        upload(k);
    } else {
        setenv(k);
    }
}