const { detectIntent } = require('../logic/intentEngine');

let isSilent = false;
let isActivated = false;
let introShown = false;
let okMessageShown = false;

function handleMessage(message) {
  if (message.author.bot) return;

  const text = message.content.toLowerCase().trim();
  if (
    text === 'hi' ||
    text === 'hello' ||
    text === 'hey' ||
    text === 'hello everyone' ||
    text === 'hi everyone'
  ) {
    message.reply(
      'Hello I am Bot.. I help with making decisions. You can ask me to choose, flip a coin, eliminate options, or decision on choices.'
    );
    introShown = true;
    return;
  }
  
  if (text === 'ok' || text === 'okay') {
    message.reply(
      'I am here. If you need help with making a decision, just say "bot".'
    );
    isSilent = true;
    okMessageShown = true;
    return;
  }

  // ---------- BOT ACTIVATION ----------
  if (text.includes('bot')) {
    isActivated = true;
    isSilent = false;

    message.reply(
      'I am active now. You can ask me to choose, flip a coin, eliminate options, or decide. just use / command.'
    );
    return;
  }

  // ---------- SILENT MODE ----------
  if (isSilent && !isActivated) {
    return;
  }

  // ---------- BEFORE SILENT (NO OK SAID YET) ----------
  if (!isActivated && !okMessageShown) {
    message.reply(
      'I am Bot.. If you need help with making a decision, just say "bot".'
    );
    okMessageShown = true;
    isSilent = true;
    return;
  }

  // ---------- ACTIVATED MODE ----------
  if (!isActivated) return;

  const intent = detectIntent(text);

  switch (intent) {
    case 'DECISION':
      message.reply(
        'You can ask me to choose, flip a coin, eliminate options, or guide a group decision.'
      );
      break;

    case 'WHY':
      message.reply(
        'Decisions usually depend on context and priorities. Clear options make decisions easier.'
      );
      break;

    case 'GUIDANCE':
      message.reply(
        'Try breaking the problem into clear options. Once you do that, I can help you decide.'
      );
      break;

    case 'QUESTION':
      message.reply(
        'That depends on the situation. If you want help deciding, please share the available options.'
      );
      break;

    default:
      // Stay silent during normal chat
      break;
  }
}

module.exports = { handleMessage };
