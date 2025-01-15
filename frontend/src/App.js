import "./styles/global.scss";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import PasswordResetPage from "./pages/PasswordReset/PasswordResetPage";
import {Link, Route, Routes} from "react-router-dom";

function App() {
  return (
      <>
          <nav>
              <ul>
                  <li>
                      <Link to={"/signup"}>회원가입</Link>
                  </li>
                  <li>
                      <Link to={"/login"}>로그인</Link>
                  </li>
                  <li>
                      <Link to={"/password-reset"}>비밀번호 재설정</Link>
                  </li>
              </ul>
          </nav>

          <Routes>
              <Route path={"/signup"} element={<SignUpPage/>}/>
              <Route path={"/login"} element={<LoginPage/>}/>
              <Route path={"/password-reset"} element={<PasswordResetPage/>}/>
          </Routes>
      </>
  );
}

export default App;
