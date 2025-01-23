import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logic from '../../logic'
import useContext from '../useContext'

export default function Header({ onHomeClick, onLoggedOut }) {
    const [name, setName] = useState(null)
    const [showMenu, setShowMenu] = useState(false)
    const location = useLocation()
    const { alert, confirm } = useContext()

    useEffect(() => {
        console.log('Header -> componentDidMount & componentWillReceiveProps')

        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then(setName)
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
        } else setName(null)
    }, [location.pathname])

    const handleHomeClick = event => {
        event.preventDefault()
        onHomeClick()
    }

    const handleLogout = () => {
        confirm('Logout?', accepted => {
            if (accepted) {
                logic.logoutUser()
                onLoggedOut()
            }
        }, 'warn')
    }

    const handleLoginClick = () => {
        alert('Redirect to login (functionality pending)')
    }

    console.log('Header -> render')
}

export { Header }
