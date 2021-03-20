import React from "react";
import "./Auth.css";

const Auth = () => {
  const emailEl = React.useRef(null);
  const passwordEl = React.useRef(null);
  const [isLoginForm, setIsLoginForm] = React.useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;
    if (email.trim().lenght === 0 || password.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
            query {
                login(email:"${email}", password: "${password}"){
                    userId
                    token
                    tokenExpiration
                }
            }
        `,
    };
    if (!isLoginForm) {
      requestBody = {
        query: `
                  mutation {
                      createUser(userInput: {email: "${email}", password: "${password}"}){
                          _id
                          email
                      }
                  }
              `,
      };
    }

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (![200, 201].includes(res.status)) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log("USER CREATION FAILED");
        console.log(err);
        // throw err;
      });
  };

  const switchModeHandler = () => {
    setIsLoginForm(!isLoginForm);
  };
  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModeHandler}>
          Switch to {isLoginForm ? "SIGNUP" : "LOGIN"}
        </button>
      </div>
    </form>
  );
};

export default Auth;
