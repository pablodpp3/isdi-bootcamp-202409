import { useEffect, useState } from 'react'
import logic from '../logic'
import { Post, Footer } from './components'


export default function Favourites() {
    const [savedPosts, setSavedPosts] = useState([])

    const handleDeleteClick = () => {
        confirm('Delete post?', accepted => {
            if (accepted) {
                try {
                    logic.deletePost(id)
                        .then(onDeleted)
                        .catch(error => {
                            alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        })
    }
    useEffect(() => {
        try {
            logic.getSavedPosts()
                .then(posts => {
                    console.log('Post received in Favourites:', posts)
                    setSavedPosts(posts)
                })
                .catch(error => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [])

    return (
        <div className="min-h-screen pt-16 pb-12 bg-white dark:bg-black text-black dark:text-white">
            <h2 className="text-2xl mb-4"> Favourites </h2>

            {savedPosts.length === 0 && <p>No post saved.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedPosts.map(post => (
                    <Post
                    key={post.id}
                    post={post}
                    onUnsaved={() => {
                      logic.removeFromFavourites(post.id)
                        .then(() => {
                          setSavedPosts(prev => prev.filter(p => p.id !== post.id))
                        })
                        .catch(error => {
                          alert(error.message)
                          console.error(error)
                        })
                    }}
                  />
                  
                ))}
                
            </div>
            <Footer />
        </div>
    )
}
