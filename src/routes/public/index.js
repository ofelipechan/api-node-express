const express = require("express");
const router = express.Router();
const signUp = require("./authRouter");

router.get("/", (req, res) => {
	res.json({
		"error": false,
		"message": "API public routes is WORKING"
	});
});

router.use("/auth", signUp);

module.exports = router;