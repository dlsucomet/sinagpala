import React from 'react';
import Plot from 'react-plotly.js';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    plot: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

export default function LinePlot(props){
    const classes = useStyles();

    var data = [];
    var dataX = [];
    var dataLabels = [] ;
    const tableTitle = props.type == "month" ? 'Average Monthly kW/h' : 'Average Hourly kW/h';

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

    // https://plotly.com/javascript/hover-text-and-formatting/
    // https://plotly.com/javascript/tick-formatting/
    return (
        <div className={classes.plot}>
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
                style={{ width: "70%", height: "70%" }}
                layout={{
                  xaxis: {
                      fixedrange: true,
                      tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
                      tickvals: dataX,
                      ticktext: dataLabels,
                      tickfont: {
                        // family: 'Old Standard TT, serif',
                        size: 16,
                        color: 'black'
                      },
                    },
                  yaxis: {
                      fixedrange: true,
                      tickmode: "linear", //  If "linear", the placement of the ticks is determined by a starting position `tick0` and a tick step `dtick`
                      tick0: 0,
                      dtick: 5,
                      tickfont: {
                        // family: 'Old Standard TT, serif',
                        size: 16,
                        color: 'black'
                      },
                    },
                  hovermode: "closest",
                  hoverlabel: { bgcolor: "#FFF" },
                  title: tableTitle,
                  titlefont: {
                    // family: 'Arial, sans-serif',
                    size: 20,
                    color: 'black'
                  },
                }}
                config={{displayModeBar: false, responsive: true }}
            />
        </div>
    )
}