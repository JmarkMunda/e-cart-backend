import express from "express";
import productsController from "../controllers/products";
import productValidator from "../validators/products";
import validateRequest from "../middlewares/validateRequest";

const router = express.Router();

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductById);
router.post(
  "/add",
  productValidator.addProduct,
  validateRequest,
  productsController.addProduct
);
router.put(
  "/edit/:id",
  productValidator.editProduct,
  validateRequest,
  productsController.editProduct
);

export default router;
