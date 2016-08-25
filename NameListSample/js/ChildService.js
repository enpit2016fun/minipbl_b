var ChildService = function () {

    this.initialize = function() {
        var deferred = $.Deferred();
        // もし、LocalStorageにデータが存在すれば、それを使う。
		// 無かったら、dataInitializeで、初期データ入力をする。
		childs = JSON.parse(window.localStorage.getItem("child"));
		if ( childs.length <=0 ) {
			this.dataInitialize();
		}
		deferred.resolve();
		return deferred.promise();
    }

    this.dataInitialize = function() {
         // 初期データ生成
        window.localStorage.setItem("child", JSON.stringify(
            [
                {"id": 1, "parent_id": "1", "firstName": "亀田", "lastName": "亀雄", "pic": "James_King.jpg", "enter_year": "2012", "grad_year": "2016"},
                {"id": 2, "parent_id": "1", "firstName": "亀田", "lastName": "うさぎ", "pic": "Julie_Taylor.jpg", "enter_year": "2014", "grad_year": "2016"},
				{"id": 3, "parent_id": "2", "firstName": "田中", "lastName": "佑典", "pic": "Eugene_Lee.jpg", "enter_year": "2009", "grad_year": "2014"},
                {"id": 4, "parent_id": "3", "firstName": "中野", "lastName": "函", "pic": "Eugene_Lee.jpg", "enter_year": "1994", "grad_year": "1998"},
                {"id": 5, "parent_id": "3", "firstName": "中野", "lastName": "舘", "pic": "Eugene_Lee.jpg", "enter_year": "2013", "grad_year": "2015"},
				{"id": 6, "parent_id": "4", "firstName": "朝", "lastName": "一", "pic": "Eugene_Lee.jpg", "enter_year": "1994", "grad_year": "1998"},
                {"id": 7, "parent_id": "5", "firstName": "中島", "lastName": "茂", "pic": "Eugene_Lee.jpg", "enter_year": "2013", "grad_year": "2015"},
				{"id": 8, "parent_id": "5", "firstName": "中島", "lastName": "寿子", "pic": "Eugene_Lee.jpg", "enter_year": "2015", "grad_year": "2017"},
				{"id": 9, "parent_id": "5", "firstName": "中島", "lastName": "司", "pic": "Eugene_Lee.jpg", "enter_year": "2016", "grad_year": "2018"},
				{"id": 10, "parent_id": "6", "firstName": "土筆", "lastName": "杉菜", "pic": "Eugene_Lee.jpg", "enter_year": "2016", "grad_year": "2018"},
            ]
        ));
    }

    this.findById = function (id) {

        var deferred = $.Deferred(),
            children = JSON.parse(window.localStorage.getItem("child")),
            child = null,
            l = children.length;

        for (var i = 0; i < l; i++) {
            if (children[i].id == id) {
                child = children[i];
                return child;
            }
        }

        deferred.resolve(child);
        return deferred.promise();
    }
// parent_id に含まれる文字で検索する例
    this.findByParentId = function (searchKey) {
        var deferred = $.Deferred(),
            children = JSON.parse(window.localStorage.getItem("child")),
            results = children.filter(function (element) {
                var pid = element.parent_id;
                return pid.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        deferred.resolve(results);
        return deferred.promise();
    }

// 全レコードを獲得
	this.getAll = function () {
		parents = JSON.parse(window.localStorage.getItem("child"));
		return parents
	}

// 全レコードを置き換え
	this.putAll = function (children) {
		window.localStorage.setItem("child", JSON.stringify(children));
	}

// ファイル出力

	this.output = function (children, dir) {
		// jsonファイル出力
		// 調査・検討中　MiniPBLでは実装できないかも　(^_^;
	}


}

