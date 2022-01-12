import { useState, useRef, useCallback } from "react"
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import ReactMapGL from "react-map-gl"
import Geocoder from 'react-map-gl-geocoder'
import axios from 'axios'

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
            const geocoderDefaultOverrides = { transitionDuration: 100 };

            return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
            });
        },
        []
    );

    function forwardGeocoder(query) {
        const matchingFeatures = []
        axios.get(`/api/search/${query}`)
        .then(response => {
            return response.data
        })
        return matchingFeatures;
    }
    
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
                        proximity={{
                            longitude: 121.0981465,
                            latitude: 14.6335708
                        }}
                        localGeocoder={forwardGeocoder}
                        // localGeocoderOnly={true}
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                        position="top-right"
                    />
            </ReactMapGL>
}