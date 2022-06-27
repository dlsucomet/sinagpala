const marikinaPolygon = require('./marikina_polygon_bounds.json')

export default function handler(req, res) {
    console.log(marikinaPolygon)
    res.status(200).json(marikinaPolygon)
}