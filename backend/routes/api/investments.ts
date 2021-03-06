import { check } from 'express-validator';
import express from 'express'

import asyncHandler from 'express-async-handler';
import db  from '../../db/models';

const Investment: any = db.Investment
const router = express.Router()

interface InvestmentAttributes{
  id?: number;
  product_id: number;
  user_id: number;
  amount: number;
}


const validateInvestment = [
  check('id')
  .exists({checkFalsy: true})
  .withMessage('How did you get here?'),
  check('product_id')
  .exists({checkFalsy: true})
  .withMessage('How did you get here?'),
  check('user_id')
  .exists({checkFalsy: true})
  .withMessage('How did you get here?'),
  check('amount')
  .exists({checkFalsy: true})
  .withMessage('Please provide a valid amount.'),
]


router.get(
  '/',
  asyncHandler(async (req: any, res:any) => {
    const investments = await Investment.findAll()
    return res.json({
      investments
    })
  })
)



router.post(
  '/',
  validateInvestment,
  asyncHandler(async (req:any, res:any) => {
    const {user_id, product_id, amount}: InvestmentAttributes = req.body;

    let investment = await Investment.create({
      user_id,
      product_id,
      amount
    })

    return res.json(investment)
  })
)

router.put(
  '/:id',
  asyncHandler(async (req:any, res:any) => {
    const {amount}:any = req.body
    const investment = await Investment.findByPk(+req.params.id)
    investment.amount = amount
    await investment.save()
    return res.json(investment)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req:any, res:any) => {
    const investment = await Investment.findByPk(+req.params.id)
    await investment.destroy()
    return res.json({'message': 'Investment has been deleted.'})
  })
)

export default router
