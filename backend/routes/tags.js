var express = require('express');
var router = express.Router();

const tags = ["New Yorke","London", "Paris", "New Orleans", "Lockshire"]

router.get('/' ,(req, res) => {
    const tagPart = req.query.q;
    if (tagPart == null || tagPart == "") {
        res.send([])
        return
    }

    res.send(tags.filter((str, idx) => {
        return str.indexOf(tagPart) > -1
    }))
})

router.post('/', (req, res) => {
    const tag = req.body.tag
    if (tag == null) {
        throw new Error('Tag must be filled')
    }
    tags.push(tag)
    res.send()
})

module.exports = router