const { Contact } = require("../../models");
const { createError } = require("../../utils");

const updateById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
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

module.exports = updateById;
