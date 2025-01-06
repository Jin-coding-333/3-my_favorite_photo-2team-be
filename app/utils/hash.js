import bcrypt from "bcrypt";

async function hashValue(value) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashResult = await bcrypt.hash(value, salt);
  return hashResult;
}

async function compare(value, value2) {
  const match = await bcrypt.compare(value, value2);
  return match;
}

const hash = { hashValue, compare };

export default hash;
