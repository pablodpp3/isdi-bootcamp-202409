import 'dotenv/config'
import db from 'dat'
import addComment from './addComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addComment('6888d816f98c73031625e1ea', '6888ef7594455bbf57fd36d5', 'wow wow wow!')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())