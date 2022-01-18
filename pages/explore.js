import dynamic from 'next/dynamic'
import Header from "../components/header"
import NoSsr from "../components/NoSsr"
import SummaryCard from '../components/summary-card'
import EnvironmentCard from '../components/environment-card'
import { makeStyles } from '@mui/styles'
import * as React from 'react'
import { useState, useCallback, useRef, useEffect } from "react"
import ReactMapGL from 'react-map-gl'
import Box from '@mui/material/Box';
const LinePlot = dynamic(() => import("../components/line-plot"), {
    loading: () => "Loading...",
    ssr: false
});
const Map = dynamic(() => import("../components/Map"), {
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

    const onDataChange = data => {
        setBuildingData(data);
    }

    return(
        <NoSsr>
            <Header />
            <div className={classes.mapContainer}>
                <Map onDataChange={onDataChange}/>
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
                    <Box sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                        }}>
                        <LinePlot data={buildingData}
                        type="hour"/>
                        <LinePlot data={buildingData}
                        type="month"/>
                    </Box> 
                }
            </div>
        </NoSsr>
    )
}