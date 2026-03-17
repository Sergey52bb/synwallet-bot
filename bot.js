require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { createWallet, getBalance } = require('./services/tonWallet');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const address = await createWallet(msg.from.id);
  bot.sendMessage(msg.chat.id, `Кошелек создан:\n${address}`);
});

bot.onText(/\/balance/, async (msg) => {
  const balance = await getBalance(msg.from.id);
  bot.sendMessage(msg.chat.id, `Баланс: ${balance} TON`);
});