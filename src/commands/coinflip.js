const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin'),

  async execute(interaction) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

    await interaction.editReply(
      `Result: ${result}\nThis outcome was determined using a fair 50-50 probability.`
    );
  }
};
