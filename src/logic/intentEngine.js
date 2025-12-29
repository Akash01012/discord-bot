function IntentEngine(text) {
  if (
    text.includes("choose") ||
    text.includes("decide") ||
    text.includes("pick")
  ) {
    return "DECISION";
  }

  if (text.startsWith("why")) {
    return "WHY";
  }

  if (
    text.includes("how should") ||
    text.includes("what should i do")
  ) {
    return "GUIDANCE";
  }

  if (text.endsWith("?")) {
    return "QUESTION";
  }

  return "UNKNOWN";
}

module.exports = IntentEngine;
