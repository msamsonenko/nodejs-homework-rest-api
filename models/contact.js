const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			required: [true, "Set email for contact"],
		},
		phone: {
			type: String,
			required: [true, "Set phone for contact"],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);
const joiSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.bool().default(false),
});

const favoriteSchema = Joi.object({ favorite: Joi.bool().default(false) });

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, favoriteSchema };
