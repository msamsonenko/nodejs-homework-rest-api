const { Contact } = require("../../models");
const { createError } = require("../../utils");

const removeById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await Contact.findByIdAndRemove(id);
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
	} catch (error) {
		next(error);
	}
};

module.exports = removeById;
