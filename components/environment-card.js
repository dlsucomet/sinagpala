/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function EnvironmentCard   -   Summary card that shows the statistics of a building
 *                                  
 *
 * #HOW TO CALL:
 *      <EnvironmentCard     data />
 *
 *    @prop { Array }   data  - object data with the statitics information
 *
 * USED IN:
 * <TO FOLLOW>
 *
 * ------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { makeStyles } from '@mui/styles'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

const useStyles = makeStyles(theme => ({
    numData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupData: { //statistics and label
        flexGrow: 1,
        flexBasis: 0,
    },
    dataRow: { //one row in the card
        display: 'flex',
        justifyContent: 'space-around',
        // padding and margin are set on MUI Component
        // p: 0.5,
        // m: 0.5,
        bgcolor: 'background.paper',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    logo: {
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    posCard: {
        // position: 'absolute',
        // right: '1vw',
        // top: '7vh',
        // zIndex: 1,
    }
}));

export default function EnvironmentCard(props) {
    const classes = useStyles();
    const {
        annual_potential,
        hourly_potential,
        daily_potential,
        avail_rooftop,
        num_panels
    } = props.data
      
    const card = (
        <React.Fragment>
            <CardContent>
                <Box
                    sx={{
                        p: 0.5,
                        m: 0.5,
                    }}
                    className={classes.dataRow}
                >
                    <div className={classes.groupData}>
                        <div className={classes.labelData}>
                            <Image src="/CO2.svg" alt="CO2" width={30} height={30}/>
                        </div>
                        <Typography sx={{ fontSize: 12 }} className={classes.labelData} gutterBottom>
                        {annual_potential} Metric Tons / kWh
                        </Typography>
                    </div>
                    <div className={classes.groupData}>
                        <div className={classes.labelData}>
                            <Image src="/Seedling.svg" alt="Seedling" width={30} height={30}/>
                        </div>
                        <Typography sx={{ fontSize: 12, textAlign: 'center' }} className={classes.labelData} gutterBottom>
                        {annual_potential} Metric Tons / Urban trees planted
                        </Typography>
                    </div>
                    <div className={classes.groupData}>
                        <div className={classes.labelData}>
                            <Image src="/Car.svg" alt="Car" width={30} height={30}/>
                        </div>
                        <Typography sx={{ fontSize: 12}} className={classes.labelData} gutterBottom>
                        {annual_potential} Metric / Per Mile
                        </Typography>
                    </div>
                </ Box>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: '35%' }} className={classes.posCard}>
            <Card >{card}</Card>
        </Box>
    );
}