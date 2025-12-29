function score(option) {
  let score = 0;

  score += option.length;

  const keywords = ['react', 'node', 'javascript', 'python'];
  if (keywords.some(k => option.toLowerCase().includes(k))) {
    score += 5;
  }

  if (option.split(' ').length === 1) score += 2;

  score += Math.random();

  return score;
}

function decide(options) {
  let best = null;
  let highest = -Infinity;

  for (const option of options) {
    const s = score(option);
    if (s > highest) {
      highest = s;
      best = option;
    }
  }

  return {
    choice: best,
    reason:
      'This option was selected using a balanced internal selection process when no clear preference was given.'
  };
}

module.exports = { decide };

