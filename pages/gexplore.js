//Setup with NextjS https://medium.com/web-dev-survey-from-kyoto/3-gotchas-of-google-maps-api-when-used-with-next-js-and-eslint-dba627c9657d

import {useEffect, useRef} from 'react'
import {Loader} from '@googlemaps/js-api-loader'

export default function Explore() {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: 'weekly',
    });
    let map;
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: {lat: 14.6335708, lng:  121.0981465},
        // center: {lat: 14.650484715774807, lng: 121.10350356676281},
        zoom: 20,
      });
    //   var LatLong = [
    //       {lat: 14.6335708, lng: 121.0981465},
    //       {lat: 14.6335369, lng: 121.0978598},
    //       {lat: 14.6331081, lng: 121.0979139},
    //       {lat: 14.6331419, lng: 121.0982006},
    //       {lat: 14.6335708, lng: 121.0981465}
    //   ];
  
    //   var Bldg_LatLong = new google.maps.Polygon({
    //       paths: LatLong,
    //       strokeColor: 'blue',
    //       strokeOpacity: 0.8,
    //       strokeWeight: 3,
    //       fillColor: 'red',
    //       fillOpacity: 1
    //   });
    //   Bldg_LatLong.setMap(map);
    });

  });
  return (
    //   <div>
    //     <Header />
        <div id="map" ref={googlemap} />
    //   </div>
  );
}