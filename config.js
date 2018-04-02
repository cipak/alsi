CONFIG = {
    "OLS": {
        "envs": {
            //"local":"http://172.16.122.80:9200/ols/bundle-detail/_search/",
            "DEV":  "https://search-api-dcg-ols.p2p-trials-dev.cwscloud.net/api/v1/search/",
            "UAT":  "https://search-api-dcg-ols.p2p-trials-uat.cwscloud.net/api/v1/search/",
            "PROD": "https://search-api-dcg-ols.p2p-trials.cwscloud.net/api/v1/search/"
        },
        "localUrl": "http://localhost:9200/ols",
        "indexes": {
            "bundle-detail": {
                "Device ID":     "services.Mobile.device.id",
                "Device Name":   "services.Mobile.device.name",
                "Device Colour": "services.Mobile.device.colour.na",
                "Tariff ID":     "services.Mobile.tariff.id",
                "Manufact ID":   "services.Mobile.device.manufacture.id",
                "Manufact Name": "services.Mobile.device.manufacture.name",
                "Provider ID":   "provider.id",
                "Monthly Fee":   "cost.monthlyFee"
            },
            "devices": {
                "Manufacturer":  "manufacturer",
                "Score":         "score"
            }
        }
    },

    "Webhelp": {
        "envs": {
            "DEV":  "https://search-api-webhelp-voda.p2p-trials-dev.cwscloud.net/api/v1/search/",
            "UAT":  "https://search-api-webhelp-voda.p2p-trials-uat.cwscloud.net/api/v1/search/",
            "PROD": "https://search-api-webhelp-voda.p2p-trials.cwscloud.net/api/v1/search/"
        },
        "localUrl": "http://localhost:9200/webhelp",
        "indexes": {
            "bundle-detail": {
                "Device ID":     "services.Mobile.device.id",
                "Device Name":   "services.Mobile.device.name.na",
                //"Device Colour": "services.Mobile.device.colour",
                //"Tariff ID":     "services.Mobile.tariff.id",
                "Manufact ID":   "services.Mobile.device.manufacture.id",
                "Manufact Name": "services.Mobile.device.manufacture.name",
                "Provider ID":   "provider.id",
                "Monthly Fee":   "cost.monthlyFee"
            }
        },
    },

    "DCP": {
        "envs": {
            "DEV": "https://search-api-cap-dcp.p2p-trials-dev.cwscloud.net/api/v1/search/",
            "UAT": "https://search-api-cap-dcp.p2p-trials-uat.cwscloud.net/api/v1/search/",
            "PROD": "https://search-api-cap-dcp.p2p-trials.cwscloud.net/api/v1/search/"
        },
        "localUrl": "http://localhost:9200/preston",
        "indexes": {
            "bundle-detail": {
                "Device ID (no colour)":      "services.Mobile.device.id",
                "Device Name (no colour)":    "services.Mobile.name.na",
                //"Device ID (no colour)":      "services.Mobile.id.na",
                "Device Name (with colour)":  "services.Mobile.device.name.na",
                "Device Colour":              "services.Mobile.device.colour.na",
                //"Tariff ID":                  "services.Mobile.tariff.id.na",
                "Manufact ID":                "services.Mobile.device.manufacture.id",
                "Manufact Name":              "services.Mobile.device.manufacture.name",
                "Provider ID":                "provider.id",
                "Monthly Fee":                "cost.monthlyFee"
            }
        }
    },

    "O2": {
        "envs": {
            "DEV": "https://search-api-cap-o2.p2p-trials-dev.cwscloud.net/api/v1/search/",
            "UAT": "https://search-api-cap-o2.p2p-trials-uat.cwscloud.net/api/v1/search/",
            "PROD": "https://search-api-cap-o2.p2p-trials.cwscloud.net/api/v1/search/"
        },
        "localUrl": "http://localhost:9200/o2",
        "indexes": {
            "bundle-detail": {
                "Device ID":      "services.Mobile.device.id",
                //"Device Name":    "services.Mobile.name.na",
                "Manufact ID":   "services.Mobile.device.manufacture.id",
                "Manufact Name": "services.Mobile.device.manufacture.name",
                "Provider ID":   "provider.id",
                "Monthly Fee":   "cost.monthlyFee"
            }
        }
    }
};