import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await authenticateUser('coco@loco.com', '123123123')

    console.log(email)
}catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}