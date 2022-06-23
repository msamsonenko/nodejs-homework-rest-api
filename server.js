// 55S16crRszEgNVLF - password MongoDB user
// mongodb+srv://Maxym:55S16crRszEgNVLF@cluster0.8jatsdm.mongodb.net/test

// mongodb+srv://Maxym:55S16crRszEgNVLF@cluster0.8jatsdm.mongodb.net/db-contacts?retryWrites=true&w=majority

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
	.connect(DB_HOST)
	.then(() =>
		app.listen(PORT, () => console.log(`Server running at port = ${PORT}`))
	)
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
