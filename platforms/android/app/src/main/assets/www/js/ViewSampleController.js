
/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

app.controller('ViewSampleCtrl', function($scope ,$location  ,$state) {

	$('#modalLoader').hide();
	$scope.sample = {};

	$scope.displaySample = function(tx, results){

		$scope.sample = results.rows.item(0);

		var scan = _helper.json($scope.sample.tracker);

		var html = "";

		console.log($scope.sample);
		color = $scope.getColor($scope.sample.status);

		html += '\
		      	<ons-list-item>\
			        <div class="left">\
			        	<span> Sample type: </span>\
			        </div>\
			        <div class="center">\
			          <div class="list-item"> &nbsp;&nbsp; ' + $scope.sample.name + '</div>\
			        </div>\
			    </ons-list-item>\
			    <ons-list-item>\
			        <div class="left">\
			        	<span> Scan Lid: </span>\
			        </div>\
			        <div class="center">\
			          <div class="list-item"> &nbsp;&nbsp;&nbsp;&nbsp; ' + scan.text + '</div>\
			        </div>\
			    </ons-list-item>\
			   	<ons-list-item>\
			        <div class="left">\
			        	<span> Runner ID: </span>\
			        </div>\
			        <div class="center">\
			          <div class="list-item"> &nbsp;&nbsp;&nbsp; ' + $scope.sample.runner_id + '</div>\
			        </div>\
			    </ons-list-item>\
			    <ons-list-item>\
			        <div class="left">\
			        	<span> Location: </span>\
			        </div>\
			        <div class="center">\
			          <div class="list-item"> &nbsp;&nbsp;&nbsp; ' + $scope.sample.location + '</div>\
			        </div>\
			    </ons-list-item>\
			    <ons-list-item>\
			        <div class="left">\
			        	<span> Project: </span>\
			        </div>\
			        <div class="center">\
			          <div class="list-item"> &nbsp;&nbsp;&nbsp; ' + $scope.sample.project + '</div>\
			        </div>\
			    </ons-list-item>\
			    <ons-list-item>\
			        <div class="left">\
			        	<span> Window: </span>\
			        </div>\
			        <div class="center">\
			          <div class="list-item"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + $scope.sample.window + '&nbsp;&nbsp; \
			          <i style="width: 10px;height: 10px; display: inline-block; border-radius: 50%; background:'+color+';"> </i>\
			          </div>\
			        </div>\
			    </ons-list-item>\
			    <ons-list-item>\
			        <div class="left">\
			        	<span> Collected At: </span>\
			        </div>\
			        <div class="center">\
			          <div class="list-item"> &nbsp;&nbsp;&nbsp;&nbsp; ' + $scope.sample.created_at + '</div>\
			        </div>\
			    </ons-list-item>\
			    <ons-list-item>\
			        <div class="left">\
			        	<span> Delivered At: </span>\
			        </div>\
			        <div class="center">\
			          <div class="list-item"> &nbsp;&nbsp;&nbsp;&nbsp; ' + $scope.sample.updated_at + '</div>\
			        </div>\
			    </ons-list-item>\
		        ';

		$(".sampleDetail").html(html);
		console.log($scope.sample);

	};

	if(isPage('sampleDetailPage')){

		db.selectJoin(
			"SELECT samples.* ,sample_types.window ,sample_types.name, \
			locations.name as location ,projects.name as project \
			FROM samples\
            INNER JOIN sample_types ON sample_types.sample_type_id= samples.sample_type_id \
            INNER JOIN locations ON samples.location_id= locations.location_id \
            INNER JOIN projects ON samples.project_id= projects.project_id \
            WHERE sample_id='" + localStorage.trackerSampleId + "' LIMIT 1",
			$scope.displaySample
		);
	}

});

        // <div class="left list-item__left">
		        //   <img	 class="list-item__thumbnail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wwJCB8v/9zErgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAvSURBVFjD7c0BDQAACAMgtX+KJzWGm4MCdJK6MHVELBaLxWKxWCwWi8VisVj8MV7qBgI2A8rYpgAAAABJRU5ErkJggg==">
		        // </div>