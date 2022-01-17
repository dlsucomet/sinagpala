import dynamic from "next/dynamic"
import Header from "../components/header"
import NoSsr from "../components/NoSsr"
import SummaryCard from '../components/summary-card'
import EnvironmentCard from '../components/environment-card'
import { makeStyles } from '@mui/styles'
import { useState, useRef } from "react"

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
    }
}));

export default function Explore(){
    const classes = useStyles();
    const [buildingData, setBuildingData] = useState(null);
    // const buildingData = useRef(null);

    const Map = dynamic(() => import("../components/Map"), {
        loading: () => "Loading...",
        ssr: false
    });

    const data = {
        annual_potential: 4,
        hourly_potential: 3,
        daily_potential: 3,
        avail_rooftop: 34,
        num_panels: 4,
    };

    const onDataChange = childBuildingData => {
        setBuildingData(childBuildingData)
        // buildingData.current = childBuildingData;
        // console.log(buildingData.current)
    };

    return(
        <NoSsr>
            <Header />
            <div className={classes.mapContainer}>
                <Map onDataChange={onDataChange}/>
                {
                    // buildingData.current != null ?
                    buildingData != null ?
                        <div className={classes.posCard}>
                            <SummaryCard data={buildingData} />
                            {/* <EnvironmentCard data={data}/> */}
                        </div>
                    :
                    <></>
                }
            </div>

            <h1>Solar Energy Information</h1>
        </NoSsr>
    )
}