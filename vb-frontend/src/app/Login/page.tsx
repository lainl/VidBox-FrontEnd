import styles from "./page.module.css";

export default function profile() {
  return (
    <>
        <div>
            <h2>Login Page</h2>
        </div>
        <div>
            <form id="LoginForm">
                <h2> Login!</h2>
                <label htmlFor="Username">Username:</label>
                <input type="text" id="usernameInput" name="username" />
                <label htmlFor="Password">Password:</label>
                <input type="text" id="passwordInput" name="password" />
                <button type="submit">Login</button>
                <a id="signupLink" href="/Signup" style={{ color: 'blue' }}>Dont have an account? Sign-up now!</a>
            </form>
        </div>
    </>
  );
}