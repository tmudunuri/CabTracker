// Initialize Firebase
var ln = ['0'];
var lt = ['0'];
var uluru;
var markers = ['0'];
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
var rootRef = firebase.database().ref().child('cabs');
rootRef.on('value', function(snapshot){
    ln[1] = snapshot.child('cb1/lat').val();
    lt[1] = snapshot.child('cb1/long').val();
    ln[2] = snapshot.child('cb2/lat').val();
    lt[2] = snapshot.child('cb2/long').val();
    ln[3] = snapshot.child('cb3/lat').val();
    lt[3] = snapshot.child('cb3/long').val();
    ln[4] = snapshot.child('cb4/lat').val();
    lt[4] = snapshot.child('cb4/long').val();
    ln[5] = snapshot.child('cb5/lat').val();
    lt[5] = snapshot.child('cb5/long').val();
});

var iconBase = 'http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png';

$('#get_map').click(function initMap() {
    uluru = {lat: Number(ln[1]), lng: Number(lt[1])};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });
    markers[1] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 1',
      label: '1',
      icon: iconBase
    });
    markers[2] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 2',
      label: '2',
      icon: iconBase
    });

    markers[3] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 3',
      label: '3',
      icon: iconBase
    });

    markers[4] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 4',
      label: '4',
      icon: iconBase
    });

    markers[5] = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Cab 5',
      label: '5',
      icon: iconBase
    });

    setInterval(function(){
        markers[1].setPosition(new google.maps.LatLng(Number(ln[1]),Number(lt[1])));
        markers[2].setPosition(new google.maps.LatLng(Number(ln[2]),Number(lt[2])));
        markers[3].setPosition(new google.maps.LatLng(Number(ln[3]),Number(lt[3])));
        markers[4].setPosition(new google.maps.LatLng(Number(ln[4]),Number(lt[4])));
        markers[5].setPosition(new google.maps.LatLng(Number(ln[5]),Number(lt[5])));
    }, 2000);


});
