const { Contact } = require("../../models");

const add = async (body) => {
	const result = await Contact.create(body);
	return result;
	// try {
	// 	const result = await Contact.create(req.body);
	// 	res.status(201).json({
	// 		status: "success",
	// 		code: 201,
	// 		data: {
	// 			result,
	// 		},
	// 	});
	// } catch (error) {
	// 	next(error);
	// }
};
module.exports = add;
