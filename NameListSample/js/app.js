// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    // ParentService(js/ParentService.js)�I�u�W�F�N�g�̐���
    var service = new ParentService();
    service.initialize().done(function () {
        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // ���[���A�h���X�����L�[���[�h�i�ꕶ���j�̓��͎��ɓ������\�b�h�̓o�^
    $('.search-key').on('keyup', findByEmail);
	

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByEmail() {
        service.findByEmail($('.search-key').val()).done(function (parent) {
            var l = parent.length;
            var e;
            $('.parent-list').empty();
            for (var i = 0; i < l; i++) {
                p = parent[i];
                $('.parent-list').append('<li><a href="#parent/' + p.id + '">' + p.firstName + ' ' + p.lastName +'</a>' + ' : ' + p.email + ' ' + '</li>');
            }
        });
    }

}());