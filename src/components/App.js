import {useState} from "react";
import Approuter from "components/Router";
import {authService} from "fbase";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // user의 로그인 여부 판별
  return (
    <>
    <Approuter isLoggedIn={isLoggedIn}/>
    <footer>&copy;chae {new Date().getFullYear()}</footer>
    </>
    
  );
}

export default App;
