const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
	},
	{ versionKey: false, timestamps: true }
);

const joiSignupSchema = Joi.object({
	name: Joi.string().required(),
	password: Joi.string().min(6).required(),
	email: Joi.string().required(),
	subscription: Joi.string().default("starter"),
	token: Joi.string().default(null),
});
const joiLoginSchema = Joi.object({
	password: Joi.string().min(6).required(),
	email: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = { User, joiSignupSchema, joiLoginSchema };
