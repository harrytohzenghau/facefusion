export const validatePassword = (value) => {
  const minLength = /.{8,}/;
  const hasUppercase = /[A-Z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*]/;

  if (!minLength.test(value)) {
    return "Password must be at least 8 characters long.";
  }
  if (!hasUppercase.test(value)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!hasNumber.test(value)) {
    return "Password must contain at least one number.";
  }
  if (!hasSpecialChar.test(value)) {
    return "Password must contain at least one special character (!@#$%^&*).";
  }
  return "";
};
