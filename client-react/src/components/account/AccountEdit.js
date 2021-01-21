import AccountDetailsForm from './AccountDetailsForm'
import { useParams, Redirect } from 'react-router-dom'

const AccountEdit = () => {
    const userId = sessionStorage.getItem('userId')

    const userIdParam = useParams().id

    return (
        <>
            {userId === userIdParam ?
                <>
                    <h1>Edit account</h1>
                    <AccountDetailsForm />
                </>
                :
                <Redirect to={'/restricted'} />
            }
        </>
    )
}

export default AccountEdit;