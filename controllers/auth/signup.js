const { Conflict } = require("http-errors");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict("Email in use");
	}
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const avatarURL = gravatar.url(email);
	const result = await User.create({
		name,
		email,
		password: hashPassword,
		avatarURL,
	});
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
};

module.exports = signup;
