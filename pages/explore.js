import * as React from 'react'
import Head from 'next/head'
import { useState } from "react"
import dynamic from 'next/dynamic'
import Header from "../components/header"
import Footer from "../components/footer"
import NoSsr from "../components/NoSsr"
import SummaryCard from '../components/summary-card'
import ChartLegend from '../components/chart-legend'
import EnvironmentCard from '../components/environment-card'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

//TODO Dyanmic Loading showing up concern: https://github.com/vercel/next.js/discussions/19142
const LinePlot = dynamic(() => import("../components/line-plot"), {
    loading: () => "Loading...",
    ssr: false
});
const Map = dynamic(() => import("../components/map"), {
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
        minWidth: '180px',
    },
    posLegendCard: {
        position: 'absolute',
        left: '1vw',
        bottom: '1vh',
        zIndex: 999,
        minWidth: '180px',
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
    }

    return(
        <NoSsr>
            <Head>
                <title>Sinagpala: Explore</title>
                <meta name="description" content="Explore the solar potential of Marikina city today with Sinagpala" />
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
                <Map onDataChange={onDataChange}/>
                {
                    buildingData != null ?
                    <>
                        <div className={classes.posCard}>
                            <SummaryCard data={buildingData} />
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
            
            <div className={classes.sideMargin}>
                <Typography variant="h4" className={classes.infoTitle}>Solar Energy Information</Typography>
                <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                    }}>
                    <LinePlot data={buildingData}
                    type="hour"/>
                    <LinePlot data={buildingData}
                    type="month"/>
                </Box> 
                <EnvironmentCard data={buildingData}/>
            </div>

            <Footer />
        </NoSsr>
    )
}