const { Router } = require("express");
const { check } = require("express-validator");
const {
  uploadFiles,
  getImage,
  updateImageCloudinary,
} = require("../controllers/uploads.controller");
const { collectionIsAllowed } = require("../helpers/validators");
const { validateFields, isFileInRequest } = require("../middlewares");

const router = Router();

router.post("/", isFileInRequest, uploadFiles);

router.put(
  "/:collection/:id",
  [
    isFileInRequest,
    check("id", "Invalid mongo ID").isMongoId(),
    check("collection").custom((collection) =>
      collectionIsAllowed(collection, ["users", "products"])
    ),
    validateFields,
  ],
  updateImageCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("id", "Invalid mongo ID").isMongoId(),
    check("collection").custom((collection) =>
      collectionIsAllowed(collection, ["users", "products"])
    ),
    validateFields,
  ],
  getImage
);

module.exports = router;
