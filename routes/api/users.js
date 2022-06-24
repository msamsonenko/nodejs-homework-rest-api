const express = require("express");
const { validateUser, ctrlWrapper } = require("../../middlewares");
const { users } = require("../../controllers");

const router = express.Router();

router.get("/current", validateUser, ctrlWrapper(users.getCurrent));

module.exports = router;
