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
    //uluru = {lat: 13, lng: 77.58};
    uluru = {lat: cLat[100], lng: cLong[100]};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });


    //temp
    var cabtmp = ['h'];
        var driversRef = firebase.database().ref().child('drivers'); 
       cMarkers[100] =  new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'KA01',
        label: '01',
        icon: cabIcon
      });

      driversRef.on('value', function(snapshot){
          cLat[100] = snapshot.child('KA01/lat').val();
          cLong[100] = snapshot.child('KA01/lng').val();
          });

          setInterval(function(){
              cMarkers[100].setPosition(new google.maps.LatLng(cLat[100],cLong[100]));
          }, 2000);


       cMarkers[101] =  new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'KA02',
        label: '02',
        icon: cabIcon
      });

      driversRef.on('value', function(snapshot){
          cLat[101] = snapshot.child('KA02/lat').val();
          cLong[101] = snapshot.child('KA02/lng').val();
          });

          setInterval(function(){
              cMarkers[101].setPosition(new google.maps.LatLng(cLat[101],cLong[101]));
          }, 2000);


        cMarkers[102] =  new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'KATest',
        label: 'Test',
        icon: cabIcon
      });

      driversRef.on('value', function(snapshot){
          cLat[102] = snapshot.child('KATest/lat').val();
          cLong[102] = snapshot.child('KATest/lng').val();
          });

          setInterval(function(){
              cMarkers[102].setPosition(new google.maps.LatLng(cLat[102],cLong[102]));
          }, 2000);



       var ridersRef = firebase.database().ref().child('riders'); 


      ridersRef.on('value', function(snapshot){
          pLat[100] = snapshot.child('adithya/lat').val();
          pLong[100] = snapshot.child('adithya/lng').val();
          cabtmp[100] = snapshot.child('adithya/cab').val();
          });

        pMarkers[100] =  new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'adithya',
        label: 'adithya -'+ cabtmp[100],
        icon: psIcon
      });

          setInterval(function(){
              pMarkers[100].setPosition(new google.maps.LatLng(pLat[100],pLong[100]));
          }, 2000);



      ridersRef.on('value', function(snapshot){
          pLat[101] = snapshot.child('agneya/lat').val();
          pLong[101] = snapshot.child('agneya/lng').val();
          cabtmp[101] = snapshot.child('agneya/cab').val();
          });

        pMarkers[101] =  new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'agneya',
        label: 'agneya -'+cabtmp[101],
        icon: psIcon
      });

          setInterval(function(){
              pMarkers[101].setPosition(new google.maps.LatLng(pLat[101],pLong[101]));
          }, 2000);




      ridersRef.on('value', function(snapshot){
          pLat[102] = snapshot.child('ameya/lat').val();
          pLong[102] = snapshot.child('ameya/lng').val();
          cabtmp[102] = snapshot.child('ameya/cab').val();
          });

        pMarkers[102] =  new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'ameya',
        label: 'ameya -'+cabtmp[102],
        icon: psIcon
      });

          setInterval(function(){
              pMarkers[102].setPosition(new google.maps.LatLng(pLat[102],pLong[102]));
          }, 2000);



          //endtemp
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
