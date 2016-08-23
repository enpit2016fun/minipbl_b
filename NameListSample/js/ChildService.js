var ParentService = function () {
    this.initialize = function() {
        var deferred = $.Deferred();
        // Store sample data in Local Storage
        window.localStorage.setItem("child", JSON.stringify(
            [
                {"id": 1, "parent_id": "1", "firstName": "新井", "lastName": "一号Jr.1", "pic": "James_King.jpg", "enter_year": "2012", "grad_year": "2016"},
                {"id": 2, "parent_id": "1", "firstName": "新井", "lastName": "一号Jr.2", "pic": "Julie_Taylor.jpg", "enter_year": "2014", "grad_year": ""},
				{"id": 3, "parent_id": "2", "firstName": "新井", "lastName": "二号Jr.", "pic": "Eugene_Lee.jpg", "enter_year": "2009", "grad_year": "2014"},
                {"id": 4, "parent_id": "3", "firstName": "新井", "lastName": "三号Jr.1", "pic": "Eugene_Lee.jpg", "enter_year": "1994", "grad_year": "1998"},
                {"id": 5, "parent_id": "3", "firstName": "新井", "lastName": "三号Jr.2", "pic": "Eugene_Lee.jpg", "enter_year": "2013", "grad_year": "2015"},
            ]
        ));
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function (id) {

        var deferred = $.Deferred(),
            children = JSON.parse(window.localStorage.getItem("child")),
            child = null,
            l = children.length;

        for (var i = 0; i < l; i++) {
            if (children[i].id === id) {
                child = children[i];
                break;
            }
        }

        deferred.resolve(child);
        return deferred.promise();
    }
// parent_id に含まれる文字で検索する例
    this.findByParent = function (searchKey) {
        var deferred = $.Deferred(),
            children = JSON.parse(window.localStorage.getItem("child")),
            results = children.filter(function (element) {
                var pid = element.parent_id;
                return pid.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        deferred.resolve(results);
        return deferred.promise();
    }


