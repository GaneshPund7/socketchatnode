const router = require("express").Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const { upload } = require("../../utils/fileUpload/media");
const { addMessage, getMessage, sendFile } = require("../controllers/message");
const checkAuth = require("../middleWare/checkAuth");

router.post("/", errorWrapper(addMessage));
router.get('/:conversationId', errorWrapper(getMessage));


router.post('/send', upload, errorWrapper(sendFile));
module.exports = router;