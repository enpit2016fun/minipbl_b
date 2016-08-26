// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope

//function findByParentId(pid) {
//	alert(pid);
//}

    function findByParentId(pid) {
		var childService = new ChildService();
		var children = childService.getAll()
        var l = children.length;
        var c;
        $('.label').empty();
        $('.label').append('<br/>お子様')
        $('.children-list').empty();
        for (var i = 0; i < l; i++) {
			c = children[i];
			if (c.parent_id == pid ) {
				$('.children-list').append('<li><a href="childmente.html?childid=' + c.id + '">' + c.firstName + ' ' + c.lastName + '</a><br/> 入園年' + c.enter_year + '<br/> 卒園年' + c.grad_year + '</li><br/>');
            }
        };
        $('.add-child').empty();
        $('.add-child').append('<li><a href="childmente.html?parentid=' + pid + '">お子様の追加</a></li>');

		var parentService = new ParentService();
		var parents = parentService.getAll();
        document.getElementById('pid').value = parents[pid-1].id;
		document.getElementById('parent_fname').value = parents[pid-1].firstName;
        document.getElementById('parent_lname').value = parents[pid-1].lastName;
        document.getElementById('parent_method').value = parents[pid-1].method; 
        document.getElementById('parent_zipcode').value = parents[pid-1].ZIPCode;
        document.getElementById('parent_addr').value = parents[pid-1].Addr; 
        document.getElementById('parent_email').value = parents[pid-1].email; 
    }

(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    // ParentService(js/ParentService.js)オブジェクトの生成
    var parentService = new ParentService();
    parentService.initialize().done(function () {
        console.log("Service initialized");
    });
    var childService = new ChildService();
    childService.initialize().done(function () {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // メールアドレス検索キーワード（一文字）の入力時に動くメソッドの登録
    $('.search-key').on('keyup', findByEmail);
    //$('.search-key').on('keyup', findById);
    //$('.search-key').on('keyup', findByParentId);

/*
	// 保護者レコードの追加例（追加ボタンを押すと要素を追加する）
	$('.add-parent-btn').on('click', function() {
		parents = service.getAll();
		l = parents.length;
		var new_elt = $.extend(true, {}, parents[l-1]);
		new_elt.id = l+1;
		new_elt.firstName ="星野";
		new_elt.lastName = new_elt.id + "郎";
		parents.push(new_elt);
		service.putALL(parents)
    });
	
*/
    /* ---------------------------------- Local Functions ---------------------------------- */
	//function findByParentId(pid) {
	//	alert(pid);
	//}
    function findByEmail() {
        parentService.findByEmail($('.search-key').val()).done(function (parent) {
            var l = parent.length;
            var p;
            $('.parent-list').empty();
            for (var i = 0; i < l; i++) {
                p = parent[i];
                $('.parent-list').append('<li><a href="javascript:findByParentId(' + p.id + ');">' + p.firstName + ' ' + p.lastName +'</a>' + ' : ' + p.email + ' ' + '</li>');
            }
        });
    }

    function findById(){
        parentService.findById($('.search-key').val()).done(function (parent) {
            $('.one-parent').empty();
            $('.one-parent').append('<li>' + parent.id + parent.firstName + ' ' + parent.lastName + '<br/> 通知方法' + parent.method + '<br/> 〒' + parent.ZIPCode + '<br/>' + parent.Addr + '<br/> email : ' + parent.email + '</li>');

        });
    }
/*
    function findByParentId() {
        childService.findByParentId($('.search-key').val()).done(function (children) {
            var l = children.length;
            var c;
            $('.label').empty();
            $('.label').append('<br/>園児')
            $('.children-list').empty();
            for (var i = 0; i < l; i++) {
                c = children[i];
                $('.children-list').append('<li>' + c.id + c.firstName + ' ' + c.lastName + '<br/> 入園年' + c.enter_year + '<br/> 卒園年' + c.grad_year + '</li>');
            }
        });
    }
*/

/*
    function findByParentId(pid) {
alert("Enter findByParentId");
        var children = ChildService.GetAll()
        var l = children.length;
        var c;
        $('.label').empty();
        $('.label').append('<br/>園児');
        $('.children-list').empty();
        for (var i = 0; i < l; i++) {
        	c = children[i];
            $('.children-list').append('<li>' + c.id + c.firstName + ' ' + c.lastName + '<br/> 入園年' + c.enter_year + '<br/> 卒園年' + c.grad_year + '</li>');
		}
    }
*/

}());