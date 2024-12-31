const express = require('express');
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

// Tạo 1 sản phẩm mới
router.post("/create-product", async (req, res) => {
    try {
        const newProduct = new Products({
            ...req.body
        })
        const savedProduct = await newProduct.save();
        //calculate review
        const reviews = await Reviews.find({ productId: savedProduct._id });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce(
                (acc, review) => acc + review.rating,
                0
            );
            const averageRating = totalRating / reviews.length
            savedProduct.rating = averageRating;
            await savedProduct.save();
        }
        res.status(201).send(savedProduct);
    } catch (error) {
        console.error("error creating new product", error);
        res.status(500).send({ message: "failed to create new product" })

    }
})

// Lấy full danh sách sản phẩmphẩm
router.get("/", async (req, res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        let filter = {};
        if (category && category !== "all") {
            filter.category = category
        }

        if (color && color !== "all") {
            filter.color = color
        }

        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }

        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter)
        const totalPages = Math.ceil(totalProducts / parseInt(limit))
        const products = await Products.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("author", "email")
            .sort({ createAt: -1 });

        res.status(200).send({ products, totalPages, totalProducts })
    } catch (error) {
        console.error("error fetching new product", error);
        res.status(500).send({ message: "failed to create new product" })
    }
})

// Lấy sản phẩm theo id 
router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId).populate("author", "email username");
        if (!product) {
            return res.status(404).send({ message: "Product not found" })
        }
        const reviews = await Reviews.find({ productId }).populate("userId", "username email");
        res.status(200).send({ product, reviews })
    } catch (error) {
        console.error("error fetching  product", error);
        res.status(500).send({ message: "failed to fetch the product" })
    }
})

// Cập nhật sản phẩm có xác thực quyền qua TokenToken
router.patch("/update-product/:id",verifyToken,verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Products.findByIdAndUpdate(productId, { ...req.body }, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" })
        }
        res.status(200).send({
            message: "Product update successfully",
            product: updatedProduct
        })
    } catch (error) {
        console.error("error updating product", error);
        res.status(500).send({ message: "failed to update the product" })
    }
})

// Xóa sản phẩmphẩm

router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deleteProduct = await Products.findByIdAndDelete(productId);

        if (!deleteProduct) {
            return res.status(404).send({ message: "product not found" })
        }

        //delete reviews related to the product

        await Reviews.deleteMany({ productId: productId })
        res.status(200).send({
            message: "Product deleted successfully"
        })

    } catch (error) {
        console.error("error delete product", error);
        res.status(500).send({ message: "failed to delete the product" })
    }
})

//api tìm sản phẩm liên quan theo từ khóa và danh mục bằng regex 

router.get("/related/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Product ID is required" })
        }
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" })
        }

        const titleRegex = new RegExp(
            product.name
            .split("")
            .filter((word) => word.length > 1)
            .join("|")
            , "i"
        )
        const relatedProducts = await Products.find({
            _id: {$ne : id}, // exclude the current product
            $or : [
                {name: {$regex: titleRegex}}, //match similar names
                {category : product.category}, //Tìm danh mục giống 
            ]
        })
        res.status(200).send(relatedProducts)

    } catch (error) {
        console.error("error fetching the related product", error);
        res.status(500).send({ message: "failed to fetch related the product" })
    }
})
module.exports = router;