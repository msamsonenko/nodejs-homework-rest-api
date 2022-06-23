const ctrlWrapper = (ctrl) => {
	return async (req, res, next) => {
		try {
			console.log("wrapper good");

			await ctrl(req, res, next);
		} catch (error) {
			console.log("wrapper bad");
			next(error);
		}
	};
};

module.exports = ctrlWrapper;
