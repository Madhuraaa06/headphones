const bcrypt = require("bcrypt");

const hashPass = async (password) => {
  try {
    const rounds = 10;
    const hashedpassword = await bcrypt.hash(password, rounds);
    return hashedpassword;
  } catch (error) {
    console.error(error);
    throw new Error("Error hashing password");
  }
};

const comparePassword = async (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
};

module.exports = {
  hashPass,
  comparePassword
};
