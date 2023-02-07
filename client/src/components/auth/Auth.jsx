import SignUp from "./signup/Signup";
import SignIn from "./login/Login";
import { CssBaseline } from "@mui/material";

const Auth = ({updateToken, token}) => {
    return ( 
        <>
        <CssBaseline/>
        <SignIn updateToken={updateToken}/>
        <SignUp updateToken={updateToken}/>
        </>
     );
}
 
export default Auth;