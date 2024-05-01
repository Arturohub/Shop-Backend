const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")
const { getProducts, getProduct, updateProduct, addProduct, deleteProduct } = require("../controllers/productController")

//GET ALL DATA FROM DB

router.get("/", getProducts)

// GET ESPECIFIC DATA FROM DB, BASED ON ID
router.get("/:id", getProduct)

//UPDATE SOMETHING FROM DB
router.put("/:id", updateProduct)

//PUBLISH DATA IN DB
router.post("/", addProduct)

//DELETE DATA FROM DB
router.delete("/:id", deleteProduct)

module.exports = router;