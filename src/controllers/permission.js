const {  createPermission, fetchPermissions, fetchPermissionById, updatePermissionById, deletePermissionById } = require('../services/permission');
const response = require('../../utils/response')

module.exports.addPermission = async(req, res) => {
  const {action,description, method,baseUrl,path}=req.body
  const permissionData = {action,description, method,baseUrl,path};
  const result = await createPermission(permissionData);
  return response.ok(res, result)
}

module.exports.getPermissions = async(req, res) => {
  const result = await fetchPermissions();
  return response.ok(res, result)
}

module.exports.retrievePermissionById = async(req, res) => {
    const {id} = req.params;
    const result = await fetchPermissionById(id);
    return response.ok(res, result)
}

module.exports.modifyPermission = async(req, res) => {
    const {id} = req.params;
    const result = await updatePermissionById(req.body, id);
    return response.ok(res, result)
}

module.exports.removePermission = async(req, res) => {
    const {id} = req.params;
    const result = await deletePermissionById(id);
    return response.ok(res, result)
}
