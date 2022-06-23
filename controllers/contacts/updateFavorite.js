const { Contact } = require("../../models");
const { createError } = require("../../utils");

const updateFavorite = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { favorite } = req.body;
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
	} catch (error) {
		next(error);
	}
};
module.exports = updateFavorite;
