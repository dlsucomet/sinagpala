import { useState, useRef, useCallback} from "react"
import ReactMapGL from "react-map-gl"
import Search from './search'

export default function Map() {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 14.6335708,
        longitude: 121.0981465,
        zoom: 20
    });
    const mapRef = useRef();
    
    return <ReactMapGL
                ref={mapRef}
                mapStyle="mapbox://styles/neillua/ckyaxoahl6g4y14o9izyuozem"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                {...viewport}
                onViewportChange={(newViewport) => setViewport(newViewport)}
                >
                <Search 
                 mapRef={mapRef}
                 setViewport={setViewport}/>
            </ReactMapGL>
}