/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function LinePlot   -   Graph chart component of a building to display monthly/hourly averages
 *                                  
 *
 * #HOW TO CALL:
 *      <LinePlot     data type />
 *
 *    @prop { Object }   data  - object data with the statitics information
 *    @prop { String }   type  - type of information to display (Monthly Average or Hourly Average)
 *    @prop { Number }   width  - width of plot
 *    @prop { Number }   height - height of plot
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
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
    plotContainer: {
        // display: 'flex',
        // justifyContent: 'center',
        // width: '100%'
        padding: '10px'
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

export default function LinePlot(props) {
    const router = useRouter();
    const classes = useStyles();

    var data = [];
    var dataX = [];
    var dataLabels = [];
    const tableTitle = props.type == "month" ? 'Average Monthly kWh ' : 'Average Hourly kWh';

    if (props.data !== null) {
        const { total_kwh } = props.data.properties; //Basis for no data (if -999)

        if (total_kwh !== -999) {
            if (props.type == "month") {
                var month_keys = [];

                for (let i = 1; i < 13; i++) {
                    month_keys.push(`avg_month_${i}`);
                }

                month_keys.forEach((key) => {
                    data.push(props.data.properties[key]);
                });

                dataX = [...Array(12).keys()];
                dataLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            }
            else if (props.type == "hour") {
                var hour_keys = [];

                for (let i = 0; i < 24; i++) {
                    hour_keys.push(`avg_hour_${i}`);
                }

                hour_keys.forEach((key) => {
                    data.push(props.data.properties[key]);
                });

                dataX = [...Array(24).keys()];
                dataLabels = dataX.map((hour) => `${hour}`);
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
                                    mode: 'lines+markers',
                                    marker: { color: '#fd811e' },
                                    hovertemplate: '%{y}kWh<extra></extra>',
                                },
                            ]}
                            layout={{
                                paper_bgcolor: "rgba(0,0,0,0)",
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                colorway: 'black',
                                margin: {
                                    l: 0,
                                    r: 0,
                                    t: 25,
                                    b: 0,
                                },
                                xaxis: {
                                    title: {
                                        text: props.type == 'month' ? 'Month' : 'Hour',
                                        font: {
                                            size: 10,
                                            color: 'black'
                                        },
                                        standoff: 20
                                    },
                                    hoverformat: '.2f',
                                    automargin: true,
                                    fixedrange: true,
                                    tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
                                    tickvals: dataX,
                                    ticktext: dataLabels,
                                    tickfont: {
                                        size: 8,
                                        color: 'black'
                                    },
                                    // gridcolor: router.pathname == '/' ? '#374140' : '#F',
                                    gridwidth: 0.5,
                                    tickangle: props.type == 'month' ? '90' : '',
                                    // showticklabels: true,
                                },
                                yaxis: {
                                    title: {
                                        text: 'kWh',
                                        font: {
                                            size: 10,
                                            color: 'black'
                                        },
                                        standoff: 20
                                    },
                                    hoverformat: '.2f',
                                    automargin: true,
                                    fixedrange: true,
                                    // tickmode: "linear", //  If "linear", the placement of the ticks is determined by a starting position `tick0` and a tick step `dtick`
                                    // tick0: 0,
                                    // dtick: 2,
                                    tickfont: {
                                        size: 8,
                                        color: 'black'
                                    },
                                    // gridcolor: router.pathname == '/' ? '#374140' : '#F',
                                    gridwidth: 0.5,
                                },
                                hovermode: "closest",
                                hoverlabel: { bgcolor: "#FFF" },
                                title: `<b>${tableTitle}</b>`,
                                titlefont: {
                                    size: 15,
                                    color: 'black'
                                },
                                // autosize: true,
                                width: props.width,
                                height: props.height,
                            }}
                            useResizeHandler={true}
                            config={{ displayModeBar: false, responsive: true }}
                        />
                        :
                        props.type == 'hour' ? //no data, display only once
                            <Typography variant="h4" className={classes.infoMarker}> No data found</Typography>
                            :
                            <></>
                    :
                    <></>
            }
        </div>
    )
}

LinePlot.propTypes = {
    data: PropTypes.object,
    type: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
}