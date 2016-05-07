requirejs(['jquery', 'bootstrap'], function ($, bootstrap) {
    'use strict';

    // start main when browser is ready
    google.maps.event.addDomListener(window, 'load', main);

    function main() {
        var map;
        var taxisSrc = 'http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TAXIOGD&srsName=EPSG:4326&outputFormat=json';
        var bathSrc = 'http://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BADESTELLENOGD&srsName=EPSG:4326&outputFormat=json';

        // show map
        map = mapSetup();

        // load and show taxis
        getAndShowData(map, taxisSrc);

        // load and show baths
        getAndShowData(map, bathSrc);

        // handle window resize
        resizeMap(map);
    }

    function resizeMap(map) {
        google.maps.event.addDomListener(window, "resize", function () {
            var currCenter = map.getCenter();

            google.maps.event.trigger(map, "resize");

            map.setCenter(currCenter);
        });
    }

    // map properties
    function mapSetup() {
        var mapProp = {};
        var map = {};

        mapProp = {
            center: new google.maps.LatLng(48.208174, 16.373819),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };

        map = new google.maps.Map($('#map')[0], mapProp);

        return map;
    }

    // app logic
    function getAndShowData(map, src) {
        $.getJSON(src, jsonDataCb);

        function jsonDataCb(data) {
            var marker = {};
            var latLng = [];
            var infoWindow = {};
            var iwContent = '';
            var points = [];
            var markers = [];
            var type = '';

            points = data.features;

            // check case: baths or taxis?
            if (points[0].id.indexOf('BAD') >= 0) {
                type = 'baths';
            } else {
                type = 'taxis';
            }

            // create markers and info windows
            for (var i in points) {
                if (type === 'baths') {
                    latLng = points[i].geometry.coordinates;
                    iwContent = points[i].properties.BEZEICHNUNG;

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latLng[1], latLng[0]),
                        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        map: map
                    });
                } else {
                    latLng = points[i].geometry.coordinates[0];
                    iwContent = points[i].properties.ADRESSE;

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latLng[1], latLng[0]),
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        map: map
                    });
                }

                marker.info = new google.maps.InfoWindow({
                    content: iwContent
                });

                markers.push(marker);

                // mouse events
                google.maps.event.addListener(marker, 'mouseover', mouseOverHandler(map, marker));
                google.maps.event.addListener(marker, 'mouseout', mouseOutHandler(marker));
            }

            google.maps.event.addDomListener($('#' + type)[0], 'click', buttonClickHandler(markers, type));
        }
    }

    // event handlers
    function buttonClickHandler(markers, type) {
        return function buttonClickHandler() {
            for (var i in markers) {
                markers[i].setVisible(!(markers[i].getVisible()));
            }

            if ($('#' + type).hasClass('active')) {
                $('#' + type).removeClass('active');
            } else {
                $('#' + type).addClass('active');
            }

        };
    }

    function mouseOverHandler(map, marker) {
        return function mouseOverHandlerReturn() {
            marker.info.open(map, marker);
        };
    }

    function mouseOutHandler(marker) {
        return function mouseOverHandlerReturn() {
            marker.info.close();
        };
    }

    // tools
    function log(stuff) {
        console.log(stuff);
    }
});