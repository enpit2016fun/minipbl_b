var ParentService = function () {

    this.initialize = function() {
        var deferred = $.Deferred();
        // もし、LocalStorageにデータが存在すれば、それを使う。
		// 無かったら、dataInitializeで、初期データ入力をする。
		parents = JSON.parse(window.localStorage.getItem("parent"));
		if ( parents.length <=0 ) {
			this.dataInitialize();
		}
        deferred.resolve();
        return deferred.promise();
    }

    this.dataInitialize = function() {
         // 初期データ生成
        window.localStorage.setItem("parent", JSON.stringify(
            [
                {"id": 1, "firstName": "亀田", "lastName": "鶴子", "Addr": "函館市亀田中野町1－1", "ZIPCode": "123-4567","email": "KameTusu@fakemail.com", "method": "郵送", "pic": "James_King.jpg", "targetd": 1},
                {"id": 2, "firstName": "田中", "lastName": "将大", "Addr": "函館市亀田中野町2－2", "ZIPCode": "234-5678","email": "YankeesTanaka@fakeemail.com", "method": "電子メール", "pic": "Julie_Taylor.jpg", "targetd": 1},
				{"id": 3, "firstName": "中野", "lastName": "信子", "Addr": "函館市亀田中野町3－3", "ZIPCode": "345-6789","email": "BrainScientist@fakeemail.com", "method": "配信不要", "pic": "Eugene_Lee.jpg", "targetd": 1},
				{"id": 4, "firstName": "朝", "lastName": "市子", "Addr": "函館市亀田中野町4－4", "ZIPCode": "456-7890","email": "KaniIka@fakeemail.com", "method": "配信不要", "pic": "Eugene_Lee.jpg", "targetd": 1},
				{"id": 5, "firstName": "中島", "lastName": "廉", "Addr": "函館市亀田中野町5－5", "ZIPCode": "567-8901","email": "SakanaYasai@fakeemail.com", "method": "配信不要", "pic": "Eugene_Lee.jpg", "targetd": 1},
				{"id": 6, "firstName": "土筆", "lastName": "紀子", "Addr": "函館市亀田中野町6－6", "ZIPCode": "678-9012","email": "TsukushiNoko@fakeemail.com", "method": "配信不要", "pic": "Eugene_Lee.jpg", "targetd": 1},
            ]
        ));
    }

    this.findById = function (id) {
        var deferred = $.Deferred(),
            parents = JSON.parse(window.localStorage.getItem("parent")),
            parent = null,
            l = parents.length;
        for (var i = 0; i < l; i++) {
            if (parents[i].id === id) {
                parent = parents[i];
                break;
            }
        }

        deferred.resolve(parent);
        return deferred.promise();
    }

// email アドレスに含まれる文字で検索する例
    this.findByEmail = function (searchKey) {
        var deferred = $.Deferred(),
            parents = JSON.parse(window.localStorage.getItem("parent")),
            results = parents.filter(function (element) {
                var emailaddr = element.email;
                return emailaddr.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        deferred.resolve(results);
        return deferred.promise();
    }

// 全レコードを獲得
	this.getAll = function () {
		parents = JSON.parse(window.localStorage.getItem("parent"));
		return parents
	}

// 全レコードを置き換え
	this.putAll = function (parents) {
		window.localStorage.setItem("parent", JSON.stringify(parents));
	}

// ファイル出力

	this.output = function (parents, dir) {
		// jsonファイル出力
		// 調査・検討中　MiniPBLでは実装できないかも　(^_^;
	}

}