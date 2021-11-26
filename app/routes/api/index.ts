import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import {setTokenCookie, restoreUser, requireAuth} from '../../util/auth'

import db from '../../db/models'

const User: any = db.User



export default router

