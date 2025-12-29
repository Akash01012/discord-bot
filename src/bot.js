
require('dotenv').config();
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const { handleMessage } = require('./handlers/messageHandler');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.get('/', (_, res) => res.send('Bot is running'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath)) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
  console.log('Bot is running');
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (command) await command.execute(interaction);
});

client.on(Events.MessageCreate, message => {
  handleMessage(message);
});

client.login(process.env.DISCORD_TOKEN);
