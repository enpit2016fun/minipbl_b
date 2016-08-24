// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    // ParentService(js/ParentService.js)オブジェクトの生成
    var service = new ParentService();

    service.initialize().done(function () {
        console.log("Service initialized");
    });
    /* --------------------------------- Event Registration -------------------------------- */
    // メールアドレス検索キーワード（一文字）の入力時に動くメソッドの登録
    $('.search-key').on('keyup', findByEmail);

	// 保護者レコードの追加例（追加ボタンを押すと要素を追加する）
	$('.add-parent-btn').on('click', function() {
		parents = service.getAll();
		l = parents.length;
		var new_elt = $.extend(true, {}, parents[l-1]);
		new_elt.id = l+1;
		new_elt.firstName ="つくしの子";
		new_elt.lastName = "保護者様" + new_elt.id;
		new_elt.email = "TsukushiNoko" + new_elt.id + "@fakeemail.com";
		parents.push(new_elt);
		service.putAll(parents)
    });

	// 保護者データの初期化
	$('.dataInit-btn').on('click', function() {
		service.dataInitialize();
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByEmail() {
        service.findByEmail($('.search-key').val()).done(function (parent) {
            var l = parent.length;
            var p;
            $('.parent-list').empty();
            for (var i = 0; i < l; i++) {
                p = parent[i];
                $('.parent-list').append('<li><a href="#parent/' + p.id + '">' + p.firstName + ' ' + p.lastName +'</a>' + ' : ' + p.email + ' ' + '</li>');
            }
        });
    }

}());