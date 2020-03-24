
/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

app.controller('LoginCtrl', function($scope ,$location  ,$state ,$http) {

 //    localStorage.trackerUser = "";
 //    localStorage.trackerDefaults = "";
 //    localStorage.pendingUser = "";
	// $('#modalLoader').hide();
    
	// $scope.login = function(){
	// 	showModalLoader()

	// 	if ($scope.auth('url') && $scope.auth('username') && $scope.auth('password')){

	// 		localStorage.pendingUser = JSON.stringify({
	// 			'url' : $scope.auth('url') ,
	// 			'user' : $scope.auth('username') ,
	// 			'pass' : $scope.auth('password')
	// 		});

	// 		$scope.jsonD = JSON.stringify({});
	// 		$scope.getData( 
	// 			$scope.auth('url') ,
	// 			{ 'table' : 'users' , 'user' : $scope.jsonD } ,
	// 			addUsers 
	// 		);
 //    		$scope.getData( 
 //    			$scope.auth('url') ,
	// 			{ 'table' : 'user_types' ,'user' : $scope.jsonD} ,
	// 			addUserTypes 
	// 		);
 //    		$scope.getData( 
 //    			$scope.auth('url') ,
	// 			{ 'table' : 'locations' ,'user' : $scope.jsonD } ,
	// 			addLocations 
	// 		);
 //    		$scope.getData( 
 //    			$scope.auth('url') ,
	// 			{ 'table' : 'projects', 'user' : $scope.jsonD } ,
	// 			addProjects
	// 		);
 //    		$scope.getData( 
 //    			$scope.auth('url') ,
	// 			{ 'table' : 'sample_types', 'user' : $scope.jsonD } ,
	// 			addSampleTypes
	// 		);
	// 		addSamples([]); 			
	// 	}
	// };



	// $scope.auth = function ( className ){
	// 	$scope.value = $("."+className).val();

	// 	if( $scope.value.trim() ){
	// 		return $scope.value;
	// 	}else{
	// 		toast(className + " is required.")
	// 		return false;
	// 	}
	// };
	
}); 
