const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const getRandomURL = require('./get-img.js')
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) =>
    ctx.reply("Send me a text and i will give you a random product")
);
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));

bot.command("sendmessage", (ctx) => ctx.reply("Hello"));

bot.on(message("text"), async (ctx) => {
    const query = ctx.update.message.text;
    try {
        const imageUrl = await getRandomURL(query);
        await ctx.replyWithPhoto(imageUrl, { caption: `Here is a random image for "${query}"` });
    } catch (error) {
        console.log(error);
    }
});

bot.launch();
