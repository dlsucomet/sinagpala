import axios from 'axios'
import { point, polygon, booleanPointInPolygon } from '@turf/turf'

const marikinaPolygon = require('./marikina_polygon.json')['features'][0]['geometry']['coordinates']

export default function handler(req, res) {
    // https://developers.google.com/maps/documentation/geocoding/requests-geocoding#RegionCodes
    const baseQueryString = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    let { queryString } = req.query
    console.log(`QUERY STRING: ${queryString}`) 
    const apiString = '&components=country:PH&key=' + process.env.NEXT_PUBLIC_API_KEY

    axios.get(baseQueryString + queryString + apiString)
    .then(response => {
        // Filter results to those within Marikina Polygon 
        let filteredResponse = response.data.results.filter((item) => {
            var pt = point([item.geometry.location.lng, item.geometry.location.lat])
            var poly = polygon(marikinaPolygon)
            console.log("ITEM ", item.formatted_address)
            console.log(booleanPointInPolygon(pt, poly))
            return booleanPointInPolygon(pt, poly)
        })

        // console.log(response)
        if (filteredResponse.length == 0) {
            res.status(200).json([{'place_name': "No addresses found.", 'center': [ 0, 0 ]}])
        }
            
        else {
            let formattedResponse = response.data.results.map((item) => {
                let formattedItem = {}
                formattedItem['place_name'] = item.formatted_address
                formattedItem["place_type"] = ['park']
                formattedItem['properties'] = {
                    title: item.formatted_address
                },
                formattedItem['center'] = [item.geometry.location.lng, item.geometry.location.lat]
                formattedItem['geometry'] = {
                    coordinates: formattedItem['center'],
                    type: "Point"
                }
                formattedItem['type'] = "Feature"
    
                return formattedItem
            })
            // console.log("RESPONSE BODY: ", formattedResponse)
            // console.log("Total responses: ", formattedResponse.length)
            res.status(200).json(formattedResponse)
        }
    })
}