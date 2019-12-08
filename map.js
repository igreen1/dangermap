

//the variable for the actual map layer
var mymap;
//the variable to hold the pins to be displayed
var myPins;

//the location of the initial center of the screen
var lat = 40.416;
var lang = -3.704;

//the icon class that will be used to put points on the map
var pinIcon = L.icon.extend({

    options:{

        iconSize:       [30,30],
        shadowsize:     [50,64],
        iconAnchor:     [15,15],
        popupAnchor:    [-3,76]

    }

})