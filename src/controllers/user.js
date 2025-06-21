 const { createUser, fetchAllUsers,  fetchUserById, updateUserById, deleteUserById, searchUser}  = require('../services/user')
 const response = require('../../utils/response')

module.exports.insertUser = async(req, res) => {
    const{firstName, lastName, mobile,  email, password, roleId, status} = req.body;
    const userData = {firstName, lastName, mobile, email, password, roleId, status};
    const result = await createUser(userData);
    return response.ok(res,result)
}

module.exports.retrieveAllUsers = async(req, res) => {

    const result = await fetchAllUsers();
    return response.ok(res, result)
}

module.exports.retrieveUserById = async(req, res) => {
    const {id} = req.params;
    const result = await fetchUserById(id);
    return response.ok(res, result)
}
module.exports.findUser = async(req, res) => {
    const {search} = req.query;
    const result = await searchUser(search);
    return response.ok(res, result)
}

module.exports.modifyUser = async(req, res) => {
    const {id} = req.params;
    const result = await updateUserById(req.body, id);
    return response.ok(res, result)
}

module.exports.removeUser = async(req, res) => {
    const {id} = req.params;
    const userToBeDeleted = {id};
    const result = await deleteUserById(userToBeDeleted);
    return response.ok(res, result)
}