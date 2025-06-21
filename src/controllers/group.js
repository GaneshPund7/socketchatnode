const { insertGroup, fetchGroup } = require("../services/group");

module.exports.addGroup = ((req, res)=>{
 const result = insertGroup(req.body);
 return response.ok(res, result)
});

module.exports.getGroup = ((req, res)=>{
    const { userId } = req.query;
 const result = fetchGroup(userId);
 return response.ok(res, result)
});