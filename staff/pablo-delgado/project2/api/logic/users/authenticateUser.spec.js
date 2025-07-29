import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { CredentialsError } = errors

import authenticateUser from './authenticateUser.js'

debugger

describe('authenticateUser', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        await User.create({ name: 'Super Mario', email: 'super@mario.com', username: 'supermario', password: bcrypt.hashSync('123456789', 10) })

        const user = await authenticateUser('supermario', '123456789')

        expect(user).to.exist
        expect(user.id).to.be.a.string
        expect(user.id).to.have.lengthOf(24)
        expect(user.role).to.equal('regular')
    })

    it('fails on non-existing user', () =>
        expect(
            // pasa esto: (async () => (await authenticateUser('supermario', '123456789')))()
            authenticateUser('supermario', '123456789')
        ).to.be.rejectedWith(CredentialsError, 'wrong credentials')
    )

    after(() => db.disconnect())
})
