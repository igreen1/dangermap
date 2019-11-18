var mymap;
		var myPins = new Array();
		var pinList;
		var lat = 40.416;
		var long = -3.704; //default to madrid

		//TODO ERROR HERE
		if (navigator.geolocation) {
 			 // geolocation is available
			navigator.geolocation.getCurrentPosition(
				function(position) {

				var lat = position.coords.latitude;
				var long = position.coords.longitude;

				}
			);
		} 

		//if geolocation not supported or denied, defaults to lat, long of madrid :)
		mymap = L.map('mapid').setView([lat, long], 15); //centered around mardid

		//must note contributions! TODO fix that this is out of frame by filling screen on some laptops :((((	
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(mymap);

		var popup = L.popup();


		function storeLocation(latlang, goodBad) {
			

			//make data organized? TODO
			var data = "latlng="+latlang+"&goodOrBad="+goodBad;

			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function(){

				if(xhr.readyState == 4 && xhr.status == 200){
					console.log(xhr.responseText);
                                }


                        }


			xhr.open( "POST", "map_data.php", true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send(data);


var LeafIcon = L.Icon.extend({
                                options: {
                                        iconSize:     [30, 30],
                                        shadowSize:   [50, 64],
                                        iconAnchor:   [15, 15],
                                        popupAnchor:  [-3, -76]
                                }
                        });


                        var greenIcon = new LeafIcon({iconUrl: 'green_pin.png'});
                        var redIcon = new LeafIcon({iconUrl: 'red_pin.png'});

			//"LatLng(40.14241241, -3.1231238)"
			console.log(latlang);
			latlng =latlang.toString();
                        latlng = latlng.replace("LatLng(","").replace(")", "").replace(" ","");
                        lat_long = latlng.split(",");//supposed to use regex but eh

                                                lat = parseFloat(lat_long[0]);
                                                long = parseFloat(lat_long[1]);

			if(goodBad == "good")
                                                {
                                                        L.marker([lat, long], {icon: greenIcon}).addTo(mymap);
                                                        console.log("hello");
                                                }
                                                else{
                                                     	L.marker([lat, long], {icon: redIcon}).addTo(mymap);
                                                }



		}

		function readLocation() {
			
			var ajax = new XMLHttpRequest();

			ajax.onreadystatechange = function(){
				//alert(this.status);
                                if(this.readyState == 4 && this.status == 200){
                                        console.log(this.responseText);
                                        var data = JSON.parse(this.responseText);
					console.log(data);
					pinList = data;
                                }

                        };
                	
		

			ajax.open("GET", "retrieve_data.php", true);
			ajax.send();

		}

		function createButton(label, container, latlng) {
			var btn = L.DomUtil.create('button', '', container);
			btn.setAttribute('type', 'button');
			btn.innerHTML = label;
			btn.latlng = latlng;
			return btn;
		}


		function onMapClick(e) {
			
			var container = L.DomUtil.create('div');
			
			goodBtn = createButton("Good", container,e.latlng);
			badBtn = createButton("Bad", container, e.latlng);
			
			//div.innerHTML = ''+startBtn+ '&nbsp;&nbsp;&nbsp;&nbsp;' + destBtn ; 

			popup
				.setLatLng(e.latlng)
				.setContent(container)
				.openOn(mymap);

			L.DomEvent.on(goodBtn, 'click', () => {
				storeLocation(goodBtn.latlng, "good");
				mymap.closePopup();
			});

			
			L.DomEvent.on(badBtn, 'click', () => {
				storeLocation(badBtn.latlng, "bad");
				mymap.closePopup();
			});
		}

		mymap.on('click', onMapClick);


                function populateInitialPins()
                {
                        var LeafIcon = L.Icon.extend({
                                options: {
                                        iconSize:     [30, 30],
                                        shadowSize:   [50, 64],
                                        iconAnchor:   [15, 15],
                                        popupAnchor:  [-3, -76]
                                }
                        });


                        var greenIcon = new LeafIcon({iconUrl: 'green_pin.png'});
                        var redIcon = new LeafIcon({iconUrl: 'red_pin.png'});


			var ajax = new XMLHttpRequest();

                        ajax.onreadystatechange = function(){
                                //alert(this.status);
                                if(this.readyState == 4 && this.status == 200){

					var data = JSON.parse(this.responseText);

					for(var i = 0; i < data.length; i++){

                                		var obj = data[i];
   						console.log(obj);
	                             		//"LatLng(40.14241241, -3.1231238)"
                                		obj['latlng'] = obj['latlng'].replace("LatLng(","").replace(")", "").replace(" ","");
                                		lat_long = obj.latlng.split(",");//supposed to use regex but eh
                       	        		
						lat = parseFloat(lat_long[0]);
						long = parseFloat(lat_long[1]);


                	                	if(obj.goodOrbad == "good")
                        	        	{
							L.marker([lat, long], {icon: greenIcon}).addTo(mymap);
							console.log("hello");
                        	        	}
						else{
							L.marker([lat, long], {icon: redIcon}).addTo(mymap);						
						}

					
					}

                                }

                        };



                        ajax.open("GET", "retrieve_data.php", true);
                        ajax.send();




                }
                populateInitialPins()
