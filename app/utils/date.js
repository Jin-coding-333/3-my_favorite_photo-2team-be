export const getTime = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // AM/PM 형식
  }).format(now);
};
