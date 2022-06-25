const { Contact } = require("../../models");

const getAll = async (req, res) => {
	const { _id } = req.user;
	const { page, limit, favorite } = req.query;
	const skip = (page - 1) * limit;
	const contacts = await Contact.find({ owner: _id, favorite }, "", {
		skip,
		limit: Number(limit),
		favorite,
	}).populate("owner", "_id name email");
	res.json({
		status: "success",
		code: 200,
		data: {
			contacts,
		},
	});
};

module.exports = getAll;
