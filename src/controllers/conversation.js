 const { insertConversation, fetchConversation, fetchConversationMessages }  = require('../services/conversation')
 const response = require('../../utils/response');
const { verifyToken } = require('../../utils/jwt');

module.exports.addConversation = async(req, res) => { 
    const gettoken = req.headers.authorization;
    const { type, userTo } = req.body;
    
    const token = gettoken.split(' ')[1];
    const decoded = verifyToken(token);
    const userBy = decoded.userId;
    const data = { type, userTo, userBy }; 
    const result = await insertConversation(data);
    
    return response.ok(res, result);
}

module.exports.getConversation = async(req, res) => {
    const {userId} = req.query;
    const result = await fetchConversation(userId);
    return response.ok(res,result)
}

module.exports.fetchConversationMessages = async(req, res) => {
    const { id } = req.params;
    const result = await fetchConversationMessages(id);
    return response.ok(res,result)
}