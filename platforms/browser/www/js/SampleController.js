
/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

app.controller('SampleCtrl', function($scope ,$location  ,$state) {

	$('#modalLoader').hide();

	$scope.projects = [];
	$scope.locations = [];	

	$scope.checkSampleIfExists = function(tx, results){


		var newScan = JSON.parse(localStorage.trackerScanner);
		if (results.rows.length > 0){
			toast("Scan already exists" ,'' ,1);
		}
		$(".scanData").html(
			'<ons-list-item>\
		        <div class="center">\
		        	<div class="list-item__title"></div>\
		        	<div class="list-item__subtitle">' + newScan.text + '</div>\
		        </div>\
		    </ons-list-item>'
		    // <ons-list-item>\
		    //     <div class="center">\
		    //     	<div class="list-item__title">Format</div>\
		    //     	<div class="list-item__subtitle">' + newScan.format + '</div>\
		    //     </div>\
		    // </ons-list-item>'
		);		
	};

	$scope.saveSample = function (){
		var sampleType = $(".sampleType").val();
		var defaults = JSON.parse(localStorage.trackerDefaults);
		var user = JSON.parse(localStorage.trackerUser);
		var description = "Sample desc.";
		var created_at = $(".created_at").val();
		var updated_at =  "" ;
		var status =  0 ;
		var runner_id = 0 ;

		if( user[6] > 1) {
			status = 4;
			runner_id = defaults.runnerId;
		}

		if(created_at == ""){
			toast("Date and Time is required.");
			return false;
		}

		db.insert( 
			"samples" ,
			"sample_id ,project_id  ,location_id ,sample_type_id ,tracker ,\
			 user_id ,description ,runner_id ,created_at, updated_at ,status" ,
			"? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?" , 
			[ 
				hashCode() ,defaults.project ,defaults.location ,sampleType ,
				localStorage.trackerScanner ,user[0],description ,runner_id ,
				created_at ,updated_at ,status
			]
		);
		$scope.go("Home");

		toast("Sample saved");

	};


	$scope.sampleTypeSet = function(tx, results){

		var html = '<ons-select float class="sampleType" >';
		for(var i = 0 ; i < results.rows.length; i++){

        	html += '<option value="' + results.rows.item(i).sample_type_id+'">'+
		        		results.rows.item(i).name +
		        	'</option>';
		}
		html +='</ons-select>';

		$(".sampleTypeDiv").html(html);
		$(".created_at").val(moment().format('YYYY-MM-DD HH:mm:ss'));
				
	};

	if ( isPage('addSample') ){

		db.selectJoin("SELECT * FROM sample_types" ,$scope.sampleTypeSet);

		db.selectJoin( 
			"SELECT * FROM samples WHERE tracker='"+localStorage.trackerScanner+"'" ,
			$scope.checkSampleIfExists
		);
		// db.selectJoin("SELECT * FROM sample_types" ,$scope.sampleTypeSet);

	}


    $scope.prepareSend = function (tx, results){
        
        var preparedData = [];
        var user = JSON.parse(localStorage.pendingUser);
        var runnerId = $(".runnerId").val();

        for(var i = 0 ; i < results.rows.length; i++){
            preparedData.push(results.rows.item(i));
        }

        if(results.rows.length <= 0){
            toast("No Data to sync ...");
            return;
        }

        $scope.sendData( user.url ,{
            "data" : preparedData,
            "user" : localStorage.trackerUser,
            "table" : "samples",
            "runner" : runnerId
        });

    };

	$scope.confirmRunner = function(tx, results){
		
		if(results.rows.length > 0){
			
			db.selectJoin( "SELECT * FROM samples WHERE sync_state=0 " , $scope.prepareSend);
			toast("Syncing ......");
		}else{
			toast("Incorrect Runner ID ,scan not sync ...");
			return false;
		}
		
		
	};

	$scope.syncing = function(){

		var runnerId = $(".runnerId").val();
        if ( runnerId == "" ){

        	toast("Runner ID is require to sync ...");
        	return false;
		}

		var password = prompt("Enter password" ,"");
		db.selectJoin("SELECT * FROM users WHERE user_key='" + runnerId + "' AND password='" + password + "'" ,$scope.confirmRunner);
	}

	if ( isPage('syncPage') ){

		defaults = JSON.parse(localStorage.trackerDefaults);
		$(".projectSync").val(defaults.projectName);
		$(".locationSync").val(defaults.locationName);
		$(".unSynced").text(localStorage.trackerUnSyncedSamples);
	}

	// $scope.verifySampleIfChecked = function(tx, results){
	// 	alert("at last");
	// 	if (results.rows.length > 0){
	// 		toast("Veried");
 //            $state.go("Home");

	// 	}else{
 //            toast("Scan not found in server." ,'' ,1);
	// 	}

	// };

}); 
