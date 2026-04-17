"use strict";

const { Client, GatewayIntentBits } = require("discord.js");

// ───────── CONFIG ─────────
const TOKEN = process.env.DISCORD_TOKEN;
const JOIN_CHANNEL = process.env.JOIN_CHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// ───────── READY ─────────
client.once("ready", () => {
  console.log(`✅ Join Tracker Online: ${client.user.tag}`);
});

// ───────── MEMBER JOIN ─────────
client.on("guildMemberAdd", async (member) => {
  try {
    const channel = member.guild.channels.cache.get(JOIN_CHANNEL);
    if (!channel) return;

    const count = member.guild.memberCount;

    const messages = [
`——————————————————————————————————

${member} Has joined the legend server, where we lag together as a team 🤫

——————————————————————————————————

Members now: ${count}

——————————————————————————————————`,

`——————————————————————————————————

Guess who managed to reach the server, ${member}! Welcome to Lagging Legends 🥝

——————————————————————————————————

Members now: ${count}

——————————————————————————————————`,

`——————————————————————————————————

Another Legend arrived, and that is ${member}! Welcome to the lagging server 👋

——————————————————————————————————

Members now: ${count}

——————————————————————————————————`,

`——————————————————————————————————

Another lagging member arrived, welcome ${member} to your destination, Lagging Legends! 📸

——————————————————————————————————

Members now: ${count}

——————————————————————————————————`,
    ];

    const random = messages[Math.floor(Math.random() * messages.length)];
    await channel.send({ content: random });

  } catch (err) {
    console.error("Join error:", err);
  }
});

// ───────── START ─────────
client.login(TOKEN);
