// Initialize Firebase
var daLat = [], daLong = []; //Availble Drivers coordinates
var dwLat = [], dwLong = [];	//Working Drivers coordinates
var pLat = [], pLong = []; //Passenger coordinates


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

var addr = [], key;


// Generate Drivers Availble Table
function daGen(geocoder) {
	var driverTable = document.getElementById("driversOnline");

	var row;
	var dID, cReg, cType, dloc, rType, pAss;
	
    driversAvailableRef.once('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		key = childSnapshot.key;

    		row = driverTable.insertRow(1);
    		dID = row.insertCell(0);
		   	cReg = row.insertCell(1);
			cType = row.insertCell(2);
			pAss = row.insertCell(3);
			rType = row.insertCell(4);
			dloc = row.insertCell(5);

  			dID.innerHTML = key;
			cType.innerHTML = snapshot.child(key + '/cType').val();
			cReg.innerHTML = snapshot.child(key + '/cReg').val();
			dloc.innerHTML = snapshot.child(key + '/l/0').val() + ',' + snapshot.child(key + '/l/1').val();
			pAss.innerHTML = snapshot.child(key + '/passAss').val();
			rType.innerHTML = snapshot.child(key + '/rType').val();
			

			//Inserts drivers into form
		    var x = document.getElementById("driverSelect");
		    var option = document.createElement("option");
		    option.text = snapshot.child(key + '/cReg').val();
		    option.value = key;
		    x.add(option);	
		    //End Inserts drivers into form	
			

    	});
    });

}



// Generate Drivers Working Table
function dwGen(geocoder) {
	var driverTable = document.getElementById("driversWorking");

	var row;
	var dID, cReg, cType, pAssigned, rType, dLoc, loc;
	
    driversWorkingRef.once('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		key = childSnapshot.key;

    		row = driverTable.insertRow(1);
    		dID = row.insertCell(0);
		   	cReg = row.insertCell(1);
			cType = row.insertCell(2);
			pAssigned = row.insertCell(3);
			rType = row.insertCell(4);
			loc = row.insertCell(5);
			dLoc = row.insertCell(6);

  			dID.innerHTML = key;
			cType.innerHTML = snapshot.child(key + '/cType').val();
			cReg.innerHTML = snapshot.child(key + '/cReg').val();
			loc.innerHTML = snapshot.child(key + '/l/0').val() + ',' + snapshot.child(key + '/l/1').val();
			rType.innerHTML = snapshot.child(key + '/rType').val();
			dLoc.innerHTML = snapshot.child(key + '/dLoc').val();
			pAssigned.innerHTML = snapshot.child(key + '/passAss').val();
			

    	});
    });

}



// Generate Passengers Table
function pGen(){
	var driverTable = document.getElementById("passengerRequests");

	var key, row, geocoder, latlng, results;
	var pID, name, pType, cabAssigned, rType, loc;
	
    customerRequestRef.once('value', function(snapshot){
    	snapshot.forEach(function(childSnapshot) {
    		key = childSnapshot.key;

    		row = driverTable.insertRow(1);
    		pID = row.insertCell(0);
		   	name = row.insertCell(1);
			pType = row.insertCell(2);
			cabAssigned = row.insertCell(3);
			rType = row.insertCell(4);
			loc = row.insertCell(5);


  			pID.innerHTML = key;
			pType.innerHTML = snapshot.child(key + '/pType').val();
			name.innerHTML = snapshot.child(key + '/Name').val();
			loc.innerHTML = snapshot.child(key + '/l/0').val() + ',' + snapshot.child(key + '/l/1').val();
			rType.innerHTML = snapshot.child(key + '/rType').val();
			cabAssigned.innerHTML = snapshot.child(key + '/cabAss').val();


			//Inserts drivers into form
		    var x = document.getElementById("passengerSelect");
		    var option = document.createElement("option");
		    option.text = snapshot.child(key + '/Name').val();
		    option.value = key;
		    x.add(option);	
		    //End Inserts drivers into form	

    	});
    });

}






function submit_by_id() {

	var driverSelect = document.getElementById("driverSelect").value;
	var passengerSelect = document.getElementById("passengerSelect").value;
	var rType = document.getElementById("rType").value;
	var address = document.getElementById("autocomplete").value;
	var geocoder = new google.maps.Geocoder();



/*	firebase.database().ref('driversAvailableTest/' + driverSelect).once('value', function(snapshot){
		cabType = snapshot.child('cType').val();
		cabReg = snapshot.child('cReg').val();
		llat = snapshot.child('/l/0').val();
		llng = snapshot.child('/l/1').val();
	});*/

    geocoder.geocode( { 'address': address}, function(results) {
        ddLoc = results[0].place_id;
		firebase.database().ref('driversAvailableTest/' + driverSelect).update({
	    dLoc: ddLoc
	  });


		firebase.database().ref('customerRequestTest/' + passengerSelect).update({
	    dLoc: dLoc
	  });
    });
	

/*		firebase.database().ref('driversWorkingTest/' + driverSelect).update({
	    rType: rType,
	    passAss: passengerSelect,
	    cType: cabType,
	    cReg: cabReg
	  });
		firebase.database().ref('driversWorkingTest/' + driverSelect + '/l').update({
	    0: llat,
	    1: llng
	  });*/

	  	firebase.database().ref('driversAvailableTest/' + driverSelect).update({
	    rType: rType,
	    passAss: passengerSelect
	  });


	firebase.database().ref('customerRequestTest/' + passengerSelect).update({
    rType: rType,
 	cabAss: driverSelect
  });
	document.getElementById("form_id").submit(); //form submission
}


daGen();
//dwGen();
pGen();





// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}






 

 


























       // This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var placeSearch, autocomplete;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        //autocomplete.addListener('place_changed', fillInAddress);
      }



      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
/*            var geolocation = {
              lat: 13.1,
              lng: 77.5
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: 10000
            });*/
			var input = document.getElementById('autocomplete');
			var options = {
			  componentRestrictions: {country: 'in'}
			};

			autocomplete = new google.maps.places.Autocomplete(input, options);
         
        }
      



































































































































			// Reverse Geocoder
/*			var geocoder = new google.maps.Geocoder;
			var latlng = {lat: parseFloat(snapshot.child(key + '/l/0').val()), lng: parseFloat(snapshot.child(key + '/l/1').val())};
			geocoder.geocode({'location': latlng}, function(results) {
			    if (results[0].formatted_address) {
			    	addr[childSnapshot.key] = results[0].formatted_address;
			    	
			    }
	    		else {
	    			addr[childSnapshot.key] = "Address Unavilable";
    			}
  			});		*/
  			// Reverse Geocoder