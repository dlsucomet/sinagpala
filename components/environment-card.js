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
import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const useStyles = makeStyles(theme => ({
    labelData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupDataContainer: { //statistics and label
        flexGrow: 1,
    },
    groupData: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
    },
    dataRow: { //one row in the card
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    infoTitle: {
        fontWeight: 'bold',
        margin: '1rem 0',
    }
}));

export default function EnvironmentCard(props) {
    const classes = useStyles();
    
    var carbonEmissions = 0;
    var treeSeedlings = 0;
    var passengerCars = 0;

    if (props.data != null) {
        const { total_kwh } = props.data.properties;

        if (total_kwh !== -999 && total_kwh != 0) {
            carbonEmissions = 0.65 * 0.001 * total_kwh
            treeSeedlings = carbonEmissions / 0.06
            passengerCars = carbonEmissions / 0.000398 

            carbonEmissions = carbonEmissions.toFixed(4)
            treeSeedlings = treeSeedlings.toFixed(4)
            passengerCars = passengerCars.toFixed(4)
        }
    }
      
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
                    <div className={classes.groupDataContainer}>
                        <div className={classes.groupData}>
                            <div className={classes.labelData}>
                                <Image src="/CO2.svg" alt="CO2" width={80} height={80}/>
                            </div>
                            <div>
                                <Typography sx={{ fontSize: 18 }}>
                                    Carbon Dioxide
                                </Typography>
                                <Typography sx={{ fontSize: 42, fontWeight: 'bold' }}>
                                    {carbonEmissions} 
                                </Typography>
                                <Typography sx={{ fontSize: 18, fontWeight: 'light' }} gutterBottom>
                                    metric tons
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.groupDataContainer}>
                        <div className={classes.groupData}>
                            <div className={classes.labelData}>
                                <Image src="/Seedling.svg" alt="Seedling" width={80} height={80}/>
                            </div>
                            <div>
                                <Typography sx={{ fontSize: 18 }}>
                                    Tree Seedlings
                                </Typography>
                                <Typography sx={{ fontSize: 42, fontWeight: 'bold' }}>
                                    {treeSeedlings} 
                                </Typography>
                                <Typography sx={{ fontSize: 18, fontWeight: 'light' }} gutterBottom>
                                    grown for 10 years
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={classes.groupDataContainer}>
                        <div className={classes.groupData}>
                            <div className={classes.labelData}>
                                <Image src="/Car.svg" alt="Car" width={80} height={80}/>
                            </div>
                            <div>
                                <Typography sx={{ fontSize: 18 }}>
                                    Miles driven
                                </Typography>
                                <Typography sx={{ fontSize: 42, fontWeight: 'bold' }}>
                                    {passengerCars}
                                </Typography>
                                <Typography sx={{ fontSize: 18, fontWeight: 'light' }} gutterBottom>
                                    by average passenger cars
                                </Typography>
                            </div>
                        </div>
                    </div>
                </ Box>
            </CardContent>
        </React.Fragment>
    );

    return (
        <div>
            {
                props.data !== null && total_kwh != -999 ?
                    <div>
                        <Typography variant="h4" className={classes.infoTitle}>Potential Environmental Impact <span>
                            <Tooltip title="With this much renewable energy produced, you can contribute this much back to mother earth!" arrow placement="right" sx={{ fontSize: 15, textAlign: 'center' }}>
                                <HelpOutlineIcon />
                            </Tooltip>
                        </span>
                        </Typography>
                        <Box
                            sx={{
                                p: 0.5,
                                m: 0.5,
                            }}
                            className={classes.dataRow}
                        >
                            <div className={classes.groupDataContainer}>
                                <div className={classes.groupData}>
                                    <div className={classes.labelData}>
                                        <Image src="/CO2.svg" alt="CO2" width={80} height={80}/>
                                    </div>
                                    <div>
                                        <Typography sx={{ fontSize: 18 }}>
                                            Carbon Dioxide
                                        </Typography>
                                        <Typography sx={{ fontSize: 42, fontWeight: 'bold' }}>
                                            {carbonEmissions} 
                                        </Typography>
                                        <Typography sx={{ fontSize: 18, fontWeight: 'light' }} gutterBottom>
                                            metric tons
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <Typography variant="h2" sx={{display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"}}>
                                =
                            </Typography>
                            <div className={classes.groupDataContainer}>
                                <div className={classes.groupData}>
                                    <div className={classes.labelData}>
                                        <Image src="/Seedling.svg" alt="Seedling" width={80} height={80}/>
                                    </div>
                                    <div>
                                        <Typography sx={{ fontSize: 18 }}>
                                            Tree Seedlings
                                        </Typography>
                                        <Typography sx={{ fontSize: 42, fontWeight: 'bold' }}>
                                            {treeSeedlings} 
                                        </Typography>
                                        <Typography sx={{ fontSize: 18, fontWeight: 'light' }} gutterBottom>
                                            grown for 10 years
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <Typography variant="h2" sx={{display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"}}>
                                =
                            </Typography>
                            <div className={classes.groupDataContainer}>
                                <div className={classes.groupData}>
                                    <div className={classes.labelData}>
                                        <Image src="/Car.svg" alt="Car" width={80} height={80}/>
                                    </div>
                                    <div>
                                        <Typography sx={{ fontSize: 18 }}>
                                            Miles driven
                                        </Typography>
                                        <Typography sx={{ fontSize: 42, fontWeight: 'bold' }}>
                                            {passengerCars}
                                        </Typography>
                                        <Typography sx={{ fontSize: 18, fontWeight: 'light' }} gutterBottom>
                                            by average passenger cars
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </ Box>
                    </div>
                : 
                    <></>
            }
        </div>
    );
}

EnvironmentCard.propTypes = {
    data: PropTypes.object
}