import 'dotenv/config'
import db from 'dat'
import removeComment from './removeComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return removeComment('6888f943b2fa1e9ef5479790', '6888f944b2fa1e9ef54797bd', '6735d58d73d0b267ee281e2e')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
