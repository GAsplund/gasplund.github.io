if (document.documentElement.clientWidth < 854) {

	function openNav() {
		document.getElementById("menubar").style.width = "250px";
	}

	window.addEventListener('mouseup', function(event){
		var menubar= document.getElementById("menubar");
		if (event.target != menubar && event.target.parentNode != menubar){
			document.getElementById("menubar").style.width = "0";
		}
	});

}
