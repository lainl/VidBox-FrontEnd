import styles from "./page.module.css";

export default function profile() {
  return (
    <>
        <div>
            <h2>Signup Page</h2>
        </div>
        <div>
            <form id="SignupForm">
                <h2> Signup!</h2>
                <label htmlFor="Email">Email:</label>
                <input type="text" id="emailInput" name="email" />
                <label htmlFor="Username">Username:</label>
                <input type="text" id="usernameInput" name="username" />
                <label htmlFor="Password">Password:</label>
                <input type="text" id="passwordInput" name="password" />
                <label htmlFor="PasswordV">Re-Enter Password:</label>
                <input type="text" id="passwordInputV" name="passwordV" />
                <button type="submit">Signup!</button>
            </form>
        </div>
    </>
  );
}