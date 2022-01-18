import dynamic from 'next/dynamic'
import Header from "../components/header"
import NoSsr from "../components/NoSsr"
import SummaryCard from '../components/summary-card'
import EnvironmentCard from '../components/environment-card'
import { makeStyles } from '@mui/styles'
import * as React from 'react'
import { useState, useCallback, useRef, useEffect } from "react"
import ReactMapGL from 'react-map-gl'
const LinePlot = dynamic(() => import("../components/line-plot"), {
    loading: () => "Loading...",
    ssr: false
});

const useStyles = makeStyles(theme => ({
    mapContainer: {
        height: '70vh',
        position: 'relative',
        overflow: 'hidden',
    },
    posCard: {
        position: 'absolute',
        right: '1vw',
        top: '1vh',
        zIndex: 1,
    },
    sideMargin: {
        marginLeft: '1%',
        margineRight: '1%',
    }
}));

export default function Explore(){
    const classes = useStyles();
    const [buildingData, setBuildingData] = useState(null);

    /**
     Everything that follows below are for the Mapbox Map Implementation.
     Technically this was originally in a component Map.js, however we wanted to pass prop change on map click, which triggered state changes. Problem is, the mapbox triggers a rerender with every state change, we only want the card information to change. Using a ref instead of state would stop the rerender, however it will not trigger a state change for the SummaryCard Data. We brought this component out so that it will not have a prop call change.

     Original Source for NextJS + Mapbox: https://dev.to/niharikak101/integrating-mapbox-with-next-js-the-cheaper-alternative-to-google-maps-g39
     */
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
        setBuildingData(buildingData);
    }, []);

    useEffect(() => {
        console.log("State Changed!");
    }, [buildingData])
    
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

    return(
        <NoSsr>
            <Header />
            <div className={classes.mapContainer}>
                {refMap}
                {
                    buildingData != null ?
                        <div className={classes.posCard}>
                            <SummaryCard data={buildingData} />
                        </div>
                    :
                    <></>
                }
            </div>
            
            <div className={classes.sideMargin}>
                <h1>Solar Energy Information</h1>
                {
                    buildingData != null ?
                        <>
                            <LinePlot data={buildingData}
                            type="month"/>
                            <LinePlot data={buildingData}
                            type="hour"/>
                        </>
                    :
                        <></>
                }
            </div>
        </NoSsr>
    )
}