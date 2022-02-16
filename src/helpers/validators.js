const basicEmailRegexp = /^\S+@\S+$/;
export function isValidEmail(email) {
  if (email.charAt(0) === '.') {
    return false;
  }
  if (email.charAt(email.length - 1) === '.') {
    return false
  }
  if (email.indexOf('..') !== -1) {
    return false;
  }

  return Boolean(email.match(basicEmailRegexp));
}

export function isValidPassword(password) {
  return password.length >= 5;
}
