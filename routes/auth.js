const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const user = require('/models/user');
const {register} = require ('controllers/userController')


