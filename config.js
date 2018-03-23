CONFIG = {
	"OLS": {
		"envs": {
			"local":"http://172.16.122.80:9200/ols/bundle-detail/_search/",
			"DEV":  "https://search-api-dcg-ols.p2p-trials-dev.cwscloud.net/api/v1/search/",
			"UAT":  "https://search-api-dcg-ols.p2p-trials-uat.cwscloud.net/api/v1/search/",
			"PROD": "https://search-api-dcg-ols.p2p-trials.cwscloud.net/api/v1/search/"
		},
		"requestBody": {
			"campaignID":"3fbfadbf-783c-44db-86dd-eb492100af59y",
			"context":{"index":"dev","type":"bundle-detail"},
			"request":{
				"size": 0,
				"aggs": {
					"Device ID":     {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.id"}},
					"Device Name":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.name"}},
					"Device Colour": {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.colour.na"}},
					"Tariff ID":     {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.tariff.id"}},
					"Manufact ID":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.manufacture.id"}},
					"Manufact Name": {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.manufacture.name"}},
					"Provider ID":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "provider.id"}},
					"Monthly Fee":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "cost.monthlyFee"}}
				}
			}
		}
	},

	"Webhelp": {
		"envs": {
			"DEV":  "https://search-api-webhelp-voda.p2p-trials-dev.cwscloud.net/api/v1/search/",
			"UAT":  "https://search-api-webhelp-voda.p2p-trials-uat.cwscloud.net/api/v1/search/",
			"PROD": "https://search-api-webhelp-voda.p2p-trials.cwscloud.net/api/v1/search/"
		},
		"requestBody": {
			"campaignID":"3fbfadbf-783c-44db-86dd-eb492100af59y",
			"context":{"index":"dev","type":"bundle-detail", "showUnavailable": true},
			"request":{
				"size": 0,
				"aggs": {
					"Device ID":     {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.id"}},
					"Device Name":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.name.na"}},
					//"Device Colour": {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.colour.na"}},
					//"Tariff Name":     {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.tariff.id.na"}},
					"Manufact ID":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.manufacture.id"}},
					"Manufact Name":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.manufacture.name"}},
					"Provider ID":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "provider.id"}},
					"Monthly Fee":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "cost.monthlyFee"}}
				}
			}
		}
	},

	"DCP": {
		"envs": {
			"DEV": "https://search-api-cap-dcp.p2p-trials-dev.cwscloud.net/api/v1/search/",
			"UAT": "https://search-api-cap-dcp.p2p-trials-uat.cwscloud.net/api/v1/search/",
			"PROD": "https://search-api-cap-dcp.p2p-trials.cwscloud.net/api/v1/search/"
		},
		"requestBody": {
			"campaignID":"3fbfadbf-783c-44db-86dd-eb492100af59y",
			"context":{"index":"dev","type":"bundle-detail"},
			"request":{
				"size": 0,
				"aggs": {
					"Device ID (no colour)":      {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.id"}},
					"Device Name (no colour)":    {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.name.na"}},
					//"Device ID (no colour)":    {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.id.na"}},
					"Device Name (with colour)":  {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.name.na"}},
					"Device Colour": {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.colour.na"}},
					//"Tariff ID":     {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.tariff.id.na"}},
					"Manufact ID":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.manufacture.id"}},
					"Manufact Name":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.manufacture.name"}},
					"Provider ID":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "provider.id"}},
					"Monthly Fee":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "cost.monthlyFee"}}

				}
			}
		}
	},

	"O2": {
		"envs": {
			"DEV": "https://search-api-cap-o2.p2p-trials-dev.cwscloud.net/api/v1/search/",
			"UAT": "https://search-api-cap-o2.p2p-trials-uat.cwscloud.net/api/v1/search/",
			"PROD": "https://search-api-cap-o2.p2p-trials.cwscloud.net/api/v1/search/"
		},
		"requestBody": {
			"campaignID":"3fbfadbf-783c-44db-86dd-eb492100af59y",
			"context":{"index":"dev","type":"bundle-detail"},
			"request":{
				"size": 0,
				"aggs": {
					"Device ID":      {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.id"}},
					"Device Name":    {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.name.na"}},
					"Manufact ID":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.manufacture.id"}},
					"Manufact Name":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "services.Mobile.device.manufacture.name"}},
					"Provider ID":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "provider.id"}},
					"Monthly Fee":   {"terms": {"order": {"_term": "asc"}, "size": 999, "field": "cost.monthlyFee"}}					
				}
			}
		}
	}


}