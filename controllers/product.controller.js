const Product = require('../models/product.schema');

exports.addProduct = async function addProduct(req, res) {
  try {
    const product = new Product(req.body);
    const productDetail = await product.save();
    res.status(200).send({
      message: 'Product added successfully!',
      data: productDetail
    });
  } catch (error) {
    res.status(400).send({
      message: 'Bad request',
      error: error.message,
      stack: error.stack
    });
  }
};

exports.updateProduct = async function updateProduct(req, res) {
  try {
    await Product.updateOne({ _id: req.body.id }, req.body);
    res.status(200).send({
      message: 'Product updated successfully!'
    });
  } catch (error) {
    res.status(400).send({
      message: 'Bad request',
      error: error.message,
      stack: error.stack
    });
  }
};

exports.deleteProduct = async function deleteProduct(req, res) {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    res.status(200).send({
      message: 'Product deleted successfully!'
    });
  } catch (error) {
    res.status(400).send({
      message: 'Bad request',
      error: error.message,
      stack: error.stack
    });
  }
};

exports.getProducts = async function getProduct(_, res) {
  try {
    const productList = await Product.find();
    res.status(200).send({
      message: 'Products list get successfully!',
      data: productList,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Bad request',
      error: error.message,
      stack: error.stack
    });
  }
};