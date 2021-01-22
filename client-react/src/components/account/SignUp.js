import AccountDetailsForm from './AccountDetailsForm'
const SignUp = (props) => {
    return (
        <>
            <h1>Create a new account</h1>
            <AccountDetailsForm setLoggedIn={props.setLoggedIn} />
        </>
    )
}

export default SignUp;