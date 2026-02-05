import { randomUUID } from "node:crypto";

export const generateVerificationToken = () => {
  const token = randomUUID();
  // Set expiration to 24 hours from now
  const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  return { token, expires };
};
