const express = require("express");
const { ctrlWrapper } = require("../../middlewares");
const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(contacts.getAll));

router.post("/", ctrlWrapper(contacts.add));

module.exports = router;
