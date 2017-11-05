// Initialize Firebase
var cLat = ['0'], cLong = ['0']; //Cabs coordinates
var pLong = ['0'], pLat = ['0']; //Passenger coordinates
var uluru, map;
var cMarkers = ['0'], pMarkers = ['0']; //Maps Markers

var cabIcon = 'http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png'; //Marker Icons
var psIcon = 'http://maps.gstatic.com/mapfiles/cb/man_arrow-0.png';
var config = {
  apiKey: "AIzaSyAVNwUXjOKZMl9Oep7dRLRk1Cv-M2fHTsA",
  authDomain: "linuxbasedtracker.firebaseapp.com",
  databaseURL: "https://linuxbasedtracker.firebaseio.com",
  projectId: "linuxbasedtracker",
  storageBucket: "linuxbasedtracker.appspot.com",
  messagingSenderId: "963805026473"
};
firebase.initializeApp(config);
var cabsRef = firebase.database().ref().child('cabs');
var passengersRef = firebase.database().ref().child('passengers');


$('#get_map').click(function initMap() {
    uluru = {lat: 13, lng: 77.58};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });
});


//Add passengers

$('#add_ps').click(
function addPassenger() {
    var pId, lat, long;
    pId = prompt("Enter Passenger ID");
    lat = prompt("Enter Latitude");
    long = prompt("Enter Longitude");
  firebase.database().ref().child('passengers/ps' + pId).set({
    lat: lat,
    long: long
  });

  pMarkers[Number(pId)] =  new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Passenger '+ pId,
        label: pId,
        icon: psIcon
      });

      passengersRef.on('value', function(snapshot){
          pLat[Number(pId)] = snapshot.child('ps'+ pId +'/lat').val();
          pLong[Number(pId)] = snapshot.child('ps'+ pId + '/long').val();
          });

          setInterval(function(){
              pMarkers[Number(pId)].setPosition(new google.maps.LatLng(pLat[Number(pId)],pLong[Number(pId)]));
          }, 2000);
});




//Add Cabs

$('#add_cab').click(
function addCab() {
    var cId, lat, long;
    cId = prompt("Enter Cab ID");
    lat = prompt("Enter Latitude");
    long = prompt("Enter Longitude");
  firebase.database().ref().child('cabs/cb' + cId).set({
    lat: lat,
    long: long
  });

  cMarkers[Number(cId)] =  new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Cab '+ cId,
        label: cId,
        icon: cabIcon
      });

      cabsRef.on('value', function(snapshot){
          cLat[Number(cId)] = snapshot.child('cb'+ cId +'/lat').val();
          cLong[Number(cId)] = snapshot.child('cb'+ cId + '/long').val();
          });

          setInterval(function(){
              cMarkers[Number(cId)].setPosition(new google.maps.LatLng(cLat[Number(cId)],cLong[Number(cId)]));
          }, 2000);
});
