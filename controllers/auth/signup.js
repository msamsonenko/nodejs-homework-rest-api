const { Conflict } = require("http-errors");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../utils");

const signup = async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict("Email in use");
	}
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const avatarURL = gravatar.url(email);

	const verificationToken = v4();

	const result = await User.create({
		name,
		email,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});
	const mail = {
		to: email,
		subject: "Confirm email",
		html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" >Confirm your email address</a>`,
	};
	try {
		await sendEmail(mail);
		res.status(201).json({
			status: "success",
			code: 201,
			data: {
				user: {
					name,
					email,
					subscription: result.subscription,
					avatarURL,
				},
			},
		});
	} catch (error) {
		console.log("email not sent", error.message);
	}
};

module.exports = signup;
