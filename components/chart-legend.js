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
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '128px',
    },
    dataColumn: {
        display: 'flex',
        justifyContent: 'space-around',
        // padding and margin are set on MUI Component
        // p: 0.5,
        // m: 0.5,
        flexDirection: 'column',
        flexWrap: 'wrap',
        flexGrow: 1,
        alignItems: 'center',
        height: '100%'
    },
    legendCircle: {
        borderRadius: '50%',
        // display: 'inline-block',
        height: '10px',
        // marginRight: '5px',
        width: '10px',
    }
}));

export default function ChartLegend(props) {
    const classes = useStyles();

    const card = (
        <React.Fragment>
            <CardContent>
                <>
                    <Box
                        sx={{
                            p: 0.5,
                            m: 0.5,
                        }}
                        className={classes.dataRow}
                    >
                        <Box
                            className={classes.dataColumn}
                        >
                            <div style={{backgroundColor: "#f65026"}} className={classes.legendCircle} />
                            <div style={{backgroundColor: "#fd811e"}} className={classes.legendCircle} />
                            <div style={{backgroundColor: "#ffac28"}} className={classes.legendCircle} />
                            <div style={{backgroundColor: "#fed445"}} className={classes.legendCircle} />
                            <div style={{backgroundColor: "#fafa6e"}} className={classes.legendCircle} />
                        </Box>
                        <Box
                            sx={{ flexGrow: 1 }}
                        >
                            <div>40.01 - 50.00</div>
                            <div>30.01 - 40.00</div>
                            <div>20.01 - 30.00</div>
                            <div>10.01 - 20.00</div>
                            <div>1.00 - 10.00</div>
                        </Box>
                        
                    </ Box>
                </>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Box className={classes.posCard}>
            <Card >{card}</Card>
        </Box>
    );
}

ChartLegend.propTypes = {
    data: PropTypes.object
}
