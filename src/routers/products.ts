import express from "express";
import productsController from "../controllers/products";
import productValidator from "../validators/products";

const router = express.Router();

router.get("/", productsController.getProducts);
router.post(
  "/add",
  productValidator.addProducts,
  productsController.addProduct
);

export default router;
