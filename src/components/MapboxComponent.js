import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MapboxComponent = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmVybmFuZG9nMzAxIiwiYSI6ImNsdGdncnd2ZjExamgyanNiZXQ0NTRmcmsifQ.Hsv6Ht580GomA2oEK5ZMeQ';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-24, 42],  //lng, lat
      zoom: 1,  //hihger the number, the more zoomed in
    });

    // mapbox://styles/mapbox/dark-v11        darkmode
    // mapbox://styles/mapbox/streets-v12      regular mode

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'bottom-right' // Position GeolocateControl at the bottom right
    );

    const isMobile = window.innerWidth <= 768; // Set breakpoint for mobile devices

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search for places...',
      marker: false
    });

    map.addControl(geocoder, isMobile ? 'top-center' : 'top-left'); // Position geocoder at the top left on desktop and top center on mobile

    return () => map.remove(); // Cleanup when the component unmounts
  }, []);

  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}></div>;
};

export default MapboxComponent;