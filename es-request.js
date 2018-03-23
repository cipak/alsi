ES_REQUEST_BODY = {
		"campaignID":"3fbfadbf-783c-44db-86dd-eb492100af59y",
		"context":{"index":"dev","type":"bundle-detail"},
		"request":{
			"size":0,
			"query":{
				"bool":{
					"should":[],
					"must_not":[{
					}]
				}
			},
			"aggs": {
				"Device ID": {
					"terms": {
						"field": "services.Mobile.device.id",
						"order": {"_term": "asc"},
						"size": 999
					}
				},
				"Device Name": {
					"terms": {
						"field": "services.Mobile.device.name",
						"order": {"_term": "asc"},
						"size": 999
					}
				},
				"Tariff ID": {
					"terms": {
						"field": "services.Mobile.tariff.id",
						"order": {"_term": "asc"},
						"size": 999
					}
				},
				"Provider ID": {
					"terms": {
						"field": "provider.id",
						"order": {"_term": "asc"},
						"size": 999
					}
				}
			}
		}
	}