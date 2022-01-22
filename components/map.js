/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function Map   -   Map component for building display
 *                                  
 *
 * #HOW TO CALL:
 *      <Map     onDataChange />
 *
 *    @prop { Function }   onDataChange  - function call to parent to update building data state
 *
 * USED IN:
 * explore.js
 *
 * ------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import { useState, useCallback, useRef } from "react"
import ReactMapGL, {Source, Layer} from "react-map-gl"
import Search from './search'
import PropTypes from 'prop-types'

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
        
        var buildingData = null;

        //Find feature with building properties
        features.forEach(element => {
            if (element.layer.id == "building_data") {
                buildingData = JSON.parse(JSON.stringify(element));
            }
        });

        console.log(buildingData);
        props.onDataChange(buildingData);
    }, [props]);

    const layerStyle = {
        id: 'building_data',
        type: 'fill',
        'source-layer': 'WebApp_Dummy_Data-3t9qlc',
        paint: {
            'fill-opacity': 0.8,
            // 'fill-opacity-transition': {
            //   duration: 800,
            //   delay: 0,
            // },
            'fill-outline-color': '#f65026',
            'fill-color': {
              property: 'total_kwh',
              stops: [
                [1, '#fafa6e'],
                [13.25, '#fed445'],
                [25.5, '#ffac28'],
                [37.75, '#fd811e'],
                [50, '#f65026'],
              ],
            },
          },
    };

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
                        <Source id="marikina_buildings" type="vector" url={'mapbox://neillua.3k7xdblq'}>
                            <Layer {...layerStyle} />
                        </Source>
                    <Search
                        mapRef={mapRef}
                        setViewport={setViewport}/>
            </ReactMapGL>
        </React.Fragment>
    ) 
    
    return (
        <>
            {refMap}
        </>
    )
}

Map.propTypes = {
    onDataChange: PropTypes.func
}