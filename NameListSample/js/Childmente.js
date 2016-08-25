(function () {
	// 園児レコードの設定
	(function(){
		
		var childService = new ChildService();
		var child =  childService.findById(childid);
		document.getElementById('cid').value = child.id;
		document.getElementById('pid').value = child.parent_id;
		document.getElementById('child_fname').value = child.firstName;
		document.getElementById('child_lname').value = child.lastName;
		document.getElementById('enter_year').value = child.enter_year;
		document.getElementById('grad_year').value = child.grad_year;
	}());

	// 園児レコードの変更
	$('.updatetChild').on('click', function() {
						var childService = new ChildService();
						var children = childService.getAll();
						var cid = document.getElementById('cid').value;
						children[cid-1].id = cid;
						children[cid-1].parent_id = document.getElementById('pid').value;
						children[cid-1].firstName = document.getElementById('child_fname').value;
						children[cid-1].lastName = document.getElementById('child_lname').value;
						children[cid-1].enter_year = document.getElementById('enter_year').value;
						children[cid-1].grad_year = document.getElementById('grad_year').value;
						childService.putAll(children);
						//document.location.href = "childpage.html";
						history.back();
						return false;
	});

	// 園児レコードの追加
	$('.insertChild').on('click', function() {
						var childService = new ChildService();
						var children = childService.getAll();
						var cid = document.getElementById('cid').value;
						l = children.length;
						var new_elt= $.extend(true, {}, children[l-1]);
						new_elt.id = l+1;
						new_elt.parent_id = document.getElementById('pid').value;
						new_elt.firstName = document.getElementById('child_fname').value;
						new_elt.lastName = document.getElementById('child_lname').value;
						new_elt.enter_year = document.getElementById('enter_year').value;
						new_elt.grad_year = document.getElementById('grad_year').value;
						children.push(new_elt);
						childService.putAll(children);
						//document.location.href = "childpage.html";
						history.back();
						return false;
    });

	$('.returnChild').on('click', function() {
						history.back();
						return false;
    });


}());
