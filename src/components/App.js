import { useState, useEffect } from "react";
import Approuter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        // setUserObj(user);  //user의 크기가 커서 구체화
        setUserObj({
          //firebase의 특정 부분만을 가져와서 react로 연결
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        
      } else {
        setUserObj(null);
        //   setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
    });
  };
  return (
    <>
      {init ? (
        // <Approuter isLoggedIn={isLoggedIn} userObj={userObj} />
        <Approuter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <footer>&copy;chae {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
