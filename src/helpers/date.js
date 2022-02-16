function twoDigits(digit) {
  return digit < 10 ? '0' + digit : digit;
}

// TODO: remove later
export function formatDateStrToLocaleDate(dateStr, locale) {
  // Sometimes dateStr might be just a year, like 1995
  if (dateStr.length === 4) {
    return dateStr;
  }
  const date = new Date(dateStr);
  const year = date.getFullYear();
  let month = twoDigits(date.getMonth() + 1);
  let day = twoDigits(date.getDate());

  const isUsUser = (locale === 'en-US');

  return isUsUser
    ? `${month}-${day}-${year}`
    : `${day}-${month}-${year}`;
}

// TODO: remove later
export function formatSecondaryDate(dateStr, locale) {
  const [year, month, day] = dateStr.split('-');

  return (locale === 'en-US')
    ? `${Number(month)}/${Number(day)}/${year}`
    :`${day}/${month}/${year}`;
}

export function secondsDiff(d1, d2) {
  return Math.round((d1 - d2) / 1000);
}

export function isTheSameDay(date, now) {
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    isTheSameYear(date, now)
  );
}

export function isTheSameYear(d1, d2) {
  return d1.getYear() === d2.getYear()
}

export function resetTime(date) {
  date.setHours(0, 0, 0, 0);
  return date;
}
