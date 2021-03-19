import express from 'express';
const router = express.Router();
// list product
router.get('/products', (req, res) => {
    res.json({
        message: "Successfully"
    })
});
// product detail
router.get('/product/:id', (req, res) => {
    res.json({
        id: req.params.id,
        name: 'product 1'
    })
});
// add product
router.post('/productAdd', (req, res) => {
    console.log(req.body)
});

///
module.exports = router;