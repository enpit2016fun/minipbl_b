(function () {
	
	// 保護者レコードの変更
	$('.updateParent').on('click', function() {
						var parentService = new ParentService();
						var parents = parentService.getAll();
						var pid = document.getElementById('pid').value;
						parents[pid-1].id = pid;
						parents[pid-1].firstName = document.getElementById('parent_fname').value;
						parents[pid-1].lastName = document.getElementById('parent_lname').value;
						parents[pid-1].method = document.getElementById('parent_method').value; 
        				parents[pid-1].ZIPCode = document.getElementById('parent_zipcode').value;
						parents[pid-1].Addr = document.getElementById('parent_addr').value; 
						parents[pid-1].email = document.getElementById('parent_email').value; 
						parentService.putAll(parents);
						//document.location.href = "listmentenance.html";
						history.back();
						return false;
	});

	// 保護者レコードの追加
	$('.insertParent').on('click', function() {
						var parentService = new ParentService();
						var parents = parentService.getAll();
						l = parents.length;
						var new_elt= $.extend(true, {}, parents[l-1]);
						new_elt.id = l+1;
						new_elt.firstName = document.getElementById('parent_fname').value;
						new_elt.lastName = document.getElementById('parent_lname').value;
						new_elt.method = document.getElementById('parent_method').value;
						new_elt.ZIPCode = document.getElementById('parent_zipcode').value;
						new_elt.Addr = document.getElementById('parent_addr').value;
						new_elt.email = document.getElementById('parent_email').value;
						parents.push(new_elt);
						parentService.putAll(parents);
						//document.location.href = "listmentenance.html";
						history.back();
						return false;
    });

	$('.returnParent').on('click', function() {
						history.back();
						return false;
    });


}());
