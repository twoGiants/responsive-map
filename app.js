var map;

function initialize() {
    var mapOptions = {
        zoom: 2,
        center: {
            lat: -33.865427,
            lng: 151.196123
        },
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

    // (In this example we use a locally stored copy instead.)
    //                     script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
    script.src = 'http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TAXIOGD&srsName=EPSG:4326&outputFormat=json';
    //        script.src = 'earthquake_GeoJSONP.js';
    $.getJSON(script.src, function (data) {
        //                console.log(data);
        document.getElementsByTagName('head')[0].appendChild(script);
        //                map.data.addGeoJson(data);
    });

    //            
}

//        function eqfeed_callback(results) {
//            map.data.addGeoJson(results);
//        }

// Call the initialize function after the page has finished loading
google.maps.event.addDomListener(window, 'load', initialize);