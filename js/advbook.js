var config = {
  apiKey: "AIzaSyAVNwUXjOKZMl9Oep7dRLRk1Cv-M2fHTsA",
  authDomain: "linuxbasedtracker.firebaseapp.com",
  databaseURL: "https://linuxbasedtracker.firebaseio.com",
  projectId: "linuxbasedtracker",
  storageBucket: "linuxbasedtracker.appspot.com",
  messagingSenderId: "963805026473"
};
// firebase.initializeApp(config);
var empDetailsRef = firebase.database().ref('empDetailsTest');
var customerRequestRef = firebase.database().ref('customerRequestTest');
var driverDetailsRef = firebase.database().ref('driverDetailsTest');

var mybtn = document.getElementById('mybtn');

mybtn.onclick = function() {
  var ekey = [],
    eaddr = [],
    etime = [],
    dkey = [],
    tkey = [];

  firebase.database().ref('tripTest/').set({
    null: null
  })
  customerRequestRef.on('value', function(snapshot) {
    var i = 0;
    snapshot.forEach(function(childSnapshot) {
      ekey.push(childSnapshot.key);
      etime.push(snapshot.child(ekey[i++] + '/etime').val());
    });
  });

  empDetailsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      ekey1 = childSnapshot.key;
      for (var i in ekey) {
        if (ekey1 == ekey[i]) {
          eaddr.push(snapshot.child(ekey1 + '/address').val());
        }
      }
    });
  });
  driverDetailsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      dkey.push(childSnapshot.key);
    });
  });

  for (var x in ekey) {
    tkey.push(firebase.database().ref('tripTest/').push().key);
    console.log(tkey[x]);
    mybtn.className += " disabled hidden";
    firebase.database().ref('tripTest/' + tkey[x]).update({
      ekey: ekey[x],
      dkey: dkey[x],
      etime: etime[x],
      eaddr: eaddr[x],
    });
  }
};
