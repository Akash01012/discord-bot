const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eliminate')
    .setDescription('Eliminate options one by one')
    .addStringOption(opt =>
      opt.setName('choices')
        .setDescription('Comma separated options')
        .setRequired(true)
    ),

  async execute(interaction) {
    let options = interaction.options
      .getString('choices')
      .split(',')
      .map(o => o.trim())
      .filter(Boolean);

    let log = 'Elimination process:\n';

    while (options.length > 1) {
      const index = Math.floor(Math.random() * options.length);
      log += `Removed: ${options[index]}\n`;
      options.splice(index, 1);
    }

    log += `Final choice: ${options[0]}`;
    await interaction.editReply(log);
  }
};

