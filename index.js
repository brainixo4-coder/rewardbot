import TelegramBot from 'node-telegram-bot-api';
import express from 'express';

const token = "8411953536:AAGr-MyzFYEvAwr_ypScHjl65e51rrgNz64"; //

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

const userData = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  userData[chatId] = { joined: false };

  bot.sendMessage(chatId,
    `Welcome 🎉\n\nReward lene ke liye pehle in channels join karo:\n\n1️⃣ @mastersquad_official\n2️⃣ @vipchanneltashan\n\nJoin karne ke baad /verify bhejo`
  );
});

bot.onText(/\/verify/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const ch1 = await bot.getChatMember("@mastersquad_official", chatId);
    const ch2 = await bot.getChatMember("@vipchanneltashan", chatId);

    if (
      (ch1.status === "member" || ch1.status === "administrator" || ch1.status === "creator") &&
      (ch2.status === "member" || ch2.status === "administrator" || ch2.status === "creator")
    ) {
      bot.sendMessage(chatId, "✅ Verification successful! Aap reward ke liye eligible ho.");
    } else {
      bot.sendMessage(chatId, "❌ Pehle dono channels join karo, phir /verify bhejo.");
    }
  } catch (e) {
    bot.sendMessage(chatId, "Error aaya. Dubara try karo.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
