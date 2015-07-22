angular.module('starter.controllers', [])

//var beaconProximity;
//var beaconAccuracy;

.controller('DashCtrl', function($scope, Chats) {
   $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
  //$scope.beaconAccuracy=0;
  //alert("Inside FriendsCtrl");
  var requestButtonClicked = false;
  $scope.requestPayDisabled = false;
    $scope.requestPayClick = function() {
  
   		
   		if(requestButtonClicked==false)
   		{
   			document.getElementById("requestPayBtn").innerHTML = "Pay With Print";
   			document.getElementById("beaconText2").innerHTML = "Please pay $1000.50";
   			requestButtonClicked = true;
   		 	
   		}
   		else
   		{
			

        	
   			
   			function successCallback(){
            	//alert("Pay With Print registration Success");
            	document.getElementById("requestPayBtn").innerHTML = "Request Pay";
   			    document.getElementById("beaconText2").innerHTML = "Thank you for your payment";
   			    requestButtonClicked = false;
       		 }
        	function failureCallback(){
            	//alert("Success TouchID");
            	document.getElementById("requestPayBtn").innerHTML = "Request Pay";
   				document.getElementById("beaconText2").innerHTML = "Payment Failure";
   				requestButtonClicked = false;
        	}
        	function notSupportedCallback(){
            	alert("Failure TouchID");
            	requestButtonClicked = false;
        	}  
   		
   		     
            touchid.authenticate(successCallback, failureCallback, "Pay With Print");
   			//document.getElementById("requestPayBtn").innerHTML = "Request Pay";
   			//document.getElementById("beaconText2").innerHTML = "Thank you for your payment";
   			//requestButtonClicked = false;
   		}
   		// $scope.requestPayDisabled = true;
   		
 	 }
 	 


			 app = {}

  app.didRangeBeaconsInRegion = function(pluginResult)
{
	// There must be a beacon within range.
	if (0 == pluginResult.beacons.length)
	{
		return
	}

	// Our regions are defined so that there is one beacon per region.
	// Get the first (and only) beacon in range in the region.
	var beacon = pluginResult.beacons[0]

	// The region identifier is the page id.
	var pageId = pluginResult.region.identifier

	console.log('ranged beacon: ' + pageId + ' ' + beacon.proximity)
	
	//beaconProximity=beacon.proximity;
	//beaconAccuracy=beacon.accuracy;

    $scope.beaconProximity=beacon.proximity;
    $scope.beaconAccuracy=beacon.accuracy;
    console.log("************" + beacon.accuracy);
    if(beacon.accuracy > 0)
    {
    	document.getElementById('accuracydiv').innerHTML = '';
    	var h1 = document.createElement('h4');
		h1.innerHTML = "Payment Beacon Range   " + beacon.accuracy + " m";
		document.getElementById('accuracydiv').appendChild(h1);
		
		if(beacon.accuracy < 0.50)
		{
			document.getElementById("beaconImage").src="img/green.png";
			document.getElementById("beaconText").innerHTML = "In Pay Range";
			$scope.requestPayDisabled = false;
			document.getElementById("requestPayBtn").disabled = false;
		}
		else
		{
			document.getElementById("beaconImage").src="img/red.png";
			document.getElementById("beaconText").innerHTML = "Move closer to Pay";
			$scope.requestPayDisabled = true;
			document.getElementById("requestPayBtn").disabled = true;
		}
	
	}

	// If the beacon is close and represents a new page, then show the page.
	if ((beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear')
		&& app.currentPage != pageId)
	{
		console.log('Near ranged beacon: ' + pageId + ' ' + beacon.proximity)
		return
	}

	// If the beacon represents the current page but is far away,
	// then show the default page.
	if ((beacon.proximity == 'ProximityFar' || beacon.proximity == 'ProximityUnknown')
		&& app.currentPage == pageId)
	{
		console.log('Far ranged beacon: ' + pageId + ' ' + beacon.proximity)
		return
	}
};


var delegate = new cordova.plugins.locationManager.Delegate();
	
delegate.didDetermineStateForRegion = function (pluginResult) {

    //logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

   // cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
    //    + JSON.stringify(pluginResult));
};

delegate.didStartMonitoringForRegion = function (pluginResult) {
    console.log('didStartMonitoringForRegion:', pluginResult);

    //logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
};

delegate.didRangeBeaconsInRegion = function (pluginResult) {
    //logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
      app.didRangeBeaconsInRegion(pluginResult);
};



var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
        var identifier = 'estimote';
        var minor = 5000;
        var major = 10000;
       // alert("BEACON Ranging Before::" + uuid);
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier,uuid, major, minor);

cordova.plugins.locationManager.setDelegate(delegate);

// required in iOS 8+
cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
// or cordova.plugins.locationManager.requestAlwaysAuthorization()

cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
	.fail(console.error)
	.done();

console.log('BackgroundFetch End');



       
 	 
 	 
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: false
  };
  
  $scope.pwp = {
    enable: false
  };
  
  $scope.pwpChange = function() {
    	function successCallback(){
            alert("Pay With Print registration Success");
        }
        function failureCallback(){
            alert("Success TouchID");
        }
        function notSupportedCallback(){
            alert("Failure TouchID");
        }  
   		 console.log('Push Notification Change', $scope.pwp.enable);
   		 if($scope.pwp.enable==true)
    	{
    		touchid.authenticate(successCallback, failureCallback, "Pay With Print");
    	}
    	else
    	{
    		alert("Deregistration complete");
    	}
  };
  
  $scope.ppChange = function() {
        
       alert("BEACON Ranging");
		var logToDom = function (message) {
	var e = document.createElement('label');
	e.innerText = message;

	var br = document.createElement('br');
	var br2 = document.createElement('br');
	document.body.appendChild(e);
	document.body.appendChild(br);
	document.body.appendChild(br2);
	
	window.scrollTo(0, window.document.height);
};


       
       
       
       
       
  }
  
  $scope.settingsList = [
    { enablePWP: false},
    { text: "GPS", checked: false },
    { text: "Bluetooth", checked: false }
  ];

});