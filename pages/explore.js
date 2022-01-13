import dynamic from "next/dynamic"
import Header from "../components/header"
import NoSsr from "../components/NoSsr"
import SummaryCard from '../components/summary-card'
import EnvironmentCard from '../components/environment-card'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    mapContainer: {
        height: '90vh',
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
      }

    return(
        <NoSsr>
            <Header />
            <div className={classes.mapContainer}>
                <Map />
                <div className={classes.posCard}>
                    <SummaryCard data={data} />
                    <EnvironmentCard data={data}/>
                </div>
            </div>
        </NoSsr>
    )
}