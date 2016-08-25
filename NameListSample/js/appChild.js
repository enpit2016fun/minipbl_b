// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    // ChildService(js/ChildService.js)オブジェクトの生成
    var service = new ChildService();
	var p_service = new ParentService();

    service.initialize().done(function () {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // 保護者ID（一文字）の入力時に動くメソッドの登録
    $('.search-key').on('keyup', findByParentId);

	// 園児者データの初期化
	$('.ChildInit-btn').on('click', function() {
		service.dataInitialize();
		location.reload(true);
    });

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByParentId() {
		var pid = $('.search-key').val();
		if (pid != ""){
			var parent =  p_service.findById(pid);
			$('.parent-info').text(parent.firstName + ' ' + parent.lastName + '様のお子様');
		} else {
			$('.parent-info').text('全てのお子様');
		}
        service.findByParentId($('.search-key').val()).done(function (child) {
            var l = child.length;
            var c;
            $('.children-list').empty();
            for (var i = 0; i < l; i++) {
                c = child[i];
                $('.children-list').append('<li><a href="childmente.html?childid=' + c.id + '">' + c.firstName + ' ' + c.lastName +'</a>' + '</li>');
            }
        });
    }

}());