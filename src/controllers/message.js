 const { insertConversation }  = require('../services/conversation')
 const response = require('../../utils/response');
const { fetchMessage, insertMessage } = require('../services/message');

module.exports.addMessage = async(req, res) => {
    const result = await insertMessage(req.body);
    return response.ok(res,result)
}
module.exports.getMessage = async(req, res) => {
    const { conversationId } = req.params;
    const result = await fetchMessage(conversationId);
    return response.ok(res,result)
}