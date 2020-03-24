
function _Helper () {

	this.isClass =  function (className) {
		return ( $("." + className).length > 0 ) ? true : false ;
	}

	this.isId =  function (idName) {
		return ( $("#" + idName).length > 0 ) ? true : false ;
	}

	this.isElement =  function (elementName) {
		return ( $( elementName ).length > 0 ) ? true : false ;
	}

	this.json = function (data) {
		
		if (data ==undefined){
			return [];
		}
		return ( typeof(data) == "string" && data != "" ) ? JSON.parse(data) : data  ;
	}

}
var _helper = new _Helper;

user = (localStorage.logged) ? JSON.parse(localStorage.logged) : false ;
var userControl = function(){
  $(".sys").text("Time Tracker");
  $(".note").html(localStorage.toSync+"&nbsp;&nbsp;");


  if(!user) { return; }

  $(".type-user").text(user.name);
  switch(user.check_id){

    case 1 :
    
		$(".add-sample-tab").show();
		$(".sync-data-tab").show();
		break;
    case 2 :

      break;
    case 3 :

      break;
    default:
      break;
  }

}


var dataArray = function(tx, results){
	return 0;
};

/*
*
*
*Capitalise check if funcExists
*/
function _funcOk(getClass ,str ) {
	if(typeof getClass[str] == 'function'){
    	return str
	}else{
	    // console.log("not exist function " + str + "()");
	    return false;
	}			
}
/*
*
*
* generate html Attributes
*/
function _setAttributes(attr) {
	var html = " ";
	for ( index in attr ){
		if (validHtmlAttributes.includes(index)){
			html += index + '="' + attr[index] + '" ';
		}
	}
	return html;
}
/*
*
*
*Capitalise first letter
*/
function _uFirst(str){
	return (typeof str == 'string') ? str.charAt(0).toUpperCase() + str.slice(1) : "" ;
}



var hashCode = function(){
  return (+new Date).toString(36);              
};

var isPage = function(pageId){
	return ( $("ons-page").attr("id") == pageId ) ? true : false ;
};


function searching(){

	$(".search").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
	    $(".gSample").filter(function() {
	      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
  	});

// 	$("#search").keyup(function () {
//     var value = this.value.toLowerCase().trim();

//     $("table tbody .ss").each(function (index) {
//         if (!index) return;
//         $(this).find("td").each(function () {
//             var id = $(this).text().toLowerCase().trim();
//             var not_found = (id.indexOf(value) == -1);
//             $(this).closest('tr').toggle(!not_found);
//             return not_found;
//         });
//     });
// });
}


