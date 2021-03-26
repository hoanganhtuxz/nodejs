import express from 'express';
import { create, categoryById, read, remove } from '../controllers/category';

const router = express.Router();
// list cate
// router.get('/products', (req, res) => {
//     res.json({
//         message: "Successfully"
//     })
// });

router.get('/category/:categoryId', read)
router.post('/cateAdd', create);

router.param('categoryId', categoryById)
    ///
router.delete('/categoryDelete/:categoryId', remove);
module.exports = router;