import { useState } from 'react'

import Input from './Input'
import { OpenedEyeIcon, ClosedEyeIcon } from '../icons'

export default function PasswordInput({ id }) {
    const [status, setStatus] = useState(<ClosedEyeIcon />)
    const [type, setType] = useState('password')

    const handleToggleClick = () => {
        setStatus(status === (<ClosedEyeIcon />) ? (<OpenedEyeIcon />) : (<ClosedEyeIcon />))
        setType(type === 'password' ? 'text' : 'password')
    }

        return <div style={{ display: 'flex' }}>
            <Input type={type} id={id} />
            <span 
                style={{ cursor: 'pointer', position: 'absolute', right: '10px' }}
                onClick={handleToggleClick}
            >{status}</span>
        </div>
}