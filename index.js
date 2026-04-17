"use strict";

const { Client, GatewayIntentBits } = require("discord.js");

// ───────── CONFIG ─────────
const TOKEN = process.env.DISCORD_TOKEN;
const COUNT_CHANNEL_ID = "1494238876829483078";

// ───────── CLIENT ─────────
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ───────── STATE ─────────
let currentNumber = 0;
let lastUserId = null;

// ───────── READY ─────────
client.once("ready", () => {
  console.log(`✅ Counting Bot Online: ${client.user.tag}`);
});

// ───────── MESSAGE HANDLER ─────────
client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== COUNT_CHANNEL_ID) return;

    const content = message.content.trim();

    // Must be a number only
    if (!/^\d+$/.test(content)) {
      await message.react("❌");
      setTimeout(() => message.delete().catch(() => {}), 3000);
      return;
    }

    const number = parseInt(content);

    // Prevent same user twice in a row
    if (message.author.id === lastUserId) {
      await message.react("❌");
      setTimeout(() => message.delete().catch(() => {}), 3000);
      return;
    }

    // Check correct number
    if (number !== currentNumber + 1) {
      await message.react("❌");
      setTimeout(() => message.delete().catch(() => {}), 3000);
      return;
    }

    // Valid number
    currentNumber++;
    lastUserId = message.author.id;

    await message.react("✅");

    setTimeout(() => {
      message.reactions.removeAll().catch(() => {});
    }, 3000);

  } catch (err) {
    console.error("Counting error:", err);
  }
});

// ───────── START ─────────
client.login(TOKEN);
