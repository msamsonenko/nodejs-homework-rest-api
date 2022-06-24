const express = require("express");
const { validateUser, validation, ctrlWrapper } = require("../../middlewares");
const { auth } = require("../../controllers");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(auth.signup));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(auth.login));
router.get("/logout", validateUser, ctrlWrapper(auth.logout));

module.exports = router;
