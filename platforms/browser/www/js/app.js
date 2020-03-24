// App logic.
// declares application module with name "myApp" 
// inject ui.router dependency 
var app = angular.module("myApp", [ "ui.router" ] );

ons.ready(function(){

	// $('#modalLoader').hide();
	// // alert('ready')
 //  if(localStorage.trackerUser == ""){
 //  	window.location.hash ="#!/login";
 //  }
 //  else if(localStorage.trackerDefaults == ""){
 //  	window.location.hash ="#!/addDefaults";
 //  }
 //  else{
  	// window.location.hash ="#!/home";
 //  }

});

var showModalLoader = function() {
  $('#modalLoader').show();
};

var toast = function(msg ,animation ,close) {
	$('#modalLoader').hide();

	$(".tMsg").text( _uFirst(msg) );

	animation = (animation) ? animation : 'fade' ;
	if( document.querySelector('ons-toast').style.display == "none" ){
    
    	document.querySelector('ons-toast').setAttribute('animation', animation);
    	document.querySelector('ons-toast').toggle();
    	
    	if (!close){
			setTimeout(function(){

				if(document.querySelector('ons-toast').style.display == "block"){
					document.querySelector('ons-toast').toggle();
				}
			} ,2000);    		
    	}
    	
    }

	// ('none')
	// ('ascend')
	// ('lift')
	// ('fall')
	// ('fade')

};

showModalLoader();

// var db = window.sqlitePlugin.openDatabase({name: "my.db", androidDatabaseImplementation: 2});
// document.addEventListener("deviceready", onDeviceReady, false);


// if (navigator.userAgent.match("Android")){
//     document.addEventListener("backbutton", onBackKeyDown, true);
// }
// function onBackKeyDown(e) {
// 	alert(e)
// 	navigator.app.exitApp();
// }
document.addEventListener('init', function(event) {
    // $('select').formSelect();
});

// cordova.plugins.barcodeScanner.scan(
//       function (result) {
//           alert("We got a barcode\n" +
//                 "Result: " + result.text + "\n" +
//                 "Format: " + result.format + "\n" +
//                 "Cancelled: " + result.cancelled);
//       },
//       function (error) {
//           alert("Scanning failed: " + error);
//       },
//       {
//           preferFrontCamera : true, // iOS and Android
//           showFlipCameraButton : true, // iOS and Android
//           showTorchButton : true, // iOS and Android
//           torchOn: true, // Android, launch with the torch switched on (if available)
//           saveHistory: true, // Android, save scan history (default false)
//           prompt : "Place a barcode inside the scan area", // Android
//           resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//           formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
//           orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
//           disableAnimations : true, // iOS
//           disableSuccessBeep: false // iOS and Android
//       }
//   );

   // cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
   //          alert("encode success: " + success);
   //        }, function(fail) {
   //          alert("encoding failed: " + fail);
   //        }
   //      );