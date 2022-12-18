import axios from "axios"

const registerNewUser = async (email, phone, username, pass) => {
    return await axios.post('http://localhost:6969/api/v1/register', {
        email, phone, username, pass
    })
}

const loginUser = async (valueLogin, password) => {
    return await axios.post('http://localhost:6969/api/v1/login', {
        valueLogin, password
    })
}

export { registerNewUser, loginUser }