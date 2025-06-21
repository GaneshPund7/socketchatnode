const router = require("express").Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../middleWare/checkAuth");
const { loginUser, logoutUser, googleSign} = require("../controllers/auth");

router.post("/login", errorWrapper(loginUser));
router.post("/googleSign", errorWrapper(googleSign));
router.post("/logout", errorWrapper(logoutUser));

module.exports = router;
