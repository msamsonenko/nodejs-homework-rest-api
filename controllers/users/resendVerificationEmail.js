const { User } = require("../../models/user");
const { sendEmail } = require("../../utils");
const { NotFound, BadRequest } = require("http-errors");

const resendVerificationEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw NotFound();
	}
	if (user.verify) {
		throw BadRequest("Verification has already been passed");
	}
	const mail = {
		to: email,
		subject: "Confirm email",
		html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" >Confirm your email address</a>`,
	};
	await sendEmail(mail);
	res.json({
		message: "Verification email sent",
	});
};

module.exports = resendVerificationEmail;
