import express from 'express'
import asyncHandler from 'express-async-handler';
import { setTokenCookie, restoreUser } from '../../util/auth';
import db  from '../../db/models';
import { check } from 'express-validator';
import {handleValidationErrors}  from '../../util/validation';

const User: any = db.User
const Product: any = db.Product
const router = express.Router();

interface CreateUserCredentials{
    email: string;
    password: string;
    username: string;
    profile_picture: string;
}



const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('email')
    .exists({checkFalsy: true})
    .isLength({min: 5})
    .withMessage('Please provide a valid email.'),
  check('email')
    .exists({checkFalsy: true})
    .isLength({max: 345})
    .withMessage('How is your email this long?'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a username with at least 3 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('username')
    .exists({checkFalsy: true})
    .isLength({max: 15})
    .withMessage('Username can not be longer than 15 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('profile_picture')
    .exists({ checkFalsy: true})
    .isLength({min: 1})
    .withMessage('How did you get here?'),
  handleValidationErrors,
];

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req: any, res: any) => {
      const { email, password, username, profile_picture }: CreateUserCredentials = req.body;
      const user = await User.signUp({ email, username, password, profile_picture });
        
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }),
  );





export default router
