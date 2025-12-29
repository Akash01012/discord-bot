function normalize(value, min, max) {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

function score(option, stats) {
  const length = option.length;
  const words = option.split(/\s+/).length;
  const uniqueChars = new Set(option.toLowerCase()).size;

  // Normalize values so no factor dominates
  const lengthScore = 1 - Math.abs(
    normalize(length, stats.minLen, stats.maxLen) - 0.5
  );

  const uniquenessScore = normalize(
    uniqueChars,
    stats.minUnique,
    stats.maxUnique
  );

  const clarityScore = words === 1 ? 1 : 0.7;

  const randomness = Math.random() * 0.2; // tie-breaker only

  return (
    lengthScore * 0.4 +
    uniquenessScore * 0.3 +
    clarityScore * 0.3 +
    randomness
  );
}

function decide(options) {
  if (!Array.isArray(options) || options.length < 2) {
    throw new Error('At least two options are required');
  }

  // Pre-calc stats for normalization
  const lengths = options.map(o => o.length);
  const uniques = options.map(o => new Set(o.toLowerCase()).size);

  const stats = {
    minLen: Math.min(...lengths),
    maxLen: Math.max(...lengths),
    minUnique: Math.min(...uniques),
    maxUnique: Math.max(...uniques)
  };

  let best = null;
  let highest = -Infinity;

  for (const option of options) {
    const s = score(option, stats);
    if (s > highest) {
      highest = s;
      best = option;
    }
  }

  return {
    choice: best,
    reason:
      'This option was selected by evaluating balance, clarity, and uniqueness without domain-specific bias.'
  };
}

module.exports = { decide };
