
/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

app.controller('DefaultCtrl', function($scope ,$location  ,$state) {

	$(".url").val(localStorage.scanUrl);
	$(".auth-code").val(localStorage.scanAuthCode);
	$('#modalLoader').hide();
	
	$scope.saveDefaults = function(){
		
		var url     = $(".url").val();
		var authCode     = $(".auth-code").val();
		localStorage.scanUrl = url
		localStorage.scanAuthCode = authCode
		toast("Saved");
		$state.go("Home" ,[]);
	};

});