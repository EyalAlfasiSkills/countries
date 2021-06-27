import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { BehaviorSubject } from 'rxjs';
import { Country } from 'src/app/services/country-service/country';
import { FavoriteCountriesService } from 'src/app/services/favorite-countries-service/favorite-countries.service';
import { MapService } from 'src/app/services/map-service/map.service';
import { HouseLocation, MoveoLocation } from './locations';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {

  constructor(
    private mapService: MapService,
    private favoriteCountriesService: FavoriteCountriesService,
  ) { }

  ngOnInit(): void {
    this.initializeMap()
  }

  map!: google.maps.Map

  moveoLocation!: google.maps.LatLng
  myHouseLocation!: google.maps.LatLng

  autoComplete!: google.maps.places.Autocomplete;

  directionsService!: google.maps.DirectionsService
  directionsRenderer!: google.maps.DirectionsRenderer

  isRouteDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isRouteControllesShown = false

  currentRoute: google.maps.DirectionsLeg | null = null

  travelMode!: google.maps.TravelMode

  travelOptions!: google.maps.TravelMode[]

  loader = new Loader({
    apiKey: "AIzaSyDMzUS2bHgxuzbUFQaNeNtyo1jd4S9B80s",
    version: "weekly",
    libraries: ["places"]
  });

  initializeMap = () => {
    this.loader.load().then(() => {
      this.moveoLocation = new google.maps.LatLng(MoveoLocation)
      this.myHouseLocation = new google.maps.LatLng(HouseLocation)

      this.travelMode = google.maps.TravelMode.DRIVING
      this.travelOptions = [
        google.maps.TravelMode.DRIVING,
        google.maps.TravelMode.BICYCLING,
        google.maps.TravelMode.WALKING,
      ]

      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: this.moveoLocation,
          zoom: 16,
        });

      this.autoComplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete') as HTMLInputElement,
        {
          componentRestrictions: { 'country': ['IL'] },
          fields: ['place_id', 'geometry', 'name']
        }
      )

      this.routeDisplayListener()

      this.autoComplete.addListener('place_changed', this.onPlaceChanged)

      this.mapService.markers$.subscribe((markers: google.maps.LatLng[]) => {
        if (markers.length) {
          markers.forEach((marker: google.maps.LatLng) => {
            this.addMarker(marker)
          })
        }
      })
      this.favoriteCountriesService.countries$.subscribe(favoriteCountries => {
        if (favoriteCountries.length) {
          favoriteCountries.forEach((country: Country) => {
            this.addMarker(country.latlng)
          })
        }
      })
      this.mapService.addMarker(this.moveoLocation)

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map: this.map,
      });
    });
  }

  addMarker = (location: google.maps.LatLng | google.maps.LatLngLiteral) => {
    new google.maps.Marker({
      position: location,
      map: this.map,
    });
  }

  onPlaceChanged = () => {
    const place: google.maps.places.PlaceResult = this.autoComplete.getPlace();

    console.log(place);

    if (!place.geometry || !place.geometry.location) {
      console.log('No location data');
      return
    }

    this.mapService.addMarker(place.geometry.location)
    this.map.setCenter(place.geometry.location)
  }

  routeDisplayListener = () => {
    this.isRouteDisplayed$.subscribe(isRouteDisplayed => {
      if (this.directionsRenderer) {
        if (isRouteDisplayed) {
          this.displayRoute(
            this.myHouseLocation,
            this.moveoLocation,
            this.directionsService,
            this.directionsRenderer
          );
          this.isRouteControllesShown = true
        }
        else {
          this.directionsRenderer.set('directions', null)
          this.isRouteControllesShown = false
          this.currentRoute = null
        }
      }
    })
  }

  onDisplayRoute = () => {
    this.isRouteDisplayed$.next(!this.isRouteDisplayed$.getValue())
  }

  onTravelModeChange = () => {
    console.log(this.travelMode);
    this.displayRoute(
      this.myHouseLocation,
      this.moveoLocation,
      this.directionsService,
      this.directionsRenderer
    );
  }

  displayRoute = (
    origin: string | google.maps.LatLng
    , destination: string | google.maps.LatLng
    , service: google.maps.DirectionsService
    , display: google.maps.DirectionsRenderer
  ) => {
    service.route(
      {
        origin: origin,
        destination: destination,
        travelMode: this.travelMode,
        avoidTolls: true,
      },
      (result, status) => {
        if (status === "OK" && result) {
          display.setDirections(result);
          this.currentRoute = result.routes[0].legs[0]
          console.log(this.currentRoute);
        } else {
          alert("Could not display directions due to: " + status);
        }
      }
    );
  }

}
