const { User } = require("../../../models");
const { HttpError } = require("../../helpers");
const { getListUsers } = require("./getListUsers");

const addUser = async ({ body }) => {
  const { email } = body;
  await getListUsers();
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "User with this email address already exists");
  }
  const newContact = await User.create({ ...body });
  return newContact;
};

module.exports = {
  addUser,
};
