function Db(){

	this.myCon = null;

    this.con = function(){
    	if(this.myCon){
    		return this.myCon;
    	}
        this.myCon = window.openDatabase('mySQLite.db', '1.0' ,'src/pid_database', 1000000); 
        return this.myCon;
    }


   	this.insert = function(tableName , fields , placeholder ,values) {

		this.con().transaction( function (ts) {

			var sql = "INSERT INTO "+tableName+" ( " + fields + " ) ";
			sql += "VALUES (" + placeholder + ")";

			ts.executeSql(
				sql, 
				values,
				function( ts , result ) { 
					console.log(result );
				},
				function( ts , error ) { 
					// app.dialog.alert("" , error.message);
					// console.log(values)
					console.log('Error : ' + error.message+"------------------" +tableName+"-------"+sql);
				}
			);
		});
		

	} 


	this.update = function (tableName ,set ,where ,callBack) {

		var sql = "UPDATE " + tableName + " SET " + set;
		sql += (where) ? " WHERE "+ where : "" ;
		// console.log(sql);
     	this.con().transaction(function (tx){
     		if(callBack){
     			callBack();
     		}
            tx.executeSql(sql);
            }, function (error){
            	console.log(error);
            }
         );
	}


	this.delete = function (tableName ,where) {

		var sql = "DELETE FROM " + tableName ;
		sql += (where) ? " WHERE "+ where : "" ;

     	this.con().transaction(function (tx){
            tx.executeSql(sql);
            }, function (error){
            	console.log(error);
            }
         );
	}

	this.selectJoin = function (sql ,func) {
		this.con().transaction(function(ts) {
		    try {
				function success(tx, results) {
					var data = [];

					for (var i = 0 ; i < results.rows.length; i++ ){
						data.push( results.rows.item(i) );
					}
					func( data );
				}
				ts.executeSql( sql , [], func, null );


		    } catch(e) {
		        console.log(e);
		    }
		});
	} 


	this.select = function (tableName, func , where) {
		return runSql(this.con() ,tableName,func, where);
	} 

   	this.createTable = function (tableName , fields ,dropTable) {
   		
		this.con().transaction( function (ts) {

			if (dropTable ==1) {
				var drop = 'DROP TABLE IF EXISTS '+tableName;
				ts.executeSql( drop ,[] ,
					function( ts , result ) { 
						// console.log(result );
					},function( ts , error ) { 
						myApp.dialog.alert("" , error.message);
						// console.log('Error : ' + error.message);
					}
				);
			}

			var sql = 'CREATE TABLE IF NOT EXISTS '+tableName+'( ' + fields + ')';

			try{
				ts.executeSql( sql ,[] ,
								function( ts , result ) { 
									// console.log(result );
								},function( ts , error ) { 
									// myApp.dialog.alert("" , error.message);
									console.log('Error : ' + error.message);
								}
							);
			}catch( e){

			}
		});

	}  

} 

function runSql(con ,tableName ,func, where ){

	
	con.transaction(function(ts) {
		var sql = "SELECT * FROM " + tableName +" " ;
		sql += (where) ? " WHERE " + where : "" ;

		// console.log(sql)
	    try {
			ts.executeSql( sql , [], success, null );
			function success(tx, results) {
				var data = [];
				for (var i = 0 ; i < results.rows.length; i++ ){
					data.push( results.rows.item(i) );
				}
				localStorage.dateFilter = results.rows.length;
				// console.log(data);
				func( data );
			}
	    } catch(e) {
	        // alert(e.message);
	        console.log(e);
	    }
	});

}


const db = new Db;

var addScans = function(data){
	
	var attr = "scan_id INTEGER AUTO_INCREMENT PRIMARY KEY ,";
		attr += "scan varchar(255) ,";
		attr += "user_id varchar(255) ,";
		attr += "status integer DEFAULT 0,";
		attr += "created_at DATETIME DEFAULT CURRENT_TIMESTAMP,";
		attr += "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP";

	data = _helper.json(data);
	localStorage.loadLength = data.length;
	db.createTable("scans" , attr ,0);
	for (index in data) {
		db.insert( 
			"scans" ,
			"scan ,user_id  ,status ,created_at ,updated_at" ,
			"? ,? ,? ,? ,?" , 
			data[index] 
		);
	}console.log("init");
}

// var backedSamples = [];
// var backedCheckPoints = [];



// var addSampleTypes = function(data){
	
// 	var attr = "sample_type_id varchar(36) PRIMARY KEY ,";
// 	attr += "name varchar(100) ,";
// 	attr += "window integer DEFAULT 0,";
// 	attr += "status integer DEFAULT 1";

