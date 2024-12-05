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
        required: false, 
        enum: ['customer', 'provider'],
        default: 'customer'
    }, 
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
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    services: [{
        type: String,
        required: true 
    }],
    categories: [{
        type: ObjectId,
        ref: 'Category', 
        required: true
    }],
    location: {
        type: String,
        required: true 
    }
}, { versionKey: false });

const User = model('User', user)
const Category = model('Category', category)
const Provider = model('Provider', provider)

export {
    User,
    Category,
    Provider
}