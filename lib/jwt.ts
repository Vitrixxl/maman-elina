import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;
type Payload = {
  email: string;
  password: string;
  lastRequest: Date;
  created: Date;
};
export function generateToken(payload: Payload) {
  if (!secretKey) return null;
  return jwt.sign(payload, secretKey);
}

export function verifyToken(token: string) {
  if (!secretKey) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return "hey";
  }
}
