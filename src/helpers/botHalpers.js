const botComands = `
/start - Restart bot
/help - Help
/add - Add new user to data base
`;

const genSuccessfulMessage = ({ data: { name, email, age } }) => {
  return `The new user has been <b>successfully</b> added to the database with data:\nname: <b>${name}</b>\nemail: <b>${email}</b>\nage: <b>${age}</b>`;
};

const genErrorMessage = (message) => {
  return `<b>${message}</b>!\nEnter the /add command and try again!`;
};

const genUnknownComandMessage = (text) => {
  return `
    Comand <b>"${text}"</b> is not available\nTo view all available commands, enter the /help comand or open the menu`;
};

const genWelcomeMessage = (userName) => {
  return `
   <b>Hello ${userName}! 👋</b>\nTo view all available commands, type /help or open the menu`;
};

const abortedMessage = `<b>User creation aborted!</b>\nPlease enter correct data and do not use reserved commands during user creation.\nBot commands can be found here /help.\nStart creating a new user /add !\n<b>Good luck!</b>`;

const scenesMiddleware = (scenes) => {
  const comands = {
    "/start": "/start",
    "/help": "/help",
  };
  const ctrls = scenes.map((scene) => {
    const func = (ctx) => {
      const text = ctx.message.text;
      if (text === comands[text]) {
        ctx.replyWithHTML(abortedMessage);
        return ctx.scene.leave();
      }
      return scene(ctx);
    };
    return func;
  });
  return ctrls;
};

module.exports = {
  botComands,
  genSuccessfulMessage,
  genErrorMessage,
  genUnknownComandMessage,
  genWelcomeMessage,
  scenesMiddleware,
  abortedMessage,
};
