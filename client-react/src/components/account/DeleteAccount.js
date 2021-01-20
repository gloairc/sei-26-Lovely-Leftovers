import { useParams, useEffect } from 'react'
import axios from 'axios'

const DeleteAccount = () => {
    const userId = useParams().id

    useEffect(() => {
        axios.delete(`/user/${userId}`)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }, [])

    return (
        <p>You account has been deleted.</p>
    )
}

export default DeleteAccount