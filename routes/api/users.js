const express = require("express");
const { upload, validateUser, ctrlWrapper } = require("../../middlewares");
const { users } = require("../../controllers");

const router = express.Router();

router.get("/current", validateUser, ctrlWrapper(users.getCurrent));

router.patch(
	"/:id/subscription",
	validateUser,
	ctrlWrapper(users.updateSubscription)
);
router.patch(
	"/avatar",
	validateUser,
	upload.single("avatar"),
	ctrlWrapper(users.updateAvatar)
);

module.exports = router;
