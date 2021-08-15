const { Router } = require("express");
const { customSearch } = require("../controllers/search.controller");

const router = Router();

router.get("/:collection/:value", customSearch);

module.exports = router;
