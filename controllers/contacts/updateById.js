const { Contact } = require("../../models");
// const { createError } = require("../../utils");

const updateById = async (id, body) => {
	const result = await Contact.findByIdAndUpdate(id, body, { new: true });
	return result;
	// try {
	// 	const { id } = req.params;
	// 	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
	// 	if (!result) {
	// 		throw createError(404);
	// 	}
	// 	res.json({
	// 		status: "success",
	// 		code: 200,
	// 		data: {
	// 			result,
	// 		},
	// 	});
	// } catch (error) {
	// 	next(error);
	// }
};

module.exports = updateById;
