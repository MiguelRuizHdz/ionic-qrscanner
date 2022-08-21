/* eslint-disable @typescript-eslint/prefer-for-of */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {
  lat: number;
  lng: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let geo: any = this.route.snapshot.paramMap.get('geo');
    console.log(geo);

    // quita las primeras 4 letras del texto geo
    geo = geo.substr(5);
    // separar por coma y como resultado es un arreglo de dos posiciones
    geo = geo.split(',');
    // posicion 0
    console.log(geo);
    this.lat = Number(geo[0]);
    // posicion 1
    this.lng = Number(geo[1]);

    console.log(this.lat, this.lng);
  }

  ngAfterViewInit() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWlndWVscnVpemhkeiIsImEiOiJja25iNDF1ZG4xbnRyMnBxZGlnOWRjYmpwIn0.LydTg65b76_Mi99wTHXp2Q';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lng, this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true,
    });

    map.on('load', () => {

      map.resize();

      // Marker
      new mapboxgl.Marker()
        .setLngLat([ this.lng, this.lat ])
        .addTo(map);

      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },

        labelLayerId
      );
    });
  }
}
