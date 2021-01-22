import { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'

const DeleteAccount = (props) => {
    const userId = sessionStorage.getItem('userId')
    const [userDeleted, setUserDeleted] = useState(false)

    const userIdParam = useParams().id

    useEffect(() => {
        if (userId === userIdParam) {
            axios.put(`/user/${userId}`, { status: "Inactive" })
                .then((response) => {
                    console.log("deactivated user")
                    sessionStorage.clear()
                    setTimeout(() => {
                        setUserDeleted(true)
                        props.setLoggedIn(false)
                    }, 2000)
                })
                .catch((error) => {
                    console.log('error', error)
                })
        }
    }, [])

    if (userDeleted) {
        return <Redirect to={'/about'} />
    }

    return (
        <>
            {userId === userIdParam ?
                <p> We are deleting your account. You will be redirected once done.</p>
                :
                <Redirect to={'/restricted'} />}
        </>
    )
}

export default DeleteAccount