const { Conflict } = require("http-errors");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict(`User with ${email} already exists`);
	}
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const result = await User.create({ name, email, password: hashPassword });
	res.status(201).json({
		status: "success",
		code: 201,
		data: {
			user: {
				name,
				email,
			},
		},
	});
};

module.exports = signup;
