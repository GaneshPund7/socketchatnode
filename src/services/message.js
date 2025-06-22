
const db = require('../models')

const { BadRequestError, DataNotFoundError } = require('../../utils/customError');

module.exports.insertMessage = async (messageData) => {
    const { conversationId, createdBy, content, type, media = [],
        parentMessage = null,
        isThread = false,
        threadId = null } = messageData;

    const addMessage = await db.message.create({
        createdBy,
        conversationId, 
        content,
        type, media, parentMessage, isThread, threadId
    })

    if (!addMessage) {
        throw new BadRequestError("Error while adding message")
    }

    return {
        error: false,
        message: 'Message Added successfully',
    }
}

module.exports.fetchMessage = async (conversationId) => {
  const getMessage = await db.message.find({ conversationId }).populate("createdBy", "name", "avatarUrl");

  if (!getMessage.length) {
    throw new BadRequestError("No messages found");
  }

  return { 
    error: false, 
    message: "Messages fetched successfully", 
    data: getMessage 
  };
};
