const db = require("../models/index.js");

const { BadRequestError, DataNotFoundError } = require("../../utils/customError");

module.exports.insertConversation = async (conversationData) => {
  const { userBy, userTo,  } = conversationData;

  const existingConversation = await db.conversation.findOne({
    $or: [
      { userBy, userTo },
      { userBy: userTo, userTo: userBy }
    ]
  });

  if (existingConversation) {
    return {
      error: false,
      message: "Conversation already exists",
      status: 200,
      data: existingConversation
    };
  }

  const newConversation = await db.conversation.create(conversationData);

  if (!newConversation) {
    throw new BadRequestError("Error while adding conversation");
  }

  return {
    error: false,
    message: "New Conversation added successfully",
    status: 201,
    data: newConversation
  };
};

module.exports.fetchConversation = async (userId) => {
  const conversationData = await db.conversation.find({
    $or: [
      { userBy: userId },
      { userTo: userId }
    ]
  })
  .select('')
  .populate('userBy', 'name email avatarUrl')
  .populate('userTo', 'name email avatarUrl');

  if (!conversationData) {
    throw new BadRequestError("Error while fetching conversations");
  }

  return {
    error: false,
    message: "Conversations fetched successfully",
    result: conversationData,
    status: 201
  };
};

module.exports.fetchConversationMessages = async (conversationId) => {

  const messagesData = await db.message
              .find({ conversationId })
              .populate('createdBy', 'firstName');

  if(!messagesData){
    throw new BadRequestError("Error While Fetching Conversation Messages");
  }
  return { error: false, message: "Messages fetched successfully", result: messagesData , status: 201 };
};