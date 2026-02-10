export const truncate = (text, len = 60) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len) + "..." : text;
};
