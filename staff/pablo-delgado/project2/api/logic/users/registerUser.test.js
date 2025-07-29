import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await registerUser('Super Mario', 'super@mario.com', 'supermario', '123456789', '123456789')

    console.log(result) // undefined
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}