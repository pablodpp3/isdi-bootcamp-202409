import 'dotenv/config'
import db from 'dat'
import createPost from './createPost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createPost('6888d815f98c73031625e1db', 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3enFldjF6MWc0N2ZwbzFrZG01cmt1Z3c2ZjYzYWV4ejB0am91dnFnNCZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/otnqsqqzmsw7K/giphy.gif', 'hola pingüinos')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())