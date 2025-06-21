const { body } = require("express-validator")


exports.permissionValidation = [
    body("action")
        .notEmpty()
        .withMessage("action is required")
        .isString()
        .withMessage("action should be string") ,
    
    body("description")
        .notEmpty()
        .withMessage("description is required")
        .isString()
        .withMessage("description should be string") ,

    body("method")
        .notEmpty()
        .withMessage("method is required")  
        .isString()
        .withMessage("method should be string") ,
    
    body("base_url")
        .notEmpty()
        .withMessage("base_url is required")
        .isString()
        .withMessage("base_url should be string") ,    

    body("path")
        .notEmpty()
        .withMessage("path is required")
        .isString()
        .withMessage("path should be string") ,  

    ]  
    
   