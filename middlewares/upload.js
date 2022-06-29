const path = require("path");
const multer = require("multer");

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
	destination: async (req, file, cb) => {
		cb(null, tmpDir);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
	limits: {
		filesize: 2048,
	},
});

const upload = multer({
	storage: multerConfig,
});

module.exports = upload;
