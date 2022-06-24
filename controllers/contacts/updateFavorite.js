const { Contact } = require("../../models");
const { createError } = require("../../utils");

const updateStatusContact = async (req, res) => {
	const { id } = req.params;
	const { favorite } = req.body;

	if (favorite === undefined) {
		throw createError(400, "missing field favorite");
	}
	const result = await Contact.findByIdAndUpdate(
		id,
		{ favorite },
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
module.exports = updateStatusContact;
