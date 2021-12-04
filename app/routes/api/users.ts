import express from 'express'
import asyncHandler from 'express-async-handler';
import { setTokenCookie} from '../../util/auth';
import db  from '../../db/models';
import { check } from 'express-validator';
import {handleValidationErrors}  from '../../util/validation';
import {singleMulterUpload, singlePublicFileUpload} from '../../awsS3'
import config from '../../config';

const stripe = require('stripe')(config.stripeKey);
const User: any = db.User
const router = express.Router();



interface CreateUserCredentials{
    email: string;
    password: string;
    username: string;
    profile_picture?: string;
}

interface UpdateUserAttributes{
  username: string;
  profile_picture: string;
  balance: number;
}

const validateUserUpdate = [
  check('balance')
  .exists({ checkFalsy: true })
  .withMessage('How did you get here?'),
  check('username')
  .exists({ checkFalsy: true })
  .withMessage('How did you get here?'),
  check('profile_picture')
  .exists({ checkFalsy: true })
  .withMessage('How did you get here?'),
]

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
  handleValidationErrors,
];

router.post(
    '/',
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req: any, res: any) => {
      const { email, password, username}: CreateUserCredentials = req.body;
      const profile_picture = await singlePublicFileUpload(req.file);
      const user = await User.signUp({ email, username, password, profile_picture });
        
      await setTokenCookie(res, user);
  
      return res.json({
        user
      });
    }),
  );


router.get(
    '/',
    asyncHandler(async (req: any, res:any) => {
      const users = await User.findAll()
      return res.json({
        users
      })
    })
)

router.post(
      `/:id/charges`,
      asyncHandler(async (req:any, res:any) => {
        
        const {amount} = req.body
        await stripe.charges.create({
          amount: amount * 100,
          currency: 'usd',
          source: 'tok_bypassPending',
          description: `User ${req.params.id} purchased ${amount} coin.`,
        });
        return res.json({'message':'transaction was sucessful'})
      })
)

router.put(
    '/:id',
    validateUserUpdate,

    asyncHandler(async (req:any, res:any) => {
      const {username, profile_picture, balance}: UpdateUserAttributes = req.body
      const user = await User.findByPk(+req.params.id);
      user.username = username;
      user.profile_picture = profile_picture;
      user.balance = balance;
      await user.save()
      return res.json(user)
    })
)



export default router
