import express from "express";
import {
  createCoupon,
  deleteCoupon,
  applyCoupon,
} from "../controllers/coupon.js";
import { protectRoute } from "../middlewares/auth.js";
import { isSeller } from "../middlewares/roles.js";

const couponRouter = express.Router();

couponRouter.post("/create", protectRoute, isSeller, createCoupon);
couponRouter.delete("/delete/:id", protectRoute, isSeller, deleteCoupon);
couponRouter.post("/apply", protectRoute, applyCoupon);

export default couponRouter;
