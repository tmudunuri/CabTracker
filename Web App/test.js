// Initialize Firebase
var cLat = ['0'], cLong = ['0']; //Cabs coordinates
var pLong = ['0'], pLat = ['0']; //Passenger coordinates
var uluru;
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

// var rootRef = firebase.database().ref().child('co');
// $('#send_co').click(function(){
//     rootRef.set({
//         lat:$('#lat').val(),
//         long:$('#long').val()
//     });
// });
//
// $('#get_co').click(function(){
//     rootRef.on('value', function(snapshot){
//         lat:$('#lat').val(snapshot.child('lat').val());
//         ln = snapshot.child('lat').val();
//         long:$('#long').val(snapshot.child('long').val());
//         lt = snapshot.child('long').val();
//     })
// });

//New Markers
var cabsRef = firebase.database().ref().child('cabs');
cabsRef.on('value', function(snapshot){
    cLat[1] = snapshot.child('cb1/lat').val();
    cLong[1] = snapshot.child('cb1/long').val();
    cLat[2] = snapshot.child('cb2/lat').val();
    cLong[2] = snapshot.child('cb2/long').val();
    cLat[3] = snapshot.child('cb3/lat').val();
    cLong[3] = snapshot.child('cb3/long').val();
    cLat[4] = snapshot.child('cb4/lat').val();
    cLong[4] = snapshot.child('cb4/long').val();
    cLat[5] = snapshot.child('cb5/lat').val();
    cLong[5] = snapshot.child('cb5/long').val();
});

var passengersRef = firebase.database().ref().child('passengers');
passengersRef.on('value', function(snapshot){
    pLat[1] = snapshot.child('ps1/lat').val();
    pLong[1] = snapshot.child('ps1/long').val();
    pLat[2] = snapshot.child('ps2/lat').val();
    pLong[2] = snapshot.child('ps2/long').val();
    pLat[3] = snapshot.child('ps3/lat').val();
    pLong[3] = snapshot.child('ps3/long').val();
    pLat[4] = snapshot.child('ps4/lat').val();
    pLong[4] = snapshot.child('ps4/long').val();
    pLat[5] = snapshot.child('ps5/lat').val();
    pLong[5] = snapshot.child('ps5/long').val();
});


$('#get_map').click(function initMap() {
    uluru = {lat: Number(cLat[1]), lng: Number(cLong[1])};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });
    cMarkers[1] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 1',
      label: '1',
      icon: cabIcon
    });
    cMarkers[2] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 2',
      label: '2',
      icon: cabIcon
    });

    cMarkers[3] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 3',
      label: '3',
      icon: cabIcon
    });

    cMarkers[4] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 4',
      label: '4',
      icon: cabIcon
    });

    cMarkers[5] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 5',
      label: '5',
      icon: cabIcon
    });

    setInterval(function(){
        cMarkers[1].setPosition(new google.maps.LatLng(Number(cLat[1]),Number(cLong[1])));
        cMarkers[2].setPosition(new google.maps.LatLng(Number(cLat[2]),Number(cLong[2])));
        cMarkers[3].setPosition(new google.maps.LatLng(Number(cLat[3]),Number(cLong[3])));
        cMarkers[4].setPosition(new google.maps.LatLng(Number(cLat[4]),Number(cLong[4])));
        cMarkers[5].setPosition(new google.maps.LatLng(Number(cLat[5]),Number(cLong[5])));
    }, 2000);


//Passengers

    pMarkers[1] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Passenger 1',
      label: '1',
      icon: psIcon
    });
    pMarkers[2] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Passenger 2',
      label: '2',
      icon: psIcon
    });

    pMarkers[3] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Passenger 3',
      label: '3',
      icon: psIcon
    });

    pMarkers[4] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Passenger 4',
      label: '4',
      icon: psIcon
    });

    pMarkers[5] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Passenger 5',
      label: '5',
      icon: psIcon
    });

    setInterval(function(){
        pMarkers[1].setPosition(new google.maps.LatLng(Number(pLat[1]),Number(pLong[1])));
        pMarkers[2].setPosition(new google.maps.LatLng(Number(pLat[2]),Number(pLong[2])));
        pMarkers[3].setPosition(new google.maps.LatLng(Number(pLat[3]),Number(pLong[3])));
        pMarkers[4].setPosition(new google.maps.LatLng(Number(pLat[4]),Number(pLong[4])));
        pMarkers[5].setPosition(new google.maps.LatLng(Number(pLat[5]),Number(pLong[5])));
    }, 2000);

});
