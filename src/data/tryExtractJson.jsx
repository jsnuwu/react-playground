export default function tryExtractJson(text) {
  try {
    return JSON.parse(text);
  } catch {}

  const block = text.match(/```json([\s\S]*?)```/i);
  if (block) {
    try {
      return JSON.parse(block[1]);
    } catch {}
  }

  const loose = text.match(/\{[\s\S]*\}/);
  if (loose) {
    try {
      return JSON.parse(loose[0]);
    } catch {}
  }

  return null;
}
