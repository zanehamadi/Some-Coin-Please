import { check } from 'express-validator';
import express from 'express'

import asyncHandler from 'express-async-handler';
import db  from '../../db/models';

const Update: any = db.Update
const router = express.Router()



interface UpdateAttributes{
  id?: number;
  title: string;
  description: string;
  product_id: number;
}


const validateUpdate = [
  check('title')
  .exists({checkFalsy: true})
  .isLength({min: 1})
  .withMessage('Please provide a title.'),
  check('title')
  .exists({checkFalsy: true})
  .isLength({max: 256})
  .withMessage('Title is too long.'),
  check('description')
  .exists({checkFalsy:true})
  .isLength({min: 15})
  .withMessage('Description is too short.'),
  check('description')
  .exists({checkFalsy:true})
  .isLength({max:2000})
  .withMessage('Description is too long.'),
  check('product_id')
  .exists({checkFalsy:true})
  .withMessage('How did you get here.'),
  
]


router.get(
  '/',
  asyncHandler(async (req:any, res:any) => {
    const updates = await Update.findAll()
    return res.json({
      updates
    })
  })
)


router.post(
  '/',
  validateUpdate,
  asyncHandler(async (req:any, res:any) => {
    const {title, description, product_id}: UpdateAttributes = req.body;
    let update = await Update.create({
      product_id,
      title,
      description
    })

    return res.json(update)
  })
)

export default router