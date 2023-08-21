const router = require('express').Router();
const controller = require('../controllers/product.controller');
 
router.post('/', controller.addProduct);
router.get('/', controller.getProducts);
router.delete('/:id', controller.deleteProduct);
router.patch('/', controller.updateProduct);

module.exports = router;