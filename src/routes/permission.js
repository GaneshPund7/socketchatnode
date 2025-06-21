const express = require("express");
const { errorWrapper } = require("../../utils/errorWrapper");
const { addPermission, getPermission , retrievePermissionById, modifyPermission, removepermission} = require('../controllers/permission');
// const { checkAuth } = require("../../middleware/auth");
// const checkPermission = require("../../middleware/checkPermission");
const { permissionValidation } = require("../../validators/permissionValid");
const router = express.Router();

router.post('/',/*checkAuth, checkPermission, permissionValidation, */ errorWrapper(addPermission))
router.get('/', /*checkAuth, checkPermission,*/errorWrapper(getPermission))
router.get("/:id",/* checkAuth, checkPermission, */errorWrapper(retrievePermissionById));
router.put("/:id",/* checkAuth, checkPermission,*/ errorWrapper(modifyPermission));
router.delete("/:id",/* checkAuth, checkPermission, */errorWrapper(removepermission));



module.exports = router;