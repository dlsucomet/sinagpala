/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function SummaryCard   -   Summary card that shows the statistics of a building
 *                                  
 *
 * #HOW TO CALL:
 *      <SumaryCard     data />
 *
 *    @prop { Object }   data  - object data with the statitics information
 *
 * USED IN:
 * explore.js
 *
 * ------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { makeStyles } from '@mui/styles'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import EnvironmentCard from './environment-card'
import Divider from '@mui/material/Divider'
import { Scrollbars } from 'react-custom-scrollbars-2'

const LinePlot = dynamic(() => import("./line-plot"), {
    loading: () => "Loading...",
    ssr: false
});

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
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    posCard: {
        marginBottom: '10px',
    },
    infoTitle: {
        fontWeight: 'bold'
    }
}));

const CardContentNoPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 8px;
  }
`);

export default function SummaryCard(props) {
    const classes = useStyles();

    const {
        total_kwh,
        num_panels,
        panel_area
    } = props.data.properties;

    const card = (
        <React.Fragment>
            <CardContentNoPadding>
                {
                    total_kwh != -999 ? //Check if building polygon has data
                    <>
                        <Box
                            sx={{
                                p: 0.5,
                                m: 0.5,
                            }}
                            className={classes.dataRow}
                        >
                            <Box
                                sx={{
                                    p: 0.5,
                                    m: 0.5,
                                }}
                                className={classes.dataRow}
                            >
                                <div>
                                    <Typography variant="h6" component="div" className={classes.numData}>
                                        {total_kwh} kWh
                                    </Typography>
                                    <Typography sx={{ fontSize: 12, textAlign: 'center' }} className={classes.labelData} gutterBottom>
                                    Annual potential solar {<br />} energy generation
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
                                        {num_panels}
                                    </Typography>
                                    <div>
                                        <Typography variant="h7" sx={{ fontSize: 12, textAlign: 'center' }}>Number of panels <span>
                                            <Tooltip title="Panel specifications listed in our about page." arrow placement="bottom" sx={{ fontSize: 12, textAlign: 'center' }}>
                                                <HelpOutlineIcon />
                                            </Tooltip>
                                        </span>
                                        </Typography>
                                    </div>
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
                        </Box>
                        <Divider sx={{marginBottom: '15px'}}/>
                        {/* <Typography variant="h7" className={classes.infoTitle}>Solar Energy Information</Typography> */}
                        <Box sx={{
                                p: 0.5,
                                m: 0.5,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignContent: 'center',
                                flexWrap: 'wrap',
                                flexGrow: 1,
                            }}
                            // className={classes.dataRow}
                        >
                            <LinePlot data={props.data}
                                        type="hour"
                                        width={350}
                                        height={250}
                            />
                            <br />
                            <LinePlot data={props.data}
                                        type="month"
                                        width={350}
                                        height={250}
                            />
                        </Box> 
                        <Divider sx={{marginBottom: '15px'}}/>
                        <Box sx={{
                                p: 0.5,
                                m: 0.5,
                            }}
                            // className={classes.dataRow}
                        >
                            <EnvironmentCard data={props.data}/>
                        </Box> 
                    </>
                    :
                    <Box className={classes.labelData}>
                        <p>No Data Found</p>
                    </Box>
                }
            </CardContentNoPadding>
        </React.Fragment>
    );

    return (
        <Box className={classes.posCard}>
            <Scrollbars  style={{ height: '90vh' }}>
                <Card >{card}</Card>
            </Scrollbars>
        </Box>
    );
}

SummaryCard.propTypes = {
    data: PropTypes.object
}
