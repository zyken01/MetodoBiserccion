const express = require('express');
const router = express.Router();

// Ruta para otra página
router.get('/', (req, res) => {
    res.send('Esta es otra página');
});

module.exports = router;
