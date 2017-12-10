var config = {
  apiKey: "AIzaSyAVNwUXjOKZMl9Oep7dRLRk1Cv-M2fHTsA",
  authDomain: "linuxbasedtracker.firebaseapp.com",
  databaseURL: "https://linuxbasedtracker.firebaseio.com",
  projectId: "linuxbasedtracker",
  storageBucket: "linuxbasedtracker.appspot.com",
  messagingSenderId: "963805026473"
};
firebase.initializeApp(config);
var ref = firebase.database().ref('/')
var empDetailsRef = firebase.database().ref('empDetailsTest');
var customerRequestRef = firebase.database().ref('customerRequestTest');
var driverDetailsRef = firebase.database().ref('driverDetailsTest');

var rABS = true;
var workbook;
var OUT = document.getElementById('out');
var HTMLOUT = document.getElementById('htmlout');

(function() {
  var drop = document.getElementById('drop');
  if (!drop.addEventListener) return;

  function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    var f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      workbook = XLSX.read(data, {
        type: rABS ? 'binary' : 'array'
      });
      // Work on the Excel File Here
      //
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log("wohoo");
      HTMLOUT.innerHTML = XLSX.utils.sheet_to_html(worksheet);
      var output = XLSX.utils.sheet_to_json(worksheet);
      console.log(output);
      strout = JSON.stringify(output, 2, 2);
      OUT.textContent = strout;
      //Write booking details to database
      firebase.database().ref('customerRequestTest/').set({
        null: null
      })
      firebase.database().ref('tripTest/').set({
        null: null
      })
      for (i in output) {
        var eid = output[i].ID,
          time = output[i].P_Time,
          type = output[i].Type;

        function writeBookData(eid, time, type) {
          console.log("sup");
          firebase.database().ref('customerRequestTest/' + eid).update({
            etime: time,
            type: type
          });
        };
        writeBookData(eid, time, type);
      }
    };

    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  }

  function handleDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }
  drop.addEventListener('dragenter', handleDragover, false);
  drop.addEventListener('dragover', handleDragover, false);
  drop.addEventListener('drop', handleDrop, false);
})();
