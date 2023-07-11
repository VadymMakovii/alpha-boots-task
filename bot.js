const { Telegraf, session } = require("telegraf");
const { message } = require("telegraf/filters");
const {
  botComands,
  genWelcomeMessage,
  genUnknownComandMessage,
} = require("./src/helpers");
const { stage } = require("./src/services");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());
bot.start(async (ctx) => {
  const userName = ctx.message.from.first_name || ctx.message.from.username;
  await ctx.replyWithHTML(genWelcomeMessage(userName));
});
bot.help((ctx) => ctx.reply(botComands));
bot.command("add", (ctx) => {
  ctx.scene.enter("add-user");
});
bot.on(message("text"), (ctx) =>
  ctx.replyWithHTML(genUnknownComandMessage(ctx.message.text))
);

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = bot;
