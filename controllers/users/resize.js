const Jimp = require("jimp");

async function resize(img, name) {
	const image = await Jimp.read(img);
	await image.cover(250, 250).writeAsync(`tmp/${name}`);
	console.log("Image resized successfully");
	return image;
}

module.exports = resize;
