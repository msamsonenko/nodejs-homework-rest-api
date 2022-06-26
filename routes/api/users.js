const express = require("express");
const { validateUser, ctrlWrapper } = require("../../middlewares");
const { users } = require("../../controllers");

const router = express.Router();

router.get("/current", validateUser, ctrlWrapper(users.getCurrent));

router.patch(
	"/:id/subscription",
	validateUser,
	ctrlWrapper(users.updateSubscription)
);

module.exports = router;
