import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

export class GoogleMapMarker {
    lat: any;
    lng: any;
}

@Component({
    selector: 'maps-page',
    templateUrl: 'maps.html',
    styles: ['maps.scss']
})
export class MapsPage implements OnInit {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    @ViewChild(Nav) nav: Nav;
    service = new google.maps.places.AutocompleteService();
    gPredictionMarkers: GoogleMapMarker[] = [];

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        this.loadMap();
        this.gPredictionMarkers = this.getPredictions('sub');
    }
    getPredictions(predictionSeed: string) {
        var geocoder = new google.maps.Geocoder();
        let gPredictionMarkers: GoogleMapMarker[] = [];
        this.service.getPlacePredictions({ input: predictionSeed, componentRestrictions: { country: 'IN' } }, function (predictions, status) {
            predictions.forEach(function (prediction) {
                let gMapMarker: GoogleMapMarker = { "lat": 0, "lng": 0 }
                console.log(prediction.description);
                if (status == 'OK') {
                    geocoder.geocode({
                        'placeId': prediction.place_id
                    },
                        function (responses, status) {
                            if (status == 'OK') {
                                gMapMarker.lat = responses[0].geometry.location.lat();
                                gMapMarker.lng = responses[0].geometry.location.lng();
                            }
                            gPredictionMarkers.push(gMapMarker);
                        });
                }
            });

        });
        return gPredictionMarkers;
    }
    loadMap() {
        Geolocation.getCurrentPosition().then((position) => {

            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        }, (err) => {
            console.log(err);
        });

    }
    addMarker() {
        for (let gpm of this.gPredictionMarkers) {
            let marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(gpm.lat, gpm.lng),
            });

            let content = "<h4>Information!</h4>";
            let infoWindow = new google.maps.InfoWindow({
                content: content
            });

            google.maps.event.addListener(marker, 'click', () => {
                infoWindow.open(this.map, marker);
            });
        }
    }
}