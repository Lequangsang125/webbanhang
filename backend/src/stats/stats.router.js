const express = require("express");
const User = require("../users/user.model");
const Order = require("../orders/orders.model");
const Reviews = require("../reviews/reviews.model");
const Products = require("../products/products.model");
const e = require("express");
const router = express.Router();

//user stats by email
router.get("/user-stats/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ message: "User not found" });

    // sum of all orders
    const totalPaymentsResult = await Order.aggregate([
      { $match: { email: email } },
      { $group: { _id: null, totalPayments: { $sum: "$amount" } } },
    ]);
    const totalPaymentsAmount =
      totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalPayments : 0;
    console.log(totalPaymentsAmount);

    // get total review
    const totalReviews = await Reviews.countDocuments({ userId: user._id });

    //total  purchases products
    const purchasedProducts = await Order.distinct("products.productId", {
      email: email,
    });
    const totalPurchasedProducts = purchasedProducts.length;

    res.status(200).send({
      totalPayments: totalPaymentsAmount.toFixed(2),
      totalReviews,
      totalPurchasedProducts,
    });
  } catch (error) {
    console.error("error fetching user stats", error);
    res.status(500).send({ message: "Error fetching user stats" });
  }
});

// admin stats
router.get("/admin-stats", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Products.countDocuments();
    const totalReviews = await Reviews.countDocuments();
    const totalUsers = await User.countDocuments();

    //calculate total earnings
    const totalEarningsResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$amount" },
        },
      },
    ]);
    const totalEarnings =
      totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;
    
    const monthlyEarningsResult = await Order.aggregate([
        {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
              },
              monthlyEarnings: { $sum: "$amount" },
            },
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 },
        }
    ])

    //formate monthly earnings
    const monthlyEarnings = monthlyEarningsResult.map((entry)=>({
      month: entry._id.month,
      year: entry._id.year,
      earnings: entry.monthlyEarnings.toFixed(2)
    }))
    res.status(200).send({
      totalOrders,
      totalProducts,
      totalReviews,
      totalUsers,
      totalEarnings: totalEarnings.toFixed(2),
      monthlyEarnings
    });
  } catch (error) {
    console.error("error fetching admin stats", error);
    res.status(500).send({ message: "Error fetching admin stats" });
  }
});

module.exports = router;
