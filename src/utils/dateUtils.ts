export function parseDateTime(dateStr = "", timeStr = ""): Date {
  if (!dateStr && !timeStr) return new Date();

  const [year, month, day] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);

  return new Date(Date.UTC(year, month - 1, day, hours, minutes));
}
