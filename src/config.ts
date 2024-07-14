import dotenv from "dotenv";
dotenv.config();
const config = {
  port: process.env.PORT,
  password: process.env.ADMIN_PASSWORD,
  token: {
    user: process.env.USER_ACCESS_TOKEN,
    admin: process.env.ADMIN_ACCESS_TOKEN,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 5000,
    refreshTokenExpiryMS: 50000,
  },
};
export default config;
