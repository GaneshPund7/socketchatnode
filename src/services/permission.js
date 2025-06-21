
const db  = require('../models/permission')

const { BadRequestError, DataNotFoundError } = require('../../utils/customError')

module.exports.createPermission = async (permissionData) => {

    const {action,description, method,baseUrl,path } = permissionData

    const checkPermission = await db.permission.findOne({
        where : {
            action : action
        } 
    })

    if(checkPermission){
        throw new BadRequestError("Permission already exists")
    }

    const addPermissionData = await db.permission.create({
         action,
         description,
         method,
         baseUrl,
         path 
    })

    if(!addPermissionData) {
        throw new BadRequestError("Error while adding permission")
    }

    return {
        error : false,
        message : 'Permission Added successfully',
    }
}

module.exports.fetchPermission = async()  => {

    const permissionData = await db.permission.findAll({
        where : {
            deletedAt:null,
            order : [["id", "desc"]]
        }
    })

    return {
        error : false,
        message : "permission fetched successfully",
        result: permissionData,
    }


}

module.exports.fetchPermissionById = async(id) => {

    const permissionData = await db.permission.findone({
        _id:id,
        deletedAt:null
    })

    
  if (!permissionData) {
    throw new DataNotFoundError(`Permission with id: ${id} does not exists`);
  }

  return {
    error: false,
    message: "Permission Retrived Successfully",
    data: permissionData,
  };
}


module.exports.updatePermissionById = async (permissionToBeUpdated, id) => {
  const checkPermissionExists = await db.permission.findByIdAndUpdate(
    { _id: id },
    permissionToBeUpdated,
    { new: true }
  );

  if (!checkPermissionExists) {
    throw new DataNotFoundError("Permission not found");
  }

  return { error: false, message: "Permission Updated Successfully" };
};

module.exports.deletePermissionById = async (id) => {
  const permissionDeleted = await db.permission.findByIdAndUpdate(id, {
    deletedAt: new Date(),
  });

  if (!permissionDeleted) {
    throw new DataNotFoundError("Permission not found");
  }

  return { error: false, message: "Permission Deleted Successfully" };
};
