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

    const {
        avg_month_1,
        avg_month_2,
        avg_month_3,
        avg_month_4,
        avg_month_5,
        avg_month_6,
        avg_month_7,
        avg_month_8,
        avg_month_9,
        avg_month_10,
        avg_month_11,
        avg_month_12,
    } = props.data.properties

    const monthData = [avg_month_1,
                        avg_month_2,
                        avg_month_3,
                        avg_month_4,
                        avg_month_5,
                        avg_month_6,
                        avg_month_7,
                        avg_month_8,
                        avg_month_9,
                        avg_month_10,
                        avg_month_11,
                        avg_month_12]
    const monthX = [...Array(12).keys()]
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    console.log(monthData)
    console.log(monthX)

    // https://plotly.com/javascript/hover-text-and-formatting/
    // https://plotly.com/javascript/tick-formatting/
    return (
        <div className={classes.plot}>
            <Plot
                data={[
                    {
                        x: monthX,
                        y: monthData,
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
                      tickvals: monthX,
                      ticktext: monthNames
                    },
                  yaxis: {fixedrange: true},
                  hovermode: "closest",
                  hoverlabel: { bgcolor: "#FFF" },
                  title: 'Average Monthly kW/h'
                }}
                config={{displayModeBar: false, responsive: true }}
            />
        </div>
    )
}