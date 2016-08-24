// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
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
    $('.search-key').on('keyup', findById);
    $('.search-key').on('keyup', findByParentId);

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
	

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByEmail() {
        parentService.findByEmail($('.search-key').val()).done(function (parent) {
            var l = parent.length;
            var p;
            $('.parent-list').empty();
            for (var i = 0; i < l; i++) {
                p = parent[i];
                $('.parent-list').append('<li><a href="javascript:test(' + p.id + ');">' + p.firstName + ' ' + p.lastName +'</a>' + ' : ' + p.email + ' ' + '</li>');
            }
        });
    }

    function findById(){
        parentService.findById($('.search-key').val()).done(function (parent) {
            $('.one-parent').empty();
            $('.one-parent').append('<li>' + parent.id + parent.firstName + ' ' + parent.lastName + '<br/> 通知方法' + parent.method + '<br/> 〒' + parent.ZIPCode + '<br/>' + parent.Addr + '<br/> email : ' + parent.email + '</li>');

        });
    }

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

}());