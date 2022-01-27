/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function SummaryCard   -   Summary card that shows the statistics of a building
 *                                  
 *
 * #HOW TO CALL:
 *      <SumaryCard     data showCard hideCard />
 *
 *    @prop { Object }   data  - object data with the statitics information
 *    @prop { Boolean }   showCard  - boolean data that shows the summary card
 *    @prop { Function }  hideCard   - fucntion to close the summary card
 *
 * USED IN:
 * explore.js
 *
 * ------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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

const useStyles =  props => makeStyles(theme => ({
    addrData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    numData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    highlightData: {
        color: theme.palette.orange.main,
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexGrow: 1,
        [theme.breakpoints.down('md')]: {
            alignContent: 'flex-start',
            width: 'max-content',
        },
    },
    flexContainer: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
            // height: '450px',
            overflowX: 'auto',
            overflowY: 'hidden',
        },
    },
    chartContainer: {
        padding: '8px',
        margin: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        flexGrow: 1,
        minHeight: '40vh',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '16px',
            minHeight: '0px'
            // flex: '0 0 auto'
        },
    },
    posCard: {
        marginBottom: '10px'
    },
    infoTitle: {
        fontWeight: 'bold'
    },
    cardHeight: {
        height: '88vh !important',
        [theme.breakpoints.down('md')]: {
            height: `${props.plotHeight + 60}px !important`,
        }, 
    },
    extButton: {
        position: 'absolute',
        right: 0,
        "&:hover": {
            backgroundColor: 'transparent',
        },
    }
}));

const CardContentNoPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 8px;
  }
`);

export default function SummaryCard(props) {
    const plotHeight = 250;
    const plotWidth = 390;
    const classes = useStyles({'plotHeight': plotHeight, 'plotWidth': plotWidth})();

    const {
        total_kwh,
        num_panels,
        panel_area,
        address
    } = props.data.properties;

    const onClick = () => {
        props.hideCard();
    }

    const card = (
        <React.Fragment>
            <CardContentNoPadding>
                {
                    total_kwh != -999 ? //Check if building polygon has data
                    // <Scrollbars autoHeight autoHeightMax={'90vh'}>
                    <Scrollbars className={classes.cardHeight} >
                            <Button
                                className={classes.extButton}
                                onClick={onClick}
                            >
                                X
                            </Button>
                        <div className={classes.flexContainer}> 
                            <Box
                                    sx={{
                                        p: 0.5,
                                        m: 0.5,
                                    }}
                                    className={classes.dataRow}
                                >
                                    <Typography variant="h6" component="div" className={classes.addrData}>
                                            {address}
                                    </Typography>
                            </Box>
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
                                        <div>
                                            <Typography variant="h6" className={classes.numData}>
                                                <span className={classes.highlightData}>{total_kwh}</span>kWh
                                            </Typography>
                                        </div>
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
                                    <div>
                                        <div>
                                            <Typography variant="h6" className={classes.numData}>
                                                <span className={classes.highlightData}> {num_panels}</span>
                                            </Typography>
                                        </div>
                                        <Typography variant="h7" sx={{ fontSize: 12, textAlign: 'center' }}>Number of panels <span>
                                            <Tooltip title="Panel specifications listed in our about page." arrow placement="bottom" sx={{ fontSize: 12, textAlign: 'center' }}>
                                                <HelpOutlineIcon />
                                            </Tooltip>
                                        </span>
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
                                    <div>
                                        <div>
                                            <Typography variant="h6" className={classes.numData}>
                                                <span className={classes.highlightData}>{panel_area}</span> m<sup style={{
                                                                        fontSize:'small'
                                                                    }}>2</sup>
                                            </Typography>
                                        </div>
                                        <Typography sx={{ fontSize: 12, textAlign: 'center' }} gutterBottom>
                                            Available roof area {<br />} for installation
                                        </Typography>
                                    </div>
                                </Box>
                            </Box>
                            <Divider sx={{marginBottom: '15px'}}/>
                            {/* <Typography variant="h7" className={classes.infoTitle}>Solar Energy Information</Typography> */}
                            <Box 
                                className={classes.chartContainer}
                            >
                                <LinePlot data={props.data}
                                            type="hour"
                                            width={plotWidth}
                                            height={plotHeight}
                                />
                                <br />
                                <LinePlot data={props.data}
                                            type="month"
                                            width={plotWidth}
                                            height={plotHeight}
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
                        </div>
                    </Scrollbars>
                    :
                    <Box className={classes.labelData}>
                        <p>No Data Found</p>
                    </Box>
                }
            </CardContentNoPadding>
        </React.Fragment>
    );

    return (
        <>
            {
                props.showCard ? 
                    <Box className={classes.posCard}>
                        <Card >{card}</Card>
                    </Box>
                :
                    <></>
            }
        </>
    );
}

SummaryCard.propTypes = {
    data: PropTypes.object,
    showCard: PropTypes.boolean,
    hideCard: PropTypes.func,
}
