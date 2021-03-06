/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function Search   -   Component to display search bar with results
 *                                  
 *
 * #HOW TO CALL:
 *      <Search     mapRef setViewPort hideCard/>
 *
 *     @prop { Object }     mapRef       - object referencing the parent map object
 *     @prop { Function }   setViewport  - function call to update parent map's current viewport
 *     @prop { Function }   hideCard     - Hides the summary card 
 *
 * USED IN:
 * map.js
 *
 * ------------------------------------------------------------------------------------------
 */
import { useCallback, useRef, useState } from 'react'
import axios from 'axios'
import mapboxgl from '!mapbox-gl'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { FlyToInterpolator } from "react-map-gl"

const useStyles = makeStyles(theme => ({
  container: {
    zIndex: '1',
    position: 'absolute',
    margin: '20px 0px 0px 20px',
    width: '30%',
    minWidth: '100px',
    maxWidth: '500px'
  },
  search: {
    width: '100%',
    border: '1px solid #666',
    borderColor: theme.palette.gray.main,
    borderRadius: '10px',
    boxSizing: 'border-box',
    fontSize: '16px',
    padding: '16px',
  },
  results: {
    listStyle: 'none',
    overflow: 'hidden',
    margin: '0',
    padding: '0',
  },
  result: {
    background: 'white',
    color: 'black',
    padding: '18px',
  },
  hoverHighlight: {
    '&:hover': {
      background: '#FFE169',
    },
  }
}));

export default function Search(props) {
  const classes = useStyles();
  const searchRef = useRef(null);
  // const markerRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) => `/api/search/${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      axios.get(searchEndpoint(query))
        .then(response => {
            setActive(true)
            setResults(response.data)
        })
    } else {
      setResults([])
    }
  }, [])

  // Display clicked option
  const onClick = useCallback((event) => {
    let center = event.target.getAttribute('center').split(",")

    if (center[0] != 0 && center[1] != [1]) {
        // Transition to new center
        props.mapRef.current.getMap().flyTo({
            center: event.target.getAttribute('center').split(",")
        })

        // Remove previous marker 
        if (props.markerRef.current != null)
          props.markerRef.current.remove()

        // Add a marker to location
        props.markerRef.current = new mapboxgl.Marker().setLngLat(center).addTo(props.mapRef.current.getMap())
        
        // Set the viewport to the new center 
        props.setViewport({
            width: "100%",
            height: "100%",
            latitude: Number(center[1]),
            longitude: Number(center[0]),
            zoom: 20,
            minZoom: 18,
            maxZoom: 20,
            transitionDuration: 500,
            transitionInterpolator: new FlyToInterpolator(),
        })
        // Hides the search suggestions
        setActive(false)
    }
  }, [props])

  return (
    <div
      className={classes.container}
      ref={searchRef}
    >
      <input
        className={classes.search}
        onChange={onChange}
        onFocus={props.hideCard}
        placeholder='Search addresses'
        type='text'
        value={query}
      />
      { active && results.length > 0 && (
        <ul className={classes.results}>
          {results.map(({ place_name, center }) => (
            <li 
                className={`
                ${classes.result} 
                ${place_name == "No addresses found." ? '' : 'classes.hoverHighlight'}`}
                center={center}
                key={center}
                onClick={onClick}>
              {place_name}
            </li>
          ))}
        </ul>
      ) }
    </div>
  )
}

Search.propTypes = {
  mapRef: PropTypes.object,
  setViewport: PropTypes.func,
  hideCard: PropTypes.func,
}