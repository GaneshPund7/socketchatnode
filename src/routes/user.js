const express = require("express");
const router = express.Router();
const { errorWrapper }=  require('../../utils/errorWrapper')
const {validateAddUser,validateUpdateUser} = require('../../validators/userValid')
const { insertUser, retrieveAllUsers, retrieveUserById, modifyUser, removeUser, findUser } = require('../controllers/user');
const checkAuth = require("../middleWare/checkAuth");

router.post("/",validateAddUser , /*validationError, */errorWrapper(insertUser));
router.get("/", /* checkPermission  */errorWrapper(retrieveAllUsers));
router.get("/search", /* checkPermission*/ errorWrapper(findUser));
router.get("/:id",/*  checkPermission, */errorWrapper(retrieveUserById));
router.put("/:id",/* checkPermission,*/ validateUpdateUser, errorWrapper(modifyUser));
router.delete("/:id",/* checkPermission, */errorWrapper(removeUser));

module.exports = router