const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")


//GET ALL DATA FROM DB
const getProducts = asyncHandler (async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// GET ESPECIFIC DATA FROM DB, BASED ON ID
const getProduct = asyncHandler (async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})


//UPDATE SOMETHING FROM DB

const updateProduct = asyncHandler (async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
           res.status(404);
           throw new Error (`There are no products with that ID: ${id}`)
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})


//DELETE DATA FROM DB
const deleteProduct = asyncHandler (async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404);
            throw new Error (`There are no products with that ID: ${id}`)
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//PUBLISH DATA IN DB
const addProduct = asyncHandler (async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = { getProducts, getProduct, updateProduct, deleteProduct, addProduct}