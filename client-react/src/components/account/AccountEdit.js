import AccountDetailsForm from './AccountDetailsForm'

const AccountEdit = (props) => {

    return (
        <>
            {props.user ?
                <div>
                    <h1>Edit account</h1>
                    <AccountDetailsForm user={props.user} />
                </div>
                :
                <h1>You need to log in</h1>}
        </>
    )
}

export default AccountEdit;