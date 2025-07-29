import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { DuplicityError } = errors

import registerUser from './registerUser.js'

describe('registerUser', () => {
    // esto sería: before(async () => await db.connect(process.env.MONGO_URL_TEST))
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // esto sería: beforeEach(async () => await User.deleteMany())
    beforeEach(() => User.deleteMany())

    it('succeeds on new user', async () => {
        await registerUser('Super Mario', 'super@mario.com', 'supermario', '123456789', '123456789')

        const user = await User.findOne({ username: 'supermario' })

        expect(user).to.exist //.not.to.be.null
        expect(user.name).to.equal('Super Mario')
        expect(user.email).to.equal('super@mario.com')
        expect(user.username).to.equal('supermario')
        expect(bcrypt.compareSync('123456789', user.password)).to.be.true
    })

    debugger
    it('fails on existing user', () =>
        expect((async () => {
            await User.create({ name: 'Super Mario', email: 'super@mario.com', username: 'supermario', password: bcrypt.hashSync('123456789', 10) })

            await registerUser('Super Mario', 'super@mario.com', 'supermario', '123456789', '123456789')
        })()).to.be.rejectedWith(DuplicityError, 'user already exists')
    )

    // sería: after(async () => await db.disconnect())
    after(() => db.disconnect())
})
