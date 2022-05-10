export default () => ({
  type: "input",
  name: "packageName",
  message: "set package name",
  validate(val) {
    if (val) return true;
    return "Please enter your package name";
  },
});
