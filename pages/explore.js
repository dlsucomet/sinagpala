import * as React from 'react'
import Head from 'next/head'
import { useState, useRef } from "react"
import dynamic from 'next/dynamic'
import Header from "../components/header"
import NoSsr from "../components/NoSsr"
import SummaryCard from '../components/summary-card'
import ChartLegend from '../components/chart-legend'
import { makeStyles } from '@mui/styles'

const Map = dynamic(() => import("../components/map"), {
    loading: () => "Loading...",
    ssr: false
  });

const useStyles = makeStyles(theme => ({
    mapContainer: {
        height: '92vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    posCard: {
        position: 'absolute',
        zIndex: 999,
        right: '1vw',
        top: '1vh',
        minWidth: '430px',
        maxHeight: '90vh',
        [theme.breakpoints.down('md')]: {
            right:'auto',
            top:'auto',
            bottom: '1vh',
            left: '1vh', 
            width: '98vw'    
        }
    },
    posLegendCard: {
        position: 'absolute',
        bottom: '1vh',
        left: '1vw', 
        zIndex: 999,
        minWidth: '130px',
        [theme.breakpoints.down('md')]: {
            bottom: 'auto',
            left: 'auto', 
            top: '1vh',
            right: '1vw',
        }
    },
    sideMargin: {
        marginLeft: '1%',
        margineRight: '1%',
    },
    infoTitle: {
        fontWeight: 'bold',
        margin: '1rem 0',
    }
}));

export default function Explore(){
    const classes = useStyles();
    const [buildingData, setBuildingData] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const [resetZoom, setResetZoom] = useState(0);

    const onDataChange = data => {
        //TODO Temporary checker for no data (no rooftops were predicted for that building polygon)
        const emptyDataChance = Math.random();
        console.log("Chance ", emptyDataChance)
        // If 1, set first data to -999 (but irl, all of the data should be -999)
        // (0.6 < chance <= 1)
        if (buildingData != null && emptyDataChance > 0.6 && emptyDataChance <= 1 && data != null) {
            data.properties['total_kwh'] = -999;
        // Chance to be set to zero for all values (0.3 < chance <= 0.6)
        } else if (buildingData != null && emptyDataChance > 0.3 && emptyDataChance <= 0.6 && data != null) {
            Object.keys(data.properties).forEach((key) => {
                data.properties[key] = 0;
            });
        }

        setBuildingData(data);
        setShowCard(true);
    }

    const hideCard = () => {
        setResetZoom(resetZoom + 1);
        setShowCard(false);
    }

    return(
        <NoSsr>
            <Head>
                <title>Sinagpala: Explore</title>
                <meta name="description" content="Explore the solar potential of Marikina City today with Sinagpala" />
                <link rel="icon" type="image/png" 
                href="/logo.svg" />
                
                <link
                    rel="preload"
                    href="/fonts/Ropa_Sans/RopaSans-Regular.ttf"
                    as="font"
                    crossOrigin=""
                    />
                </Head>
            <Header />

            <div className={classes.mapContainer}>
                <Map resetZoom={resetZoom} onDataChange={onDataChange}/>
                {
                    buildingData != null ?
                    <>
                        <div className={classes.posCard}>
                            <SummaryCard data={buildingData} showCard={showCard} hideCard={hideCard}/>
                        </div>
                        <div className={classes.posLegendCard}>
                            <ChartLegend />
                        </div>
                    </>
                    :
                        <div className={classes.posLegendCard}>
                            <ChartLegend />
                        </div>
                }
            </div>
        </NoSsr>
    )
}