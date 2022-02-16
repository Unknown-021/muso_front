const identity = (value) => value;

export function timeAgo(date, transform = identity) {
  const dateObj = (date instanceof Date)
    ? date
    : new Date(date);

  const diff = Math.floor((Date.now() - dateObj) / 1000);
  if (diff < 0) {
    throw new TypeError('Date should be in past');
  }

  const { seconds, period } = intervals.find(item => diff >= item.seconds);
  const value = Math.floor(diff / seconds) || 0;

  return transform({ value, period });
}

export function abbreviationFormat({ value, period }) {
  if (period === 'NOW') {
    return 'Now';
  }
  const postfix = period.charAt(0).toLowerCase();
  return value + postfix;
};

const intervals = [
  { seconds: 31536000, period: 'YEAR' },
  { seconds: 18144000, period: 'MONTH' },
  { seconds: 604800, period: 'WEEK' },
  { seconds: 86400, period: 'DAY' },
  { seconds: 3600, period: 'HOUR' },
  { seconds: 60, period: 'MINUTE' },
  { seconds: 1, period: 'SECOND' },
  { seconds: 0, period: 'NOW' }
];