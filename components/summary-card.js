/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function SummaryCard   -   Summary card that shows the statistics of a building
 *                                  
 *
 * #HOW TO CALL:
 *      <SumaryCard     data />
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
    }
}));

export default function SummaryCard(props) {
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
                    <div>
                        <Typography variant="h6" component="div" className={classes.numData}>
                            {annual_potential} kW/h
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} className={classes.labelData} gutterBottom>
                        Annual potential solar energy generation
                        </Typography>
                    </div>
                </ Box>
                <Box
                    sx={{
                        p: 0.5,
                        m: 0.5,
                    }}
                    className={classes.dataRow}
                >
                    <div className={classes.groupData}>
                        <Typography variant="h6" component="div" className={classes.numData}>
                            {hourly_potential} kW/h
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} className={classes.labelData} gutterBottom>
                            Hourly Potential
                        </Typography>
                    </div>
                    <div className={classes.groupData}>
                        <Typography variant="h6" component="div" className={classes.numData}>
                            {daily_potential} kW/h
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} className={classes.labelData} gutterBottom>
                        Daily Potential
                        </Typography>
                    </div>
                </Box>
                <Box
                    sx={{
                        p: 0.5,
                        m: 0.5,
                    }}
                    className={classes.dataRow}
                >
                    <div className={classes.groupData}>
                        <Typography variant="h6" component="div" className={classes.numData}>
                            {avail_rooftop} m<sup>2</sup>
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} className={classes.labelData} gutterBottom>
                            Available roof area for installation
                        </Typography>
                    </div>
                    <div className={classes.groupData}>
                        <Typography variant="h6" component="div" className={classes.numData}>
                            {num_panels}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} className={classes.labelData} gutterBottom>
                        Panels for Installation
                        </Typography>
                    </div>
                </Box>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box sx={{ minWidth: '40%' }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}