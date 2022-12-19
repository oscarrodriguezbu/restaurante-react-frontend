export const getAuthError = ({ name, email, password }) => {
  if (name) {
    return name.msg;
  }

  if (email) {
    return email.msg;
  }

  if (password) {
    return password.msg;
  }
};
