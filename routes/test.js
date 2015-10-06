var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/:test', function (req, res) {
    if (req.params.test == 'test') {
            res.json({
                String: 'SUCCESS!@'
        });
    } else {
         res.json({
            String: 'Are you serious?'
         });
    }
});