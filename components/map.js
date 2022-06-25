/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function Map   -   Map component for building display
 *                                  
 *
 * #HOW TO CALL:
 *      <Map     onDataChange hideCard resetZoom/>
 *
 *    @prop { Function }   onDataChange  - function call to parent to update building data state
 * 
 *    @prop { Function }   hideCard  - function call to hide summary card when search is clicked
 *
 *    @prop { Number }      resetZoom - number which updates from parent to trigger zoom level reset
 * 
 * USED IN:
 * explore.js
 *
 * ------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import { useState, useEffect, useCallback, useRef } from "react"
import ReactMapGL, { Source, Layer, FlyToInterpolator } from "react-map-gl"
import Search from './search'
import PropTypes from 'prop-types'
import mapboxgl from '!mapbox-gl'

export default function Map(props) {
    const mapRef = useRef();
    const markerRef = useRef(null);

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
        zoom: 16,
        minZoom: 16,
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
            srcEvent: { offsetX, offsetY },
        } = event;

        var buildingData = null;

        //Find feature with building properties
        features.forEach(element => {
            if (element.layer.id == "building_data") {
                buildingData = JSON.parse(JSON.stringify(element));
            }
        });

        //Calculate for the centroid of polygon to fly to
        if (buildingData !== null) {
            const polygonBounds = buildingData.geometry.coordinates[0];

            var [maxX, maxY] = polygonBounds[0];
            var [minX, minY] = polygonBounds[0];

            polygonBounds.forEach((coordinate) => {
                if (coordinate[0] > maxX) {
                    maxX = coordinate[0];
                }
                else if (coordinate[0] < minX) {
                    minX = coordinate[0];
                }

                if (coordinate[1] > maxY) {
                    maxY = coordinate[1];
                }
                else if (coordinate[1] < minY) {
                    minY = coordinate[1];
                }
            })

            // console.log('X - ', maxX, minX);
            // console.log('Y - ', maxY, minY);

            const centerX = minX + ((maxX - minX) / 2);
            const centerY = minY + ((maxY - minY) / 2);

            setViewport({
                ...viewport,
                longitude: centerX,
                latitude: centerY,
                zoom: 20,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
            });

            // Remove previous marker 
            if (markerRef.current != null)
                markerRef.current.remove()

            // Add a marker to location
            markerRef.current = new mapboxgl.Marker().setLngLat([centerX, centerY]).addTo(mapRef.current.getMap())
        } else {
            // If no building polygon was clicked, zoom out and remove marker
            // Remove previous marker 
            if (markerRef.current != null)
                markerRef.current.remove()

            setViewport({
                ...viewport,
                zoom: 16,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
            });
        }

        props.onDataChange(buildingData);
    }, [props, viewport]);

    useEffect(() => {
        if (props.resetZoom >= 1) {
            // Remove previous marker 
            if (markerRef.current != null)
                markerRef.current.remove()

            setViewport({
                ...viewport,
                zoom: 16,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
            });
        }
    }, [props.resetZoom]);

    const layerStyle = {
        id: 'building_data',
        type: 'fill',
        'source-layer': 'solar_potential_flatsouth_1-dd6ixg',
        paint: {
            'fill-opacity': 0.6,
            'fill-outline-color': '#f65026',
            'fill-color': {
                property: 'total_kwh',
                stops: [
                    [0, '#808080'],
                    [1, '#fafa6e'],
                    [2762, '#fafa6e'],
                    [5525, '#fed445'],
                    [8287, '#ffac28'],
                    [11049, '#fd811e'],
                    [13811, '#f65026'],
                ],
            },
        },
    };

    const refMap = (
        <React.Fragment>
            <Search
                mapRef={mapRef}
                markerRef={markerRef}
                onClick={e => e.stopPropagation()}
                hideCard={props.hideCard}
                setViewport={setViewport} />
            <ReactMapGL
                ref={mapRef}
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
                {...viewport}
                width='100%'
                height='100%'
                onViewportChange={nextViewPort => onViewportChange(nextViewPort)}
                onClick={onClick}
            >
                <Source id="marikina_buildings" type="vector" url={'mapbox://neillua.6qw763dr'}>
                    <Layer {...layerStyle} />
                </Source>
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
    onDataChange: PropTypes.func,
    hideCard: PropTypes.func,
    resetZoom: PropTypes.number,
}