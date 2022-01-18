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
    },
    posCard: {
        marginBottom: '10px'
    }
}));

export default function SummaryCard(props) {
    const classes = useStyles();
    console.log(props)
    const {
        total_kwh,
        num_panels,
        panel_area
    } = props.data.properties

    const card = (
        <React.Fragment>
            <CardContent>
                {
                    total_kwh != -999 ? 
                    <>
                        <Box
                            sx={{
                                p: 0.5,
                                m: 0.5,
                            }}
                            className={classes.dataRow}
                        >
                            <div>
                                <Typography variant="h6" component="div" className={classes.numData}>
                                    {total_kwh} kW/h
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
                                    {num_panels} kW/h
                                </Typography>
                                <Typography sx={{ fontSize: 12, textAlign: 'center' }} className={classes.labelData} gutterBottom>
                                    Hourly Potential
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
                                    {panel_area} m<sup style={{
                                                                fontSize:'small'
                                                            }}>2</sup>
                                </Typography>
                                <Typography sx={{ fontSize: 12, textAlign: 'center' }} gutterBottom>
                                    Available roof area {<br />} for installation
                                </Typography>
                            </div>
                        </Box>
                    </>
                    :
                    <Box className={classes.labelData}>
                        <p>No Data Found</p>
                    </Box>
                }
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box className={classes.posCard}>
            <Card >{card}</Card>
        </Box>
    );
}