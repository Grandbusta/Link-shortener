const dotenv=require('dotenv').config();

const DOMAIN=process.env.DOMAIN;
const PORT=process.env.PORT;
const DB_HOST=process.env.DB_HOST;
const DB_PW=process.env.DB_PASS;
const DB_USER=process.env.DB_USER;
const DB_NAME=process.env.DB_NAME;

module.exports={
    DOMAIN,
    PORT,
    DB_HOST,
    DB_PW,
    DB_USER,
    DB_NAME
}