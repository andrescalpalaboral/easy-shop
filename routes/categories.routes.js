const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createCategory,
  getCategoriesPaginated,
  putCategory,
  deleteCategory,
  getCategoryById,
} = require("../controllers/categories.controller");
const { validateFields, validateAdminRole } = require("../middlewares");
const {
  categoryAlreadyExists,
  categoryIsActive,
} = require("../helpers/validators");

const router = Router();

router.get("/", getCategoriesPaginated);

router.get(
  "/:id",
  [
    check("id", "Invalida mongo ID").isMongoId(),
    check("id").custom(categoryAlreadyExists),
    validateFields,
  ],
  getCategoryById
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "Required Value").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Invalida mongo ID").isMongoId(),
    check("id").custom(categoryAlreadyExists),
    check("name", "Names is required").not().isEmpty(),
    validateFields,
  ],
  putCategory
);

router.delete(
  "/:id",
  [
    validateJWT,
    validateAdminRole,
    check("id", "Invalid mongo ID").isMongoId(),
    check("id").custom(categoryIsActive),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
