// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    // ChildService(js/ChildService.js)オブジェクトの生成
    var service = new ChildService();

    service.initialize().done(function () {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // 保護者ID（一文字）の入力時に動くメソッドの登録
    $('.search-key').on('keyup', findByParentId);
/*
	// 園児レコードの追加例（追加ボタンを押すと要素を追加する）
	$('.add-child-btn').on('click', function() {
		children = service.getAll();
		l = childs.length;
		var new_elt = $.extend(true, {}, children[l-1]);
		new_elt.id = l+1;
		new_elt.parent_id = 6;
		new_elt.firstName ="土筆";
		new_elt.lastName = "の子"+new_elt.id;
		childs.push(new_elt);
		service.putAll(children)
    });
*/
	// 園児者データの初期化
	$('.ChildInit-btn').on('click', function() {
		service.dataInitialize();
    });

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