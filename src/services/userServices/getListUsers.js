const { User } = require("../../../models");
const axios = require("axios");
const { EXTERNAL_DATA_URL } = process.env;

const externalServer = axios.create({
  baseURL: EXTERNAL_DATA_URL,
});

const getListUsers = async () => {
  const dbUsers = await User.find();
  const { data } = await externalServer.get();
  const externalData = data.map(({ name, email }) => {
    const user = {
      name,
      email,
    };
    return user;
  });
  const newUserList = [...dbUsers];

  externalData.forEach((user) => {
    const item = newUserList.find(({ email }) => email === user.email);
    if (item) {
      return;
    }
    newUserList.push(user);
  });

  if (newUserList.length === dbUsers.length) {
    return dbUsers;
  }

  const newUsers = await User.create(newUserList);
  return newUsers;
};

module.exports = {
  getListUsers,
};
