const { User } = require("../../models/user");
const createError = require("../../utils/createError");

const subscriptions = ["starter", "pro", "business"];

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;
	if (!subscriptions.includes(subscription)) {
		throw createError(404, `Subscription: ${subscription} is not found`);
	}
	const result = await User.findByIdAndUpdate(
		_id,
		{ subscription },
		{ new: true }
	);
	if (!result) {
		throw createError(404);
	}
	res.json({
		status: "success",
		code: 200,
		data: {
			result,
		},
	});
};

module.exports = updateSubscription;
