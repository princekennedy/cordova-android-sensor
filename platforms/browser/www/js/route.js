// define route configurations inside app.config 
// injecting dependencies 
app.config(
  function(
    $stateProvider, 
    $locationProvider,  
    $urlRouterProvider
  ){ 
    // creating routes or states 
    $stateProvider 

        .state('Home', { 
            url : '/home', 
            templateUrl : "html/home.html", 
            controller : "HomeCtrl"
        }) 

        // .state('Login', { 
        //     url : '/login', 
        //     templateUrl : "html/login.html", 
        //     controller : "LoginCtrl"
        // })         

        .state('AddSample', { 
            url : '/addSample', 
            templateUrl : "html/add-sample.html", 
            controller : "SampleCtrl"
        }) 

        .state('Defaults', { 
            url : '/addDefaults', 
            templateUrl : "html/defaults.html", 
            controller : "DefaultCtrl"
        })         

        .state('Sync', { 
            url : '/Sync', 
            templateUrl : "html/sync.html", 
            controller : "SampleCtrl"
        }) 

        // .state('SampleDetail', { 
        //     url : '/viewSample', 
        //     templateUrl : "html/view-sample.html", 
        //     controller : "ViewSampleCtrl"
        // }) 

        // .state('Signup', { 
        //     url : '/signup', 
        //     template : "<h1>Signup Page</h1>", 
        //     controller : "SignupCtrl"
        // }); 
  
    // Redirect to home page if url does not  
    // matches any of the three mentioned above 
    $urlRouterProvider.otherwise("/home"); 
}); 


// app.controller('SignupCtrl', function($scope) {}); 
