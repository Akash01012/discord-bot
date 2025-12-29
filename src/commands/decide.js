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
    const raw = interaction.options.getString('choices');
    const options = raw.split(',').map(o => o.trim()).filter(Boolean);

    if (options.length < 2) {
      return interaction.editReply('Please provide at least two options.');
    }

    const result = decide(options);

    await interaction.editReply(
      `Options: ${options.join(', ')}\nSelected: ${result.choice}\nReason: ${result.reason}`
    );
  }
};
