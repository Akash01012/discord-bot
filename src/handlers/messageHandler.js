const { detectIntent } = require('../logic/intentEngine');

let isActivated = false;
let isSilent = false;
let introShown = false;
let okMessageShown = false;

function handleMessage(message) {
  if (message.author.bot) return;

  const text = message.content.toLowerCase().trim();

  // ---------- GREETING ----------
  if (
    ['hi', 'hello', 'hey', 'hello everyone', 'hi everyone'].includes(text)
  ) {
    if (introShown) return;

    introShown = true;
    okMessageShown = false;
    isSilent = false;
    isActivated = false;

    message.reply(
      'Hello I am Bot.. I help with making decisions. You can ask me to choose, flip a coin, eliminate options, or decision on choices.'
    );
    return;
  }

  // ---------- OK / ACK ----------
  if (text === 'ok' || text === 'okay') {
    if (okMessageShown) return;

    okMessageShown = true;
    isSilent = true;
    isActivated = false;

    message.reply(
      'I am here. If you need help with making a decision, just say "bot".'
    );
    return;
  }

  // ---------- BOT ACTIVATION ----------
  if (text === 'bot') {
    isActivated = true;
    isSilent = false;

    message.reply(
      'I am active now. You can ask me to choose, flip a coin, eliminate options, or decide. Just use / commands.'
    );
    return;
  }

  // ---------- SILENT MODE ----------
  if (isSilent && !isActivated) return;

  // ---------- ACTIVATED MODE ----------
  if (!isActivated) return;

  const intent = detectIntent(text);

  switch (intent) {
    case 'DECISION':
      message.reply(
        'Use /decide, /coinflip, /eliminate, or /random to make a decision.'
      );
      break;

    case 'WHY':
      message.reply(
        'Decisions depend on priorities. Provide options and I can help.'
      );
      break;

    case 'GUIDANCE':
      message.reply(
        'Break the problem into clear options, then ask me to decide.'
      );
      break;

    case 'QUESTION':
      message.reply(
        'If you want help deciding, list the available choices.'
      );
      break;

    default:
      // stay silent
      break;
  }
}

module.exports = { handleMessage };
