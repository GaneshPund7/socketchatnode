const db = require("../models/index.js");
require("dotenv").config();
const {
  BadRequestError,
  DataNotFoundError,
} = require("../../utils/customError");

module.exports.createUser = async (userData) => {
  const { firstName, lastName, mobile, email, password, roleId, status } =
    userData;

  if (!password) {
    throw new BadRequestError("Please Enter Password");
  }

  const userExists = await db.user.findOne({ email: email });

  if (userExists) {
    throw new BadRequestError(
      "User with this email already exists, please enter a unique email"
    );
  }

  const newUser = await new db.user({
    firstName,
    lastName,
    email,
    password,
    roleId,
    mobile,
    status,
  });
  await newUser.save();

  return { error: false, result: "New User Added successfully", status: 201 };
};

module.exports.fetchUserById = async (id) => {
  const userData = await db.user.findOne({ _id: id, deletedAt: null });

  if (!userData) {
    throw new DataNotFoundError(`User with id: ${id} does not exists`);
  }

  return {
    error: false,
    message: "User Retrived Successfully",
    data: userData,
  };
};

 
module.exports.searchUser = async (query) => {

  const user = await db.user.find({
    $or: [
      { email: new RegExp(query, "i") },
      { name: new RegExp(query, "i") }
    ]
  });

  if (!user) {
    throw new DataNotFoundError("User not found");
  }

  return {
    error: false,
    message: "User Retrieved Successfully",
    data: user,
  };
};


module.exports.updateUserById = async (dataToBeUpdated, id) => {
  const checkUserExists = await db.user.findByIdAndUpdate(
    { _id: id },
    dataToBeUpdated,
    { new: true }
  );

  if (!checkUserExists) {
    throw new DataNotFoundError("User not found");
  }

  return { error: false, message: "User Updated Successfully" };
};

module.exports.deleteUserById = async (userToBeDeleted) => {
  const { id } = userToBeDeleted;

  const userDeleted = await db.user.findByIdAndUpdate(id, {
    deletedAt: new Date(),
  });

  if (!userDeleted) {
    throw new DataNotFoundError("User not found");
  }

  return { error: false, message: "User Deleted Successfully" };
};

module.exports.fetchAllUsers = async () => {
  const allUsersData = await db.user.find({});

  return {
    error: false,
    message: "User Retrived Successfully",
    data: allUsersData,
  };
};
