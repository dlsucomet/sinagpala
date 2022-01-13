import { useState, useRef, useCallback} from "react"
import ReactMapGL from "react-map-gl"
import Search from './search'

export default function Map() {
    const mapRef = useRef();

    const maxBounds = {
        south: 121.076,
        west: 14.619,
        north: 121.135,
        east: 14.676
    }

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 14.6335708,
        longitude: 121.0981465,
        zoom: 18,
        minZoom: 18,
        maxZoom: 20,
    });
    const mapRef = useRef();
    
    const onViewportChange = viewport => {
        // console.log(viewport.longitude, viewport.latitude)
        if (viewport.longitude < maxBounds.south) {
            viewport.longitude = maxBounds.south;
        }
        if (viewport.latitude < maxBounds.west) {
            viewport.latitude = maxBounds.west;
        }
        if (viewport.longitude > maxBounds.north) {
            viewport.longitude = maxBounds.north;
        }
        if (viewport.latitude > maxBounds.east) {
            viewport.latitude = maxBounds.east;
        }
        setViewport(viewport);
    }

    const onClick = useCallback(event => {
        const {
          features,
          srcEvent: {offsetX, offsetY}
        } = event;
        console.log(features);

        // Highlight Filter - To Try
        //     var muniFilter = data.reduce(
        //         function (munimemo, munifeature) {
        //                 console.log(munifeature)
        //                 munimemo.push(munifeature.id);
        //             return munimemo;
        //         },
        //         ['in', "ID"]
        //     );
            
        //     console.log(muniFilter)
        //     // mapRef.current.setFilter('choropleth-stroke', muniFilter);
        //     // mapRef.current.setLayoutProperty('choropleth-stroke', 'visibility', 'visible'); 
    }, []);
  
    return <ReactMapGL
                ref={mapRef}
                mapStyle="mapbox://styles/neillua/ckyaxoahl6g4y14o9izyuozem"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                {...viewport}
                onViewportChange={nextViewPort => onViewportChange(nextViewPort)}
                onClick={onClick}
                >
                <Search 
                 mapRef={mapRef}
                 setViewport={setViewport}/>
            </ReactMapGL>
}