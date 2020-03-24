
/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/


app.provider("queryProvider" , function(){
	
	var provider = {};

	provider.$get = function(){

		var provider = {};
		provider.rows = [];
		provider.selectQuery = function(){
			var sql = "SELECT * FROM scans WHERE status=0";
			db.selectJoin(sql ,provider.getResult);
		};

		provider.getResult = function(tx, results){
			provider.rows = results.rows;
		};

		return provider;
	};

	return provider;
});

app.controller('HomeCtrl', function($scope ,$location  ,queryProvider) {

	$scope.sensorsArray = [
							"LIGHT" ,
							"TEMPERATURE",
							"PROXIMITY",
							"ACCELEROMETER",
							"GRAVITY",
							"ORIENTATION",
							"MAGNETIC_FIELD_UNCALIBRATED",
							"GYROSCOPE",
							"GYROSCOPE_UNCALIBRATED",
							"LINEAR_ACCELERATION",
							"ROTATION_VECTOR",
							"STEP_COUNTER",
							"GAME_ROTATION_VECTOR",
							"GEOMAGNETIC_ROTATION_VECTOR",
							"MAGNETIC_FIELD",
							"AMBIENT_TEMPERATURE",
							"PRESSURE",
							"RELATIVE_HUMIDITY"
						];
	$scope.onSuccess = function(values) {
	  // var state = values[0];
	  	alert(values);
	  	toast(values);
	    sensors.disableSensor();

	}

	$scope.onError = function(error) {
	   alert("error");
	   toast(error);
	   sensors.disableSensor();

	}

	$scope.sense = function(type){
    	sensors.enableSensor(type);
	    sensors.getState($scope.onSuccess, $scope.onError);
	};

}); 

// var viewSample = function(id){
// 	id = $(id).attr("id");
// 	localStorage.trackerSampleId = id;
// 	window.location.hash ="#!/viewSample";
// };


// function onSuccess(values) {
//   var state = values[0];
//   alert(values);
//   // $(".items").html("<ons-list-item>" + values + "</ons-list-item>");

// }

// function onError(error) {
//    console.log(error);
//    alert(error)
//    // $(".items").html("<ons-list-item>" + error + "</ons-list-item>");
// }

// document.addEventListener("deviceready", function () {

//     var LIGHT = sensors;
//     var TEMPERATURE =  sensors;

//     // LIGHT.enableSensor("LIGHT");
//     TEMPERATURE.enableSensor("TEMPERATURE");

//     // setInterval(function(){
//       TEMPERATURE.getState(onSuccess, onError);
//       // LIGHT.getState(onSuccess, onError);
//       // LIGHT.disableSensor();
//       // LIGHT.getState(onSuccess, onError);
//     // }, 1000);


// }, false);