import { LogIn } from "../api-adapter"

async function login(event) {
    event.preventDefault()
    console.log("hello we made it")
        const username = event.target[0].value;
        const password = event.target[1].value;
        const {token} = await LogIn(username, password);
        console.log(token)
        localStorage.removeItem("token");
        localStorage.setItem("token", token)
}

export default login;