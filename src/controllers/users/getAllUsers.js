const { getListUsers } = require("../../services");

const { asyncHandler } = require("../../helpers");

const getAllUsers = async (_, res) => {
  const users = await getListUsers();
  return res.status(200).json({
    status: "success",
    code: 200,
    data: users,
  });
};

module.exports = {
  getAllUsers: asyncHandler(getAllUsers),
};
