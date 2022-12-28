import './Login.scss'
import facebook from '../../assets/images/facebook.png'
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/apiService'


const Login = (props) => {
    let history = useHistory();

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            history.push("/");
            window.location.reload();
        }
    }, [])

    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')

    const defaultObjValidInput = {
        isValidLogin: true,
        isValidPass: true
    }
    const [objValidInput, SetObjValidInput] = useState(defaultObjValidInput)

    const handleLogin = async () => {
        SetObjValidInput(defaultObjValidInput)
        if (!valueLogin) {
            toast.error('Hãy nhập email hoặc số điện thoại của bạn')
            SetObjValidInput({ ...defaultObjValidInput, isValidLogin: false })
            return false
        }
        if (!password) {
            toast.error('Hãy nhập mật khẩu của bạn')
            SetObjValidInput({ ...defaultObjValidInput, isValidPass: false })
            return false
        }
        let response = await loginUser(valueLogin, password)
        if (response && +response.EC === 0) {
            let data = {
                isAuthenticated: true,
                toke: 'faketoken'
            }
            sessionStorage.setItem("account", JSON.stringify(data));
            history.push("/users");
            //window.location.reload();
            // redux
        }
        if (response && +response.EC !== 0) {
            toast.error(response.EM)
        }

    }

    const handleKeyPressLogin = (event) => {
        if (event.code === "Enter") {
            handleLogin()
        }
    }

    const handleCreateNewAccount = () => {
        history.push("/register");
    }

    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0 justify-content-center">

                    <div className="content-left col-12 d-none col-md-7 d-md-block">
                        {/* Mặc định col 12 và sẽ ẩn, chỉ hiện khi size md ≥768px và hiện 7 col */}
                        <div className='facebook-left'>
                            <img className='logo-web' src={facebook} alt="logo-web" />
                        </div>
                        <div className='slogan'>
                            Facebook helps you connect and share with the people in your life.
                        </div>
                    </div>

                    <div className="content-right d-flex flex-column gap-3 py-3 col-12 col-md-5 col-xl-4">
                        {/* Mặc định col 12, khi size md ≥768px và hiện 5 col, 
                        khi size ≥1200px hiện 4 col, khi size ≥1400px hiện 3 col */}
                        <div className='facebook-right d-md-none'>
                            <img className='logo-mobi' src={facebook} alt="logo-mobi" />
                        </div>
                        <input
                            className={
                                objValidInput.isValidLogin ?
                                    'Input-email form-control' :
                                    'Input-email form-control is-invalid'
                            } type='text'
                            placeholder='Email address or your phone number'
                            value={valueLogin}
                            onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input
                            className={
                                objValidInput.isValidPass ?
                                    'Input-pass form-control' :
                                    'Input-pass form-control is-invalid'
                            } type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handleKeyPressLogin(event)}
                        />
                        <button
                            className='btLogin btn btn-primary'
                            onClick={() => handleLogin()}
                        >Login</button>
                        <span className='text-center'>
                            <a className='forgot-pass' href='xxx'>Forgotten password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btCNAcc btn btn-success'
                                onClick={() => handleCreateNewAccount()}>Create New Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Login