(function() {
    "use strict";
    
    function initialize() {
        // baths json
        var bathsSrc = 'http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BADESTELLENOGD&srsName=EPSG:4326&outputFormat=json';
        
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

        // marker
        var marker = new google.maps.Marker({
            position: myCenter,
            map: map
        });
        
        // message
        var message = new google.maps.InfoWindow({
            content: "Hello World!"
        });
        message.open(map, marker);
        
        // buttons
        google.maps.event.addDomListener($("#taxis")[0], 'click', zoomIn);
        google.maps.event.addDomListener($("#baths")[0], 'click', zoomOut);
    
        function zoomIn() {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
        }
        
        function zoomOut() {
            map.setZoom(12);
            map.setCenter(marker.getPosition());
        }
        
        taxis(map);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    
    function taxis(map) {
        // taxi json
        var taxiSrc = 'http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TAXIOGD&srsName=EPSG:4326&outputFormat=json';
        
        // Taxi data
        $.getJSON(taxiSrc, taxiDataCb);
        
        function taxiDataCb(data) {
            var taxiPoints = data.features;
            log(taxiPoints[0].geometry.coordinates[0]);
            log(taxiPoints[0].properties.ADRESSE);
            
            var marker, i, latLng;
            
            for (i = 0; i < taxiPoints.length; i++) {
                latLng = taxiPoints[i].geometry.coordinates[0];
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latLng[1], latLng[0]),
                    map: map
                });
                log(latLng);
            }
        }
    }
    
    // tools
    function log(stuff) {
        console.log(stuff);
    }
}());
