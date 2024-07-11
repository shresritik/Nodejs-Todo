import dotenv from "dotenv";
dotenv.config();
const config = {
  port: process.env.PORT,
  password: process.env.ADMIN_PASSWORD,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 5000,
    refreshTokenExpiryMS: 50000,
  },
};
export default config;
