// Initialize Firebase
var daLat = [], daLong = []; //Availble Drivers coordinates
var dwLat = [], dwLong = [];	//Working Drivers coordinates
var pLat = [], pLong = []; //Passenger coordinates
var daMarkers = [], dwMarkers = [], pMarkers = []; //Maps Markers
var uluru, map;



var daIcon = 'http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png'; //Marker Icons
var dwIcon = 'http://maps.google.com/mapfiles/kml/paddle/red-blank.png'
var pIcon = 'http://maps.gstatic.com/mapfiles/cb/man_arrow-0.png';
var config = {
  apiKey: "AIzaSyAVNwUXjOKZMl9Oep7dRLRk1Cv-M2fHTsA",
  authDomain: "linuxbasedtracker.firebaseapp.com",
  databaseURL: "https://linuxbasedtracker.firebaseio.com",
  projectId: "linuxbasedtracker",
  storageBucket: "linuxbasedtracker.appspot.com",
  messagingSenderId: "963805026473"
};
firebase.initializeApp(config);
var driversAvailableRef = firebase.database().ref('driversAvailableTest');
var customerRequestRef = firebase.database().ref('customerRequestTest'); 
var driversWorkingRef = firebase.database().ref('driversWorkingTest');  

//Load Map
$('#load_map').click(function initMap() {
    uluru = {lat: 13, lng: 77.58};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });

    driversAvailable();
    passengerRequest();
    driversWorking();
});

//Load Availble Drivers
//$('#d_avail').click(driversAvailable());
function driversAvailable() {
//New Marker
var key;
    driversAvailableRef.once('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		key = childSnapshot.key;
    		daLat[key] = snapshot.child(key + '/l/0').val();
    		daLong[key] = snapshot.child(key + '/l/1').val();

    		uluru = {lat: Number(daLat[key]), lng: Number(daLong[key])};
    		daMarkers[key] =  new google.maps.Marker({
    			position: uluru,
       			map: map,
        		title: key,
        		label: key,
        		icon: daIcon
    		});
    	});
    });
//New Marker End


//Added Child
    driversAvailableRef.on('child_added', function(snapshot, key){
    		key = snapshot.key;
    		daLat[key] = snapshot.child(key + '/l/0').val();
    		daLong[key] = snapshot.child(key + '/l/1').val();

    		uluru = {lat: Number(daLat[key]), lng: Number(daLong[key])};
    		daMarkers[key] =  new google.maps.Marker({
    			position: uluru,
       			map: map,
        		title: key,
        		label: key,
        		icon: daIcon
    		});
    });
//Added Child End


//Marker Updattion
    driversAvailableRef.on('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		var key = childSnapshot.key;
    		daLat[key] = snapshot.child(key + '/l/0').val();
    		daLong[key] = snapshot.child(key + '/l/1').val();
    		
    	setInterval(function(){
        	daMarkers[key].setPosition(new google.maps.LatLng(daLat[key],daLong[key]));
   		}, 2000);
    	});
    });
////Marker Updattion End


//Marker Deletion
    driversAvailableRef.on('child_removed', function(snapshot){
    	key = snapshot.key;
     	daLat[key] = null;
    	daLong[key] = null;	
		daMarkers[key].setPosition(new google.maps.LatLng(null,null));
    });
//Marker deletion End

};






function passengerRequest() {
//New Marker
var key;
    customerRequestRef.once('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		key = childSnapshot.key;
    		pLat[key] = snapshot.child(key + '/l/0').val();
    		pLong[key] = snapshot.child(key + '/l/1').val();

    		uluru = {lat: Number(pLat[key]), lng: Number(pLong[key])};
    		pMarkers[key] =  new google.maps.Marker({
    			position: uluru,
       			map: map,
        		title: key,
        		label: key,
        		icon: pIcon
    		});
    	});
    });
//New Marker End


//Added Child
    customerRequestRef.on('child_added', function(snapshot, key){
    		key = snapshot.key;
    		pLat[key] = snapshot.child(key + '/l/0').val();
    		pLong[key] = snapshot.child(key + '/l/1').val();

    		uluru = {lat: Number(pLat[key]), lng: Number(pLong[key])};
    		pMarkers[key] =  new google.maps.Marker({
    			position: uluru,
       			map: map,
        		title: key,
        		label: key,
        		icon: pIcon
    		});
    });
//Added Child End


//Marker Updattion
    customerRequestRef.on('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		var key = childSnapshot.key;
    		pLat[key] = snapshot.child(key + '/l/0').val();
    		pLong[key] = snapshot.child(key + '/l/1').val();
    		
    	setInterval(function(){
        	pMarkers[key].setPosition(new google.maps.LatLng(pLat[key],pLong[key]));
   		}, 2000);
    	});
    });
////Marker Updattion End


//Marker Deletion
    customerRequestRef.on('child_removed', function(snapshot){
    	key = snapshot.key;
     	pLat[key] = null;
    	pLong[key] = null;	
		pMarkers[key].setPosition(new google.maps.LatLng(null,null));
    });
//Marker deletion End

};






function driversWorking() {
//New Marker
var key;
    driversWorkingRef.once('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		key = childSnapshot.key;
    		dwLat[key] = snapshot.child(key + '/l/0').val();
    		dwLong[key] = snapshot.child(key + '/l/1').val();

    		uluru = {lat: Number(dwLat[key]), lng: Number(dwLong[key])};
    		dwMarkers[key] =  new google.maps.Marker({
    			position: uluru,
       			map: map,
        		title: key,
        		label: key,
        		icon: dwIcon
    		});
    	});
    });
//New Marker End


//Added Child
    driversWorkingRef.on('child_added', function(snapshot, key){
    		key = snapshot.key;
    		dwLat[key] = snapshot.child(key + '/l/0').val();
    		dwLong[key] = snapshot.child(key + '/l/1').val();

    		uluru = {lat: Number(dwLat[key]), lng: Number(dwLong[key])};
    		dwMarkers[key] =  new google.maps.Marker({
    			position: uluru,
       			map: map,
        		title: key,
        		label: key,
        		icon: dwIcon
    		});
    });
//Added Child End


//Marker Updattion
    driversWorkingRef.on('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		var key = childSnapshot.key;
    		dwLat[key] = snapshot.child(key + '/l/0').val();
    		dwLong[key] = snapshot.child(key + '/l/1').val();
    		
    	setInterval(function(){
        	dwMarkers[key].setPosition(new google.maps.LatLng(dwLat[key],dwLong[key]));
   		}, 2000);
    	});
    });
////Marker Updattion End


//Marker Deletion
    driversWorkingRef.on('child_removed', function(snapshot){
    	key = snapshot.key;
     	dwLat[key] = null;
    	dwLong[key] = null;	
		dwMarkers[key].setPosition(new google.maps.LatLng(null,null));
    });
//Marker deletion End

};