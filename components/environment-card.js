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
 * summary-card.js
 *
 * ------------------------------------------------------------------------------------------
 */

import * as React from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import PropTypes from 'prop-types'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const useStyles = makeStyles(theme => ({
    imgData: {
        display: 'flex',
        marginRight: '5px'
    },
    groupDataContainer: { //statistics and label
        width: 'max-content',
        flexGrow: 1,
    },
    groupData: {
        display: 'flex',
        justifyContent: 'center',
    },
    dataRow: { //one row in the card
        display: 'flex',
        justifyContent: 'space-around',
        // width: 'max-content',
        flexWrap: 'wrap',
        // alignItems: 'center',
    },
    infoLabel: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    envData: {
        // fontWeight: 'bold',
        color: theme.palette.orange.main
    },
    tableContainer: {
        width: '390px'
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
                        <Typography variant="h7" className={classes.infoTitle}>Potential Environmental Impact <span>
                            <Tooltip title="With this much renewable energy produced, you can contribute this much back to mother earth!" arrow placement="top" sx={{ fontSize: 12, textAlign: 'center' }}>
                                <HelpOutlineIcon />
                            </Tooltip>
                        </span>
                        </Typography>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <div className={classes.imgData}>
                                            <Image src="/CO2.svg" alt="CO2" width={25} height={25} />
                                        </div>
                                        <Typography variant='h7' className={classes.infoLabel}>
                                            Carbon Dioxide
                                        </Typography>
                                    </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography 
                                            variant='h7'
                                            className={classes.envData}> 
                                            {carbonEmissions}{' '}
                                        </Typography>
                                        <Typography variant='h7'> 
                                        metric tons
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <div className={classes.imgData}>
                                            <Image src="/Seedling.svg" alt="Seedling" width={25} height={25}/>
                                        </div>
                                        <Typography variant='h7' className={classes.infoLabel}>
                                        Tree Seedlings
                                        </Typography>
                                    </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography 
                                            variant='h7'
                                            className={classes.envData}> 
                                            {treeSeedlings}{' '}
                                        </Typography>
                                        <Typography variant='h7'> 
                                            grown for 10 years
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <div className={classes.imgData}>
                                            <Image src="/Car.svg" alt="Car" width={25} height={25}/>
                                        </div>
                                        <Typography variant='h7' className={classes.infoLabel}>
                                        Miles driven
                                        </Typography>
                                    </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography 
                                            variant='h7'
                                            className={classes.envData}> 
                                            {passengerCars}{' '}
                                        </Typography>
                                        <Typography variant='h7'> 
                                            by cars <span>
                                                 <Tooltip title="Average passenger car" arrow placement="bottom" sx={{ fontSize: 12, textAlign: 'center' }}>
                                                     <HelpOutlineIcon />
                                                 </Tooltip>
                                             </span>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                
                            </TableBody>
                        </Table>
                        </TableContainer>
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