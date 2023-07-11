const { Scenes } = require("telegraf");
const axios = require("axios");
const { SERVER_URL } = process.env;
const {
  nameValidationPattern,
  nameValidationMessage,
  emailValidationMessage,
  emailValidationPattern,
  ageValidationMessage,
  genSuccessfulMessage,
  genErrorMessage,
  scenesMiddleware,
} = require("../../helpers");

const ownServer = axios.create({
  baseURL: SERVER_URL,
});

const nameScene = (ctx) => {
  ctx.reply("Let`s start! Enter user name");
  ctx.wizard.state.data = {};
  return ctx.wizard.next();
};

const emailScene = (ctx) => {
  const name = ctx.message.text;
  if (!name.match(nameValidationPattern)) {
    ctx.reply(nameValidationMessage);
    return;
  }
  ctx.wizard.state.data.name = ctx.message.text;
  ctx.reply("Amazing! Now enter the user's email address");
  return ctx.wizard.next();
};

const ageScene = (ctx) => {
  const email = ctx.message.text;
  if (!email.match(emailValidationPattern)) {
    ctx.reply(emailValidationMessage);
    return;
  }
  ctx.wizard.state.data.email = ctx.message.text;
  ctx.reply("Perfect! It remains to enter the age of the user");
  return ctx.wizard.next();
};

const finalScene = async (ctx) => {
  const age = Number(ctx.message.text);
  if (!Number.isInteger(age) || age < 18 || age > 120) {
    ctx.reply(ageValidationMessage);
    return;
  }
  ctx.wizard.state.data.age = ctx.message.text;
  const userData = ctx.wizard.state.data;
  try {
    const { data } = await ownServer.post("", userData);
    ctx.replyWithHTML(genSuccessfulMessage(data));
  } catch (error) {
    ctx.replyWithHTML(genErrorMessage(error.response.data.message));
  }
  return ctx.scene.leave();
};

const addUserScene = new Scenes.WizardScene(
  "add-user",
  ...scenesMiddleware([nameScene, emailScene, ageScene, finalScene])
);

const stage = new Scenes.Stage([addUserScene]);

module.exports = { stage };
