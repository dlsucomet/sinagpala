import axios from 'axios'

export default function handler(req, res) {
    const baseQueryString = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    // const baseQueryString = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='
    let { queryString } = req.query
    console.log(`QUERY STRING: ${queryString}`) 
    // const apiString = '&amp;region=ph&amp;key=' + process.env.NEXT_PUBLIC_API_KEY
    const apiString = '&key=' + process.env.NEXT_PUBLIC_API_KEY

    axios.get(baseQueryString + queryString + apiString)
    .then(response => {
        // console.log(response)
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
        console.log("RESPONSE BODY: ", formattedResponse)
        console.log("Total responses: ", formattedResponse.length)
        res.status(200).json(formattedResponse)
    })
}