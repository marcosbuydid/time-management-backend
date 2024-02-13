const { Router } = require('express');
const router = Router();

router.get('/', (request, response) => {
    response.json({
        ok: true
    })
})

module.exports = router;