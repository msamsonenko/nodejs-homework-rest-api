const express = require("express");
const {
	upload,
	validateUser,
	ctrlWrapper,
	validation,
} = require("../../middlewares");
const { users } = require("../../controllers");
const { joiEmailSchema } = require("../../models/user");

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

router.post(
	"/verify",
	validation(joiEmailSchema),
	ctrlWrapper(users.resendVerificationEmail)
);

router.get("/verify/:verificationToken", ctrlWrapper(users.verifyEmail));

module.exports = router;
