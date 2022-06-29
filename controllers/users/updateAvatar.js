const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const resize = require("./resize");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { path: tempDir, originalname } = req.file;
	await resize(tempDir, originalname);
	const { _id } = req.user;
	const imageName = `${_id}_${originalname}`;
	try {
		const resultUpload = path.join(avatarsDir, imageName);
		await fs.rename(tempDir, resultUpload);
		const avatarURL = path.join("avatars", imageName);
		await User.findByIdAndUpdate(req.user._id, { avatarURL });
		res.json({ avatarURL });
	} catch (error) {
		await fs.unlink(tempDir);
		throw error;
	}
};

module.exports = updateAvatar;
