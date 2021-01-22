import AccountDetailsForm from "./AccountDetailsForm";
import "./style.css";

const SignUp = (props) => {
  return (
    <div className="signupForm">
      <div style={{ width: "85%", margin: "5px auto" }}>
        <h1>Create a new account</h1>
      </div>
      <AccountDetailsForm setLoggedIn={props.setLoggedIn}/>
    </div>
  );
};


export default SignUp;
