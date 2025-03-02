import { useState } from "react";
import { raleway } from "@/fonts/font";
import "./styles.css";
import Cookies from "js-cookie";

export function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Monitor");
    var uname = !isLogin ? document.getElementById("user-already-exists") : null;

    const focused = () => {
        if (!isLogin && uname != null)
            uname.style.display = 'none';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLogin) {
            if (email.length > 0 && username.length > 0 && password.length > 0) {
                const resp = await fetch("/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ sql: `INSERT INTO USERS VALUES('${email}','${username}','${password}','${role}');` })
                })
                const data = await resp.json();
                if ("error" != Object.keys(data)[0]) {
                    Cookies.set("username", username, { expires: 30 });
                    Cookies.set("role", role, { expires: 30 });
                    window.location.reload();
                } else {
                    if (uname != null)
                        uname.style.display = 'block';
                }
            }
        } else {
            if (username.length > 0 && password.length > 0) {
                const resp = await fetch("/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ sql: `SELECT * FROM USERS WHERE username = '${username}';` })
                });
                const data = await resp.json();
                if (data.data.length > 0) {
                    if (username == data.data[0].username && password == data.data[0].password) {
                        Cookies.set("username", username, { expires: 30 });
                        Cookies.set("role", data.data[0].role, { expires: 30 });
                        window.location.reload();
                    } else {
                        alert("Incorrect username or password!");
                    }
                } else {
                    alert("User Not registered...");
                }
            }

        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2 className={`${raleway.className}`} >TWI.m</h2>
                <p className="subtitle">Track your hydration effortlessly</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="name"
                        placeholder="Enter your username..."
                        onFocus={focused}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {!isLogin ? <p id="user-already-exists">Username alreasy exists...</p> : null}
                    {!isLogin ?
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /> : null}
                    <input
                        type="password"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {!isLogin ?
                        <div className="role-selector">
                            Select Your Role
                            <div className="radio-group">
                                <label className={role === "Monitor" ? "selected" : ""}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Monitor"
                                        checked={role === "Monitor"}
                                        onChange={() => setRole("Monitor")}
                                    />
                                    <span className="custom-radio"></span>
                                    Monitor
                                </label>

                                <label className={role === "Recorder" ? "selected" : ""}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Recorder"
                                        checked={role === "Recorder"}
                                        onChange={() => setRole("Recorder")}
                                    />
                                    <span className="custom-radio"></span>
                                    Recorder
                                </label>
                            </div>
                        </div> : null}
                    <br />
                    <button type="submit">{isLogin ? "Login" : "Sign In"}</button>
                </form>

                <p className="register-link">
                    {isLogin ? "Don't" : "Already"} have an account? <a style={{ cursor: 'pointer' }} onClick={() => { setIsLogin(!isLogin); uname = document.getElementById("user-already-exists"); }}>{isLogin ? "Sign Up" : "Login"}</a>
                </p>
            </div>
        </div>
    );
}
