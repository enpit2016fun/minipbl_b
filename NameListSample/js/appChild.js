// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    // ParentService(js/ParentService.js)オブジェクトの生成
    var service = new ChildService();
    service.initialize().done(function () {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // メールアドレス検索キーワード（一文字）の入力時に動くメソッドの登録
    $('.search-key').on('keyup', findByParentId);
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
    function findByParentId() {
        service.findByParentId($('.search-key').val()).done(function (child) {
            var l = child.length;
            var c;
            $('.children-list').empty();
            for (var i = 0; i < l; i++) {
                c = child[i];
                $('.children-list').append('<li><a href="#child/' + c.id + '">' + c.firstName + ' ' + c.lastName +'</a>' + '</li>');
            }
        });
    }

}());