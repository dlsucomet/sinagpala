/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function ChartLegend   -   Choropleth Chart Legend
 *                                  
 *
 * #HOW TO CALL:
 *      <ChartLegend />
 *
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
import { styled } from '@mui/system'

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
        borderRadius: '10%',
        height: '15px',
        width: '15px',
    },
    posCard: {
        padding: '0px',
    }
}));

const CardContentNoPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 8px;
  }
`);

export default function ChartLegend(props) {
    const classes = useStyles();

    const card = (
        <React.Fragment>
            <CardContentNoPadding>
                <>
                    <Typography variant='h8'>Total Energy (MWh)</Typography>
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
                            className={classes.dataColumn}
                        >
                            <Typography variant='h8'>11 +</Typography>
                            <Typography variant='h8'>8 - 11</Typography>
                            <Typography variant='h8'>5 - 8</Typography>
                            <Typography variant='h8'>2 - 5</Typography>
                            <Typography variant='h8'>0 - 2</Typography>
                        </Box>   
                    </ Box>
                </>
            </CardContentNoPadding>
        </React.Fragment>
    );

    return (
        <Box>
            <Card>{card}</Card>
        </Box>
    );
}