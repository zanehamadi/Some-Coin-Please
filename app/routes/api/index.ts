import express from 'express'
const router = express.Router()
import sessionRouter from './session';
import usersRouter  from './users';

router.use('/session', sessionRouter);

router.use('/users', usersRouter);



export default router

