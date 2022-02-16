export function generateMeta(obj, meta) {
  const res = [];

  meta.forEach(({ title, field }) => {
    const value = obj[field];
    if (value !== undefined) {
      res.push({ title, value })
    }
  });

  return res;
}