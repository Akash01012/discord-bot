const { SlashCommandBuilder } = require('discord.js');
const { decide } = require('../logic/decisionEngine');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('decide')
    .setDescription('Make a reasoned decision')
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

    if (options.length < 2) {
      return interaction.reply('Please provide at least two options.');
    }

    const result = decide(options);

    await interaction.reply(
      `Options: ${options.join(', ')}\nSelected: ${result.choice}\nReason: ${result.reason}`
    );
  }
};
