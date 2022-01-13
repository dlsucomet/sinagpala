import { useCallback, useRef, useState } from 'react'
import styles from '../styles/Search.module.css'
import axios from 'axios'
import mapboxgl from '!mapbox-gl';

export default function Search(props) {

  const searchRef = useRef(null)
  const markerRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) => `/api/search/${query}`

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query)
    if (query.length) {
      axios.get(searchEndpoint(query))
        .then(response => {
            setActive(true)
            // console.log(response.data)
            setResults(response.data)
        })
    } else {
      setResults([])
    }
  }, [])

  // Display clicked option
  const onClick = useCallback((event) => {
    let center = event.target.getAttribute('center').split(",")
    console.log(center)

    if (center[0] != 0 && center[1] != [1]) {
        // Transition to new center
        props.mapRef.current.getMap().flyTo({
            center: event.target.getAttribute('center').split(",")
        })

        // Remove previous marker 
        if (markerRef.current != null)
            markerRef.current.remove()

        // Add a marker to location
        markerRef.current = new mapboxgl.Marker().setLngLat(center).addTo(props.mapRef.current.getMap())
        // Set the marker in the parent component
        
        // Set the viewport to the new center 
        props.setViewport({
            width: "100%",
            height: "100%",
            latitude: Number(center[1]),
            longitude: Number(center[0]),
            zoom: 20
        })
        // Hides the search suggestions
        setActive(false)
    }
  }, [])

  return (
    <div
      className={styles.container}
      ref={searchRef}
    >
      <input
        className={styles.search}
        onChange={onChange}
        placeholder='Search addresses'
        type='text'
        value={query}
      />
      { active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map(({ place_name, center }) => (
            <li 
                className={`
                ${styles.result} 
                ${place_name == "No addresses found." ? '' : 'hover-highlight'}`}
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