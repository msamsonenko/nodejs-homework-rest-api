const { Contact } = require("../../models");

const getAll = async () => {
	const contacts = await Contact.find({});
	return contacts;
	// try {
	// const contacts = await Contact.find({});
	// 	res.json({
	// 		status: "success",
	// 		code: 200,
	// 		data: {
	// 			contacts,
	// 		},
	// 	});
	// } catch (error) {
	// 	next(error);
	// }
};

module.exports = getAll;
