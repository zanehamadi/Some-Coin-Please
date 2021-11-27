import express from 'express'
const router = express.Router()
import sessionRouter from './session.js';
import usersRouter  from './users.js';

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

export default router

