const { BadRequestError, DataNotFoundError } = require("../../utils/customError.js");
const db = require("../models/index.js");

module.exports.insertGroup = async (body) => {
    const { title, description, avatarUrl, tasks, type, createdBy } = body
    const addGroup =
        await db.group.create({ title, description, avatarUrl, tasks, type, createdBy });
    if (!addGroup) {
        throw new BadRequestError("Error While Adding Group");
    }
    return { error: false, result: "New Group Added successfully", status: 201 };
};

module.exports.fetchGroup = async (userId) => {
    const GroupData = await db.Group.find({
        $or: [
            { userBy: userId },
            { userTo: userId }
        ]
    })

    if (!GroupData) {
        throw new DataNotFoundError("Error While Fetching Group");
    }
    return { error: false, message: "Group fetched successfully", result: GroupData, status: 201 };
};
