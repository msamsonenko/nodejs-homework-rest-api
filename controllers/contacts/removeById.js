const { Contact } = require("../../models");
const { createError } = require("../../utils");

const removeById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findByIdAndRemove(id);
	if (!result) {
		throw createError(404);
	}
	res.json({
		status: "success",
		code: 200,
		message: "contact deleted",
		data: {
			result,
		},
	});
};

module.exports = removeById;
