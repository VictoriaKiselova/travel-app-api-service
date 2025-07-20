import bcrypt from 'bcrypt';

export const hashString = (string, saltRounds = 10) =>
  bcrypt.hash(string, saltRounds);

export const compareHash = (string, hash) => bcrypt.compare(string, hash);
