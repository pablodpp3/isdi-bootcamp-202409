import { connect, disconnect } from 'mongoose'
import { User, Provider } from './models.js'


const db = {
    connect, 
    disconnect
}

export default db

export {
    User,
    Provider
}