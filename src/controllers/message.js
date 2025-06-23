 const { insertConversation }  = require('../services/conversation')
 const response = require('../../utils/response');
const { fetchMessage, insertMessage } = require('../services/message');

module.exports.addMessage = async(req, res) => {
    const result = await insertMessage(req.body);
    return response.ok(res,result)
}



module.exports.uploadFile = async (req, res) => {
  try {
    console.log(req.files);  
    return response.ok(res, { message: 'Files uploaded successfully', files: req.files });
  } catch (err) {
    console.error('Upload error:', err);
    return response.error(res, 'File upload failed');
  }
};

 module.exports.sendFile = async (req, res) => {
  try {
    let media = []
    const { conversationId, userName, userId, message } = req.body;
    let fileUrl = null;
console.log("req file ",req.file)
    if (req.file) {
      fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
      console.log("FileURL ",fileUrl)
      media.push(fileUrl)
    }

    // Call your existing service function
    const result = await insertMessage({
      conversationId,
      createdBy: userId,
      content: message,
      type: req.file ? 'file' : 'text',
      media:fileUrl
    });

    if (result.error) {
      return res.status(500).json({ error: 'Failed to save message' });
    }

    // ✅ Emit via Socket.IO server side (if you want to broadcast from backend)
    // io.to(`Conversation Room ${conversationId}`).emit('receiveMessage', {
    //   userName,
    //   message,
    //   fileUrl,
    //   conversationId,
    //   createdAt: new Date().toISOString()
    // });

    // Send back file URL if uploaded
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      media,
    });

  } catch (err) {
    console.error('Send Message API Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports.getMessage = async(req, res) => {
    const { conversationId } = req.params;
    const result = await fetchMessage(conversationId);
    return response.ok(res,result)
}