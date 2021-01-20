import { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const DeleteAccount = () => {
    const userId = sessionStorage.getItem('userId')
    const [userDeleted, setUserDeleted] = useState(false)

    useEffect(() => {
        axios.put(`/user/${userId}`, { status: "Inactive" })
            .then((response) => {
                console.log("deactivated user")
                setTimeout(() => {
                    setUserDeleted(true)
                }, 2000)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }, [])

    if (userDeleted) {
        sessionStorage.clear()
        return <Redirect to={'/about'} />
    }

    return (
        <p>We are deleting your account. You will be redirected once done.</p>
    )
}

export default DeleteAccount