const express = require('express');
const router = express.Router();
const {filterBySource, getAllVideos} = require("../graphql/query");

router.get('/', async function(req, res, next) {
    res.send(await getAllVideos());
});

router.get('/:filter', async function(req, res, next) {
    let filterBy = req.params.filter;
    res.send(await filterBySource(filterBy));
});

module.exports = router;
