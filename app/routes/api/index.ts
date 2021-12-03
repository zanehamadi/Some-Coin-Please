import express from 'express'
const router = express.Router()
import sessionRouter from './session';
import usersRouter  from './users';
import productsRouter from './products';
import updateRouter from './updates';
import investmentRouter from './investments';

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/products', productsRouter)

router.use('/updates', updateRouter)

router.use('/investments', investmentRouter)

export default router

