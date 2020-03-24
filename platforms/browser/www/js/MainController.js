/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/
// create empty controllers for the states as we are 
// not doing anything but just displaying message 
app.controller('MainCtrl', function($scope ,$state , $http ,$window ) {

	$('#modalLoader').hide();


    $scope.nav = function(id) {
        document.querySelector( '#' + id ).left.toggle();
    };

    $scope.logout = function(){
        $scope.go("Login");  
    };

    $scope.reLoad = function(){
        // $window.location.reload();
        $state.reload();
    };

    $scope.go = function(page ,data ,force){

        showModalLoader();

        if( isPage('loginPage')  &&  page ==="Login" ){
            $scope.exitFromApp();
        }

        if(localStorage.trackerUser != ""){

            if( isPage('homePage')  &&  page ==="Home"){
                $scope.exitFromApp();
            }else{
                if(localStorage.trackerDefaults != ""){
                    $state.go(page ,data);
                }else{
                    $state.go("Defaults" ,data);
                }
            }
        }else{
            localStorage.trackerUser = "";
            localStorage.trackerDefaults = "";
            $state.go("Login" ,data); 
        }
    };

    $scope.cancellable = function(url , msg){
    	ons.notification.confirm({
	        message: "logout",
	        cancelable: true,
        	buttonLabels: ['Yes', 'No'],
	        callback: function(i) {
                if( !i ){ $scope.go(url); }
	        }

	    });

    };

    $scope.sendData = function (url, getData ,reLoad){

        $.ajax({
            url : url,
            method : 'POST',
            data : getData,
            success : function(result) {
                
                if (result == 1){
                    db.delete("scans" ," status=0");
                    // db.update("scans" ,"status=1");
                    toast("Data Synced");
                }
                else{
                    // alert(result);
                    toast("Data not sync database error!");
                }
                console.log(result);
                $scope.reLoad();                
            },
            error : function(error) {
                toast("Server error : " + error.statusText)
                // toast("Server error : " + error.statusText)
                console.log(error.statusText);                
            }
        });

    };

    $scope.getData = function (url ,meta,callBack){
        
        $.ajax({
            url : url,
            method : 'POST',
            // type:"post",
            // async: false,
            data : meta,
            success : function(result) {
                // console.log(result);
                callBack(result)
            },
            error : function(error) {
                toast("Server error : " + error.statusText)
                // toast("Server error : " + error.statusText)
                console.log(error.statusText);                
            }
        });

    };

    $scope.syncing = function (tx, results){
        
        $scope.preparedData = [];
        for(var i = 0 ; i < results.rows.length; i++){
            $scope.preparedData.push(results.rows.item(i));
        }

        if(results.rows.length <= 0){
            toast("No Data to sync ...");
            return false;
        }

        if(!localStorage.scanUrl){
            toast("Please set Url ...");
            return false;
        }

        $scope.sendData( localStorage.scanUrl ,{
            "data" : $scope.preparedData,
            "table" : "scans",
        } ,true);

    };

    $scope.sync = function(){
        db.selectJoin( "SELECT * FROM scans WHERE status = 0 " , $scope.syncing);
    };

    // Pickers 
    $scope.dateInst = function( className ){

        new Picker(document.querySelector('.'+className), {
            controls: true,
            text: {title: 'Pick date',},
            format: 'YYYY-MM-DD',
            headers: true,
        });
    };

    $scope.timeInst = function( className ){

        new Picker(document.querySelector('.'+className), {
            controls: true,
            text: {title: 'Pick time',},
            format: 'HH:mm:ss', // .SSS for millSc
            headers: true,
        });
    };

    $scope.dateTimeInst = function( className ){

        new Picker(document.querySelector('.'+className), {
            controls: true,
            text: {title: 'Pick date and time',},
            format: 'YYYY-MM-DD HH:mm',// :ss.SSS for sec and millSc
            headers: true,
        });
    };

    $scope.exitFromApp = function (){
        // navigator.app.exitApp();
        $('#modalLoader').hide();

        ons.notification.confirm({
            message: "Exit app ?",
            cancelable: true,
            buttonLabels: ['Yes', 'No'],
            callback: function(i) {
                if( !i ){ 
                    
                    toast("Application Closed.");
                    if (navigator.app) {
                        navigator.app.exitApp();
                    } else if (navigator.device) {
                        navigator.device.exitApp();
                    } else {
                        window.close();
                    }
                }else{
                    toast("Cancelled");
                }
            }

        });

    };

    

    $scope.scanResult = function (result) {
        // toast("Result : " + result.text +" Format : "+esult.format);
        if (confirm('Save ...?')){
            db.insert( 
                "scans" ,
                "scan ,user_id  ,status" ,
                "? ,? ,?" , 
                [ JSON.stringify(result) ,localStorage.scanAuthCode ,0]
            );
        } 
        $scope.reLoad();

    };    

    $scope.scanError = function (error) {
        toast("Scanning failed : " + error);
    };

    $scope.scanner = function(){
        cordova.plugins.barcodeScanner.scan(
            $scope.scanResult,
            $scope.scanError,
            {
              preferFrontCamera : false, // iOS and Android
              showFlipCameraButton : true, // iOS and Android
              showTorchButton : true, // iOS and Android
              torchOn: true, // Android, launch with the torch switched on (if available)
              saveHistory: true, // Android, save scan history (default false)
              prompt : "Place a barcode inside the scan area", // Android
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              // formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations : true, // iOS
              disableSuccessBeep : false // iOS and Android
            }
        );
    };

   
    $scope.onBackKeyDown = function(e) {
        // $scope.go('Home');
        $scope.exitFromApp();
    };

    $scope.init = function(){
        // if(localStorage.trackerUser == "" || localStorage.trackerUser == undefined ){
        //     $state.go("Login");
        // }
        // else if(localStorage.trackerDefaults == "" || localStorage.trackerDefaults == undefined ){
        //     $state.go("Defaults");
        // }
        // else{
        //     $state.go("Home");
        // }
        //     if (navigator.userAgent.match("Android")){
        //         document.addEventListener("backbutton", $scope.onBackKeyDown, true);
        //     }
    };$scope.init();

}); 


 // cordova.plugins.exit();
//  confirmed = function(buttonIndex) { if(buttonIndex == 1) { console.log("navigator.app.exitApp"); navigator.app.exitApp(); } }

// onTouch = function() { navigator.notification.confirm('', confirmed, 'Exit?'); }