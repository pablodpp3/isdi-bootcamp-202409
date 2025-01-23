import { Router } from 'express'
import { categorySearch } from './handlers/index.js'

const providersRouter = Router()

providersRouter.get('/providers', categorySearch)

export default {
    providersRouter
}