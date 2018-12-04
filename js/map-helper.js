(function ($) {
    "use strict";
    CustomMarker.prototype = new google.maps.OverlayView();

    function CustomMarker(opts) {
        this.setValues(opts);
    }

    CustomMarker.prototype.draw = function () {
        var self = this;
        var div = this.div;
        if (!div) {
            div = this.div = $('' +
                '<div>' +
                '<div class="shadow"></div>' +
                '<div class="pulse"></div>' +
                '<div class="pin-wrap">' +
                '<div class="pin"></div>' +
                '</div>' +
                '</div>' +
                '')[0];
            this.pinWrap = this.div.getElementsByClassName('pin-wrap');
            this.pin = this.div.getElementsByClassName('pin');
            this.pinShadow = this.div.getElementsByClassName('shadow');
            div.style.position = 'absolute';
            div.style.cursor = 'pointer';
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
            google.maps.event.addDomListener(div, "click", function (event) {
                google.maps.event.trigger(self, "click", event);
            });
        }
        var point = this.getProjection().fromLatLngToDivPixel(this.position);
        if (point) {
            div.style.left = point.x + 'px';
            div.style.top = point.y + 'px';
        }
    };


    $(function () {

        var mapPos = new google.maps.LatLng(40.728157, -74.077642);
        var map = new google.maps.Map(document.getElementById("contact-google-map"), {
            zoom: 10,
            styles: [{"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"color": "#444444"} ] }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"} ] }, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"} ] }, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100 }, {"lightness": 45 } ] }, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"} ] }, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"} ] }, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"} ] }, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#ededed"}, {"visibility": "on"} ] } ],
            center: mapPos,
            disableDefaultUI: true

        });

        var markerAPos = new google.maps.LatLng(40.712784, -74.005941);
        var markerA = new CustomMarker({
            position: markerAPos,
            draggable: true,
            map: map
        });
        var markerBPos = new google.maps.LatLng(40.728157, -74.077642);
        var markerB = new CustomMarker({
            position: markerBPos,
            draggable: true,
            map: map
        });

    });

})(jQuery);