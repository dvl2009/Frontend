import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from 'aws-amplify'
const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { loading, error, data } = useQuery(queries.post.GET_ALL);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data.getAll);
  //   }
  // }, []);

  async function signIn(email, password) {
    try {
        const user = await Auth.signIn(email, password);
        return user;
    } catch (error) {
        console.log('error signing in', error);
    }
}

async function signUp(email, password) {
    try {
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                email
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

  return (
    <div className="main1">
      <section className="signup">
        <div className="container1">
          <div className="signup-content">
            <form className="signup-form" onSubmit={() => {signIn(email,password)}}>
              <h2 className="form-title">Login</h2>

              <div className="form-group">
                <label>
                  Enter your email
                  <br />
                  <input
                    className="form-input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></input>
                </label>
              </div>

              <div className="form-group">
                <label>
                  Enter your password
                  <br />
                  <input
                    className="form-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  ></input>
                </label>
              </div>
              <br />

              <button className="btn-lg btn-danger" type="submit">
                Log In
              </button>
            </form>
            <p className="loginhere">
              Don't have an account ?
              <Link
                to={`/signup`}
                className="loginhere-link"
                variant="contained"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;