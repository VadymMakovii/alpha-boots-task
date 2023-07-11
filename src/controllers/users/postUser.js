const { addUser } = require("../../services");

const { asyncHandler } = require("../../helpers");

const postUser = async (req, res) => {
  const newContact = await addUser(req);
  res.status(201).json({
    status: "success",
    code: 201,
    data: newContact,
  });
};
module.exports = {
  postUser: asyncHandler(postUser),
};
