import SignUp from "./components/auth/signup/Signup";
import SignIn from "./components/auth/login/Login";
import PermanentDrawerLeft from "./components/sidebars/sidebar-left/SidebarLeft";
import PermanentDrawerRight from "./components/sidebars/sidebar-right/SidebarRight";
import StickyFooter from "./components/footer/StickyFooter";

function App() {
  return (
    <>
    <SignIn />
    <SignUp />
    <PermanentDrawerLeft />
    <PermanentDrawerRight />
    <StickyFooter />
    </>
    
  );
}

export default App;
