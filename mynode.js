const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u2705';
const dotenv = require('dotenv').config({path:'./.env'});

const authConfig = `{
    "domain":  "${process.env.domain}",
    "clientId": "${process.env.clientId}",
    "authorizationParams": ${process.env.authorizationParams},
    "apiUri": "${process.env.apiUri}",
    "appUri": "${process.env.appUri}",
    "errorPath": "${process.env.errorPath}",
    "API_KEY": "${process.env.API_KEY}"
}`

const targetPath = path.join(__dirname, './auth_config.json');
fs.writeFile(targetPath, authConfig, (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log(successColor, `${checkSign} Environment file generated successfully at ${targetPath}`);
}); 
