import { User, Provider } from '../data/models.js'

import { validate, errors } from '../../com/index.js'

const { NotFoundError, SystemError } = errors

export default (userId, query, distance, coords) => {
    validate.id(userId, 'userId')
    validate.string(query, 'query')
    validate.number(distance, 'distance')
    validate.array(coords, 'coords')
    validate.number(coords[0], 'longitude')
    validate.number(coords[1], 'latitude')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Provider.find({
                $or: [{ name: new RegExp(query, 'i') }, { tags: { $regex: new RegExp(query, 'i') } }],
                location: {
                    $near: {
                        $geometry: { type: 'Point', coordinates: coords },
                        $maxDistance: 1000 * distance
                    }
                }
            }, { __v: 0 }).sort({ name: 1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(Provider => Provider.map(healthCareProvider => {
                    Provider.id = Provider._id.toString()
                    Provider.location.id = Provider.location._id.toString()
                    delete Provider._id
                    delete Provider.location._id

                    return healthCareProvider
                })
                )
        })
}