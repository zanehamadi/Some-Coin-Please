import express from 'express'
import asyncHandler from 'express-async-handler';
import { setTokenCookie, restoreUser } from '../../util/auth';
import db  from '../../db/models';
import { GeneralError } from '../../app';

const User: any = db.users

const router: any = express.Router();

interface UserCredentials{
    credential: string;
    password: string;
}


router.post(
    '/',
    asyncHandler(async (req: any, res:any, next:any) => {

      const { credential, password }: UserCredentials = req.body;
  
      const user = await User.login({ credential, password });
  
      if (!user) {
        const err = new GeneralError('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }
  
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }),
  );

export default router