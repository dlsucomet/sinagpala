import * as React from 'react'
import { useState, useCallback, useRef } from "react"
import ReactMapGL from "react-map-gl"

export default function Map(props) {
    const mapRef = useRef();

    const maxBounds = {
        south: 121.076,
        west: 14.619,
        north: 121.135,
        east: 14.676
    };

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 14.6335708,
        longitude: 121.0981465,
        zoom: 18,
        minZoom: 18,
        maxZoom: 20,
    });
    
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
    };

    const onClick = useCallback(event => {
        const {
          features,
          srcEvent: {offsetX, offsetY}
        } = event;
        console.log(features);
        
        var buildingData = null;

        //Find feature with building properties
        features.forEach(element => {
            if (element.layer.id == "choropleth-fill") {
                buildingData = JSON.parse(JSON.stringify(element));
            }
        });

        console.log(buildingData);
        props.onDataChange(buildingData);
    }, [props]);

    const refMap = (
        <React.Fragment>
            <ReactMapGL
                    ref={mapRef}
                    mapStyle="mapbox://styles/neillua/ckyaxoahl6g4y14o9izyuozem"
                    mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                    {...viewport}
                    onViewportChange={nextViewPort => onViewportChange(nextViewPort)}
                    onClick={onClick}
                    >
                </ReactMapGL>
        </React.Fragment>
    ) 
    
    return (
        <>
            {refMap}
        </>
    )
}