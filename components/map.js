import { useState, useRef, useCallback} from "react"
import ReactMapGL from "react-map-gl"
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
    // console.log(userInputRef.current)
    // axios.get(`/api/search/${query}`)
    // .then(response => {
    //     console.log(response.data)
    //     return response.data
    // })
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

    const onClick = useCallback(event => {
        const {
          features,
          srcEvent: {offsetX, offsetY}
        } = event;
        console.log(features);
    }, []);
    
    return <ReactMapGL
                ref={mapRef}
                mapStyle="mapbox://styles/neillua/ckyaxoahl6g4y14o9izyuozem"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                {...viewport}
                onClick={onClick}
                onViewportChange={(newViewport) => setViewport(newViewport)}
                >
            </ReactMapGL>
}