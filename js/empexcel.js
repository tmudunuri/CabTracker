var config = {
  apiKey: "AIzaSyAVNwUXjOKZMl9Oep7dRLRk1Cv-M2fHTsA",
  authDomain: "linuxbasedtracker.firebaseapp.com",
  databaseURL: "https://linuxbasedtracker.firebaseio.com",
  projectId: "linuxbasedtracker",
  storageBucket: "linuxbasedtracker.appspot.com",
  messagingSenderId: "963805026473"
};
firebase.initializeApp(config);
var customerRequestRef = firebase.database().ref('customerRequestTest');

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

      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log("wohoo");
      HTMLOUT.innerHTML= XLSX.utils.sheet_to_html(worksheet);
      var output = XLSX.utils.sheet_to_json(worksheet);
      console.log(output);
      strout = JSON.stringify(output, 2, 2);
      OUT.textContent = strout;
      for (i in output) {
        console.log("sup");
        var eid = output[i].ID, name = output[i].Name, Class = output[i].Class, address = output[i].Address;
        function writeEmpData(eid, name, Class, address) {
          firebase.database().ref('empDetailsTest/'+ eid).update({
            ename: name,
            class: Class,
            address: address
          });
        }
        writeEmpData(eid, name, Class, address);
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
