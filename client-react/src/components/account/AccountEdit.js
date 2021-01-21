import AccountDetailsForm from "./AccountDetailsForm";
import { useParams, Redirect } from "react-router-dom";

const AccountEdit = () => {
  const userId = sessionStorage.getItem("userId");

  const userIdParam = useParams().id;

  return (
    <>
      {userId === userIdParam ? (
        <div className="edit">
          <div style={{ margin: "10px 0 5px 30px" }}>
            <h1>Edit account</h1>
          </div>

          <AccountDetailsForm />
        </div>
      ) : (
        <Redirect to={"/restricted"} />
      )}
    </>
  );
};

export default AccountEdit;
