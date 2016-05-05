(function() {
    "use strict";
    
    var taxiMarkers = [];
    var visible = false;
    
    function initialize() {
        // map properties
        var myCenter = new google.maps.LatLng(48.208174, 16.373819);
        var mapProp  = {
            center: myCenter,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };

        // map
        var map = new google.maps.Map($('#map')[0], mapProp);
        
        taxis(map);
        
        google.maps.event.addDomListener($("#taxis")[0], 'click', function() {
            log(taxiMarkers.length);
            for (var i in taxiMarkers) {
                taxiMarkers[i].setVisible(visible);
            }
            
            if(visible) {
                visible = false;
            } else {
                visible = true;
            }
        });
        
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    
    function taxis(map) {
        // taxi json
        var taxiSrc = 'http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TAXIOGD&srsName=EPSG:4326&outputFormat=json';
        
        // Taxi data
        $.getJSON(taxiSrc, taxiDataCb);
        
        function taxiDataCb(data) {
            var marker;
            var latLng;
            var infoWindow;
            var address;
            var taxiPoints = data.features;
            
            for (var i in taxiPoints) {
                latLng  = taxiPoints[i].geometry.coordinates[0];
                address = taxiPoints[i].properties.ADRESSE;
                marker  = new google.maps.Marker({
                    position: new google.maps.LatLng(latLng[1], latLng[0]),
                    map: map
                });
                taxiMarkers.push(marker);
                
                marker.info = new google.maps.InfoWindow({
                    content: address
                });
                
                google.maps.event.addListener(marker, 'mouseover', mouseOverHandler(map, marker));
                google.maps.event.addListener(marker, 'mouseout', mouseOutHandler(marker));
            }
        }
    }
    
    // event handlers
    function taxiButtonHandler(map, myCenter) {
//        for(var i in taxiMarkers) {
//            taxiMarkers[i].setMap(null);
//        }
//
        map.setZoom(15);
        map.setCenter(myCenter);
    }
    
    function clickHandler(mapForLoop, markerForLoop) {
        return function clickHandlerReturn() {
            markerForLoop.info.open(mapForLoop, markerForLoop);
        };
    }

    function mouseOverHandler(mapForLoop, markerForLoop) {
        return function mouseOverHandlerReturn() {
            markerForLoop.info.open(mapForLoop, markerForLoop);
        };
    }

    function mouseOutHandler(markerForLoop) {
        return function mouseOverHandlerReturn() {
            markerForLoop.info.close();
        };
    }

    
    // tools
    function log(stuff) {
        console.log(stuff);
    }
}());


//"features": [
//    {
//      "type": "Feature",
//      "id": "TAXIOGD.1",
//      "geometry": {
//        "type": "LineString",
//        "coordinates": [
//          [
//            16.48414601729984,
//            48.239157877962974
//          ],
//          [
//            16.48428803499524,
//            48.23892437153532
//          ]
//        ]
//      },
//      "geometry_name": "SHAPE",
//      "properties": {
//        "OBJECTID": 1,
//        "ADRESSE": "22., Zanggasse (Bereich Quadenstraße)",
//        "ZEITRAUM": null,
//        "STELLPLATZANZAHL": 5,
//        "SE_ANNO_CAD_DATA": null
//      }
//    },