// 	data = _helper.json(data);
// 	db.createTable("sample_types" , attr ,1);
// 	for (index in data) {
// 		db.insert( 
// 			"sample_types" ,
// 			"sample_type_id ,name ,window ,status" ,
// 			"? ,? ,? ,?" , 
// 			data[index] 
// 		);
// 	} 
// }

// var addLocations = function(data){
	
// 	var attr = "location_id varchar(36) PRIMARY KEY ,";
// 	attr += "name varchar(100) ,";
// 	attr += "status integer DEFAULT 1";

// 	data = _helper.json(data);
// 	localStorage.loadLength = data.length;

// 	db.createTable("locations" , attr ,1);
// 	for (index in data) {
// 		db.insert( 
// 			"locations" ,
// 			"location_id ,name  ,status" ,
// 			"? ,? ,?" , 
// 			data[index] 
// 		);
// 	} 
// }

// var addProjects = function(data){
	
// 	var attr = "project_id varchar(36) PRIMARY KEY ,";
// 	attr += "name varchar(100) ,";
// 	attr += "status integer DEFAULT 1";

// 	data = _helper.json(data);
// 	localStorage.loadLength = data.length;

// 	db.createTable("projects" , attr ,1);
// 	for (index in data) {
// 		db.insert( 
// 			"projects" ,
// 			"project_id ,name  ,status" ,
// 			"? ,? ,?" , 
// 			data[index] 
// 		);
// 	} 
// }


// var addSamples = function(data){

// 	var attr = "sample_id varchar(100) PRIMARY KEY ,";
// 	attr += "project_id varchar(100),";
// 	attr += "location_id varchar(100),";
// 	attr += "sample_type_id varchar(100),";
// 	attr += "tracker text,";
// 	attr += "description text,";
// 	attr += "user_id varchar(36) DEFAULT '',";
// 	attr += "runner_id varchar(36) DEFAULT '',";
// 	attr += "created_at DATETIME DEFAULT CURRENT_TIMESTAMP,";
// 	attr += "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,";
// 	attr += "sync_state int DEFAULT 0,";
// 	attr += "status int DEFAULT 0";
// 	db.createTable("samples" , attr);

// 	db.delete("samples" ,"  sync_state=1 ");


// 	data = _helper.json(data);
// 	localStorage.loadLength = data.length;

// 	for (index in data) {

// 		data[index][10] = 0 ;
		
// 		db.insert( 
// 			"samples" ,
// 			"sample_id ,project_id  ,location_id ,sample_type_id ,tracker ,description ,user_id ,runner_id ,created_at , updated_at ,sync_state ,status" ,
// 			"? ,? ,? ,? ,? ,? ,? ,? ,?,? ,? ,? " , 
// 			data[index] 
// 		);
// 	}

// }

// var addUsers = function(data){

// 	var attr = "id varchar(36) PRIMARY KEY ,";
// 	attr += "first_name varchar(100) ,";
// 	attr += "last_name varchar(100) ,";
// 	attr += "username varchar(100),";
// 	attr += "password varchar(100),";
// 	attr += "user_key varchar(36),";
// 	attr += "user_type_id integer,";
// 	attr += "created_at DATETIME DEFAULT CURRENT_TIMESTAMP";

// 	data = _helper.json(data);
// 	localStorage.loadLength = data.length;
// 	db.createTable("users" , attr ,1);
// 	var authenticated = false;

// 	for (index in data) {

// 		var pendingUser = JSON.parse(localStorage.pendingUser);

// 		if(pendingUser.pass.trim() == data[index][4].trim() && pendingUser.user.trim() == data[index][3].trim() ){

// 			authenticated = true;
// 			localStorage.trackerUser = JSON.stringify(data[index]);
// 		}

// 		db.insert( 
// 			"users" ,
// 			"id,first_name,last_name,username,password ,user_key,user_type_id ,created_at" ,
// 			"? ,? ,? ,? ,? ,? ,? ,?" , 
// 			data[index] 
// 		);
// 	}

// 	// var $rootScope = angular.element($('div[ng-controller="LginController"]')).scope().$root;
// 	if(authenticated){
// 		window.location.hash ="#!/addDefaults";
// 	}else{
// 		toast("Your not recognised ","fall")
// 	}
   
// }


// var addUserTypes = function(data){
	
// 	var attr = "user_type_id varchar(36) PRIMARY KEY,";
// 	attr += "name varchar(100) ,";
// 	attr += "status integer DEFAULT 1";

// 	data = _helper.json(data);
// 	localStorage.loadLength = data.length;
// 	db.createTable("user_types" , attr ,1);

// 	for (index in data) {

// 		db.insert( 
// 			"user_types" ,
// 			"user_type_id ,name ,status" ,
// 			"? ,? ,?" ,
// 			data[index]
// 		);
// 	} 
// }
