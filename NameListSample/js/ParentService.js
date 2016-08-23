var ParentService = function () {

    this.initialize = function() {
        var deferred = $.Deferred();
        // Store sample data in Local Storage
        window.localStorage.setItem("parent", JSON.stringify(
            [
                {"id": 1, "firstName": "新井", "lastName": "一号", "Addr": "福島県会津若松市1－1－1", "ZIPCode": "123-4567","email": "hogehoge1@fakeemail.com", "method": "郵送", "pic": "James_King.jpg", "targetd": 1},
                {"id": 2, "firstName": "新井", "lastName": "二号", "Addr": "福島県会津若松市2－2－2", "ZIPCode": "234-5678","email": "hogehoge2@fakeemail.com", "method": "電子メール", "pic": "Julie_Taylor.jpg", "targetd": 1},
				{"id": 3, "firstName": "新井", "lastName": "三号", "Addr": "福島県会津若松市3－3－3", "ZIPCode": "345-6789","email": "hogehoge2@fakeemail.com", "method": "配信不要", "pic": "Eugene_Lee.jpg", "targetd": 1},
            ]
        ));
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function (id) {

        var deferred = $.Deferred(),
            parent = JSON.parse(window.localStorage.getItem("parent")),
            parent = null,
            l = parent.length;

        for (var i = 0; i < l; i++) {
            if (parent[i].id === id) {
                parent = parent[i];
                break;
            }
        }

        deferred.resolve(parent);
        return deferred.promise();
    }
// email アドレスに含まれる文字で検索する例
    this.findByEmail = function (searchKey) {
        var deferred = $.Deferred(),
            parent = JSON.parse(window.localStorage.getItem("parent")),
            results = parent.filter(function (element) {
                var emailaddr = element.email;
                return emailaddr.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        deferred.resolve(results);
        return deferred.promise();
    }


}