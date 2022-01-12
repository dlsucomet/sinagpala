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
        
        console.log(query)
        axios.get(`/api/search/${query}`)
        .then(response => {
            console.log(JSON.stringify(response.data))
        })
        // for (const feature of customData.features) {
        //     // Handle queries with different capitalization
        //     // than the source data by calling toLowerCase().
        //     if (
        //     feature.properties.title
        //     .toLowerCase()
        //     .includes(query.toLowerCase())
        //     ) {
        //         // Add a tree emoji as a prefix for custom
        //         // data results using carmen geojson format:
        //         // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
        //         feature['place_name'] = `🌲 ${feature.properties.title}`;
        //         feature['center'] = feature.geometry.coordinates;
        //         feature['place_type'] = ['park'];
        //         matchingFeatures.push(feature);
        //     }
        // }
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
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                        position="top-right"
                    />
            </ReactMapGL>
}