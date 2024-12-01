import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String, 
        required: true, 
        minLength: 2
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 60
    },
    role: {
        type: String, 
        required: true, 
        enum: ['customer', 'provider'],
        default: 'customer'
    }
}, { versionKey: false })

const category = new Schema({
    name: {
        type: String, 
        required: true, 
        minLength: 2
    },
    description: {
        type: String, 
        default: ''
    }
}, { versionKey: false })

const provider = new Schema({

})

const User = model('User', user)
const Category = model('Category', category)

export {
    User,
    Category,

}