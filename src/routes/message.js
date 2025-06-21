const router = require("express").Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const { addMessage, getMessage } = require("../controllers/message");
const checkAuth = require("../middleWare/checkAuth");

router.post("/", errorWrapper(addMessage));
router.get('/:conversationId', errorWrapper(getMessage));

module.exports = router;