const { Router } = require("express");
const { check } = require("express-validator");
const {
  validateFields,
  validateAdminRole,
} = require("../middlewares/validate-jwt");
const {
  geProductsPaginated,
  getProductById,
  putProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const {
  productAlreadyExists,
  productIsActive,
  categoryAlreadyExists,
} = require("../helpers/validators");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", geProductsPaginated);

router.get(
  "/:id",
  [
    check("id", "Invalida mongo ID").isMongoId(),
    check("id").custom(productAlreadyExists),
    validateFields,
  ],
  getProductById
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "Required Value").not().isEmpty(),
    check("category", "Invalida mongo ID").isMongoId(),
    check("category").custom(categoryAlreadyExists),
    validateFields,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalida mongo ID").isMongoId(),
    check("id").custom(productAlreadyExists),
    validateFields,
  ],
  putProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateAdminRole,
    check("id", "Invalid mongo ID").isMongoId(),
    check("id").custom(productIsActive),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
