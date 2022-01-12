import { useState, useRef, useCallback } from "react"
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import ReactMapGL from "react-map-gl"
import Geocoder from 'react-map-gl-geocoder'
import axios from 'axios'

// const customData = [{
//     place_name: 'Masangkay St, Manila, Metro Manila, Philippines',
//     place_type: [ 'Building' ],
//     properties: { title: 'Masangkay St, Manila, Metro Manila, Philippines' },
//     center: [ 120.9773871, 14.6062277 ],
//     geometry: { coordinates: [Array], type: 'Point' },
//     type: 'Feature'
// }]

function forwardGeocoder(query) {
    axios.get(`/api/search/${query}`)
    .then(response => {
        console.log(response.data)
        return response.data
    })
}

export default function Map() {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 14.6335708,
        longitude: 121.0981465,
        zoom: 20
    });
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
      );
    
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 200 };

            return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
            });
        },
        []
    );
    
    return <ReactMapGL
                ref={mapRef}
                mapStyle="mapbox://styles/neillua/ckyaxoahl6g4y14o9izyuozem"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                {...viewport}
                onViewportChange={handleViewportChange}
                >
                    <Geocoder
                        mapRef={mapRef}
                        zoom={20}
                        countries={"PH"}
                        localGeocoder={forwardGeocoder}
                        localGeocoderOnly={true}
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                        position="top-right"
                    />
            </ReactMapGL>
}