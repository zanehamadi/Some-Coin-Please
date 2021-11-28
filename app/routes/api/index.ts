import express from 'express'
const router = express.Router()
import sessionRouter from './session';
import usersRouter  from './users';
import productsRouter from './products';

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/products', productsRouter)



export default router

