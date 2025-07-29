import 'dotenv/config'
import db from 'dat'
import deletePost from './deletePost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deletePost('6888d815f98c73031625e1db', '6888ef7594455bbf57fd36d4')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())