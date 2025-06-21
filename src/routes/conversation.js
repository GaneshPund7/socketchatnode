const router = require("express").Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../middleWare/checkAuth");
const { addConversation, getConversation, fetchConversationMessages } = require("../controllers/conversation");

router.post("/", errorWrapper(addConversation));
router.get('/',errorWrapper(getConversation));
router.get('/messages/:id', errorWrapper(fetchConversationMessages));

module.exports = router;