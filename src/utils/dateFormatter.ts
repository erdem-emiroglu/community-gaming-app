export function dateFormat(date?: Date | string) {
  if (date == null) return;

  const d = new Date(date);
  const year = d.getFullYear();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();

  let hours = "" + d.getHours();
  let minutes = "" + d.getMinutes();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;

  return [day, month, year].join(".") + " " + [hours, minutes].join(":");
}
