var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', function (req, res) {
    console.log(req.query.test);
    if (req.query.test == 'test') {
        res.json({
            String: 'SUCCESS!@'
        });
    } else {
        res.json({
            String: 'Are you serious?'
        });
    }
});