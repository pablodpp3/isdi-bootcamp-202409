import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default function removeFavoritePost(userId, postId) {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const index = user.favorites.findIndex(favId => favId.equals(postId))

            if (index === -1) throw new NotFoundError('post not in favorites')

            user.favorites.splice(index, 1)

            return user.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => {})
}
