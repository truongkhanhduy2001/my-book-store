import jwt from "jsonwebtoken";

const SECRET_KEY =
  "3e6665547d971194bcf5319967c642c7272f1eb6cfce430ec9906fc5ee683629c67e9d3f6bb2508065fe5241d2b611a2bbd91ae0dedabc6ad30c5931cab08fc8";

export const signToken = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: any) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
