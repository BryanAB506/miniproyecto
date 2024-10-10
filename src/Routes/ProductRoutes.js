const express = require('express')
const routes = express.Router();

const productController = require('../Controller/productController')

routes.get('/', productController.getProduc)
routes.post('/', productController.addProduct)
routes.delete('/:id', productController.DeletePrduct)
// routes.put('/:id', productController.modifyProduct)

module.exports = routes