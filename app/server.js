const express = require('express');
const expressExtensions = require('express-flow-extensions');

const enableSecurity = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const server = expressExtensions(express());

server
    .disable('x-powered-by')
    .use(enableSecurity())
    .use(cors({ origin : '*' }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended : false }))
    .use(methodOverride('X-HTTP-Method')) // Microsoft
    .use(methodOverride('X-HTTP-Method-Override')) // Google/GData
    .use(methodOverride('X-Method-Override')); // IBM

module.exports = server;
