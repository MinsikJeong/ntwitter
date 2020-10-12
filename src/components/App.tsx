import React from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {

  const [init, setInit] = React.useState(false); // firebase 초기화
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userObj, setUserObj] = React.useState<any>();

  React.useEffect(() => { // firebase 로그인 감지
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Ntwitter</footer>
    </>
  );
}

export default App;
