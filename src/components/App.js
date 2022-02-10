import { useState, useEffect } from "react";
import Approuter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // user의 로그인 여부 판별
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <Approuter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy;chae {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
