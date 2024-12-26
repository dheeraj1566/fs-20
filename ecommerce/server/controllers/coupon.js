import Coupon from "../models/coupon.js";
// import User from "../models/users.js";

export const createCoupon = async (req, res) => {
  try {
    const { name, code, expiryDate, minPrice, discountPercentage } = req.body;
    const { userId } = req.user; 

    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists." });
    }

    const newCoupon = new Coupon({
      name,
      code,
      expiryDate,
      minPrice,
      seller: userId,
      discountPercentage,
    });

    
    await newCoupon.save();

    return res.status(201).json({
      message: "Coupon created successfully.",
      coupon: newCoupon,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating coupon.", error: error.message });
  }
};


export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

   
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found." });
    }

    if (coupon.seller.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this coupon." });
    }


    await coupon.remove();

    return res.status(200).json({
      message: "Coupon deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting coupon.", error: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code, totalPrice } = req.body;

    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found." });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ message: "Coupon has expired." });
    }

    if (coupon.minPrice && totalPrice < coupon.minPrice) {
      return res.status(400).json({
        message: `The total price must be at least ${coupon.minPrice} to apply this coupon.`,
      });
    }

    const discountAmount = (coupon.discountPercentage / 100) * totalPrice;
    const discountedPrice = totalPrice - discountAmount;

    return res.status(200).json({
      message: "Coupon applied successfully.",
      discountAmount,
      discountedPrice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error applying coupon.", error: error.message });
  }
};
