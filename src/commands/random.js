const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Pick a random option')
    .addStringOption(opt =>
      opt.setName('choices')
        .setDescription('Comma separated options')
        .setRequired(true)
    ),

  async execute(interaction) {
    const options = interaction.options
      .getString('choices')
      .split(',')
      .map(o => o.trim());

    const choice = options[Math.floor(Math.random() * options.length)];

    await interaction.reply(
      `Options: ${options.join(', ')}\nSelected: ${choice}\nSelection was made randomly.`
    );
  }
};
