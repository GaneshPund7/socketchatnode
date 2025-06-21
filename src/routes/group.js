const router = require("express").Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const { addGroup, getGroup } = require("../controllers/group");
const checkAuth = require("../middleWare/checkAuth");
 
router.post("/",checkAuth, errorWrapper(addGroup));
router.get('/',checkAuth, errorWrapper(getGroup));

module.exports = router;