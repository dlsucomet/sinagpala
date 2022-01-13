import dynamic from "next/dynamic"
import Header from "../components/header"
import NoSsr from "../components/NoSsr"
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    mapContainer: {
        height: '90vh',
    },
}));

export default function Explore(){
    const classes = useStyles();

    const Map = dynamic(() => import("../components/Map"), {
        loading: () => "Loading...",
        ssr: false
    });

    return(
        <NoSsr>
            <Header />
            <div className={classes.mapContainer}>
                <Map />
            </div>
        </NoSsr>
    )
}