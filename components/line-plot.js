/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function LinePlot   -   Graph chart component of a building to display monthly/hourly averages
 *                                  
 *
 * #HOW TO CALL:
 *      <SumaryCard     data type />
 *
 *    @prop { Object }   data  - object data with the statitics information
 *    @prop { String }   type  - type of information to display (Monthly Average or Hourly Average)
 *
 * USED IN:
 * explore.js
 *
 * ------------------------------------------------------------------------------------------
 */

import React from 'react'
import Plot from 'react-plotly.js'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
    plotContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    // plot: {
    //     width: '100%',
    //     height: '450px',
    //     // [theme.breakpoints.up('sm')]: { //https://levelup.gitconnected.com/using-breakpoints-and-media-queries-in-material-ui-47470d3c43d9
    //     //     width: '90%',
    //     // },
    //     // [theme.breakpoints.up('md')]: {
    //     //     width: '70%',
    //     // },
    // },
    infoMarker: {
        // padding: '0px',
        margin: '20px 0'
    }
}));

export default function LinePlot(props){
    const classes = useStyles();

    var data = [];
    var dataX = [];
    var dataLabels = [] ;
    const tableTitle = props.type == "month" ? 'Average Monthly kWh (kilowatt-hour) ' : 'Average Hourly kWh (kilowatt-hour) ';
    
    // console.log("props")
    // console.log(props)
    
    if (props.data !== null) {
        const { total_kwh } = props.data.properties; //Basis for no data (if -999)
        
        if (total_kwh !== -999) {
            if (props.type == "month") {
                Object.keys(props.data.properties).forEach((key) => {
                    if (key.startsWith("avg_month")) {
                        data.push(props.data.properties[key]);
                    }
                });
        
                dataX = [...Array(12).keys()];
                dataLabels = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        
            }
            else if (props.type == "hour") {
                Object.keys(props.data.properties).forEach((key) => {
                    if (key.startsWith("avg_hour")) {
                        data.push(props.data.properties[key]);
                    }
                });
        
                dataX = [...Array(24).keys()];
                dataLabels = dataX.map((hour) => `${hour}:00`);
            }
        }
    }

    /**
     Graph display condition 
        - Check if building polygon has been selected 
        - Check if building polygon has data
        - Check if hour instance (so that info message is only showed once)
     */
    
    // https://plotly.com/javascript/hover-text-and-formatting/
    // https://plotly.com/javascript/tick-formatting/
    return (
        <div className={classes.plotContainer}>
            {
                props.data !== null ?
                    total_kwh !== -999 ? //with data
                        <Plot
                            data={[
                                {
                                    x: dataX,
                                    y: data,
                                    type: 'scatter',
                                    mode: 'lines+marker',
                                    marker: {color: '#fd811e'},
                                    hovertemplate: '%{y}<extra></extra>',
                                },
                            ]}
                            // className={classes.plot}
                            layout={{
                            paper_bgcolor: "rgba(0,0,0,0)",
                            plot_bgcolor:'rgba(0,0,0,0)',
                            xaxis: {
                                title: {
                                    text: props.type == 'month' ? 'Month' : 'Hour',
                                    font: {
                                      size: 18,
                                      color: 'black'
                                    },
                                    standoff: 20
                                },
                                automargin: true,
                                fixedrange: true,
                                tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
                                tickvals: dataX,
                                ticktext: dataLabels,
                                tickfont: {
                                    size: 16,
                                    color: 'black'
                                },
                                },
                            yaxis: {
                                title: {
                                    text: 'kWh (kilowatt-hour)',
                                    font: {
                                      size: 18,
                                      color: 'black'
                                    }
                                },
                                automargin: true,
                                fixedrange: true,
                                tickmode: "linear", //  If "linear", the placement of the ticks is determined by a starting position `tick0` and a tick step `dtick`
                                tick0: 0,
                                dtick: 5,
                                tickfont: {
                                    size: 16,
                                    color: 'black'
                                },
                                },
                            hovermode: "closest",
                            hoverlabel: { bgcolor: "#FFF" },
                            title: tableTitle,
                            titlefont: {
                                size: 20,
                                color: 'black'
                            },
                            }}
                            useResizeHandler={true}
                            style={{width: "90%", height: "100%"}}
                            config={{displayModeBar: false, responsive: true }}
                        />
                    :
                        props.type == 'hour' ? //no data, display only once
                            <Typography variant="h4" className={classes.infoMarker}> No data found</Typography>
                        :
                            <></>
                :
                    props.type == 'hour' ? //no selected polygon, display only once
                            <Typography variant="h4"  className={classes.infoMarker}> Select a building polygon to know more about its potential! </Typography>
                        :
                            <></>
            }
        </div>
    )
}

LinePlot.propTypes = {
    data: PropTypes.object,
    type: PropTypes.string
}