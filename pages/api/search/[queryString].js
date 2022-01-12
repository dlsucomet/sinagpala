import axios from 'axios'

export default function handler(req, res) {
    const baseQueryString = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='
    let { formattedQuery } = req.query
    console.log(`QUERY STRING: ${formattedQuery}`) 
    const apiString = '&key=' + process.env.NEXT_PUBLIC_API_KEY
    axios.get(baseQueryString + formattedQuery + apiString)
    .then(response => {
        console.log("RESPONSE ", JSON.stringify(response.data))
        res.status(200).json(response.data)
    })
}