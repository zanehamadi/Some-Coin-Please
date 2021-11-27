import express from 'express'
import asyncHandler from 'express-async-handler';
import { setTokenCookie, restoreUser } from '../../util/auth';
import db  from '../../db/models';

const User: any = db.User
const router = express.Router();

interface CreateUserCredentials{
    email: string;
    password: string;
    username: string;
    profile_picture: string;
}

router.post(
    '/',
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
