import './Register.scss'
import facebook from '../../assets/images/facebook.png'
import { useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/apiService';
import { UserContext } from '../../context/UserContext';

const Register = (props) => {
    const { user } = useContext(UserContext)
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login");
    }

    // Hiển thị biểu tượng chấm thang ở các ô input, mặc định dc set là true
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }

    const [ojbCheckInput, setOjbCheckInput] = useState(defaultValidInput)

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const isValidInputs = () => {
        setOjbCheckInput(defaultValidInput);

        if (!email) {
            toast.error('Email is required')
            setOjbCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error('Invalid email')
            setOjbCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        if (!phone) {
            toast.error('Phone is required')
            setOjbCheckInput({ ...defaultValidInput, isValidPhone: false })
            return false
        }
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneno.test(phone)) {
            toast.error('Invalid phone number')
            setOjbCheckInput({ ...defaultValidInput, isValidPhone: false })
            return false
        }
        if (!username) {
            toast.error('Username is required')
            setOjbCheckInput({ ...defaultValidInput, isValidUsername: false })
            return false
        }
        if (!pass) {
            toast.error('Password is required')
            setOjbCheckInput({ ...defaultValidInput, isValidPassword: false })
            return false
        }
        // let regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
        // if (!regexPass.test(pass)) {
        //     toast.error('Password quá đơn giản')
        //     setOjbCheckInput({ ...defaultValidInput, isValidPassword: false })
        //     return false
        // }
        if (pass !== confirmPass) {
            toast.error('Password is not the same')
            setOjbCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            return false
        }

        return true
    }

    const handleRegister = async () => {
        let check = isValidInputs()
        if (check === true) {
            let dataFromBackEnd = await registerNewUser(email, phone, username, pass)
            //console.log('>>>>>', dataFromBackEnd)
            if (+dataFromBackEnd.EC === 0) {
                toast('🦄 Wow so easy create new user!',
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",

                    }, dataFromBackEnd.EM);
                history.push("/login");
            } else {
                //console.log('>>>>> check data:', dataFromBackEnd.DT)
                if (dataFromBackEnd.DT === 'email') {
                    setOjbCheckInput({ ...defaultValidInput, isValidEmail: false })
                }
                if (dataFromBackEnd.DT === 'phone') {
                    setOjbCheckInput({ ...defaultValidInput, isValidPhone: false })
                }
                toast.error(dataFromBackEnd.EM)
            }

            // setEmail("")
            // setPhone("")
            // setUsername("")
            // setPass("")
            // setConfirmPass("")

        }

    }
    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/')
        }
    }, [])

    return (
        <div className="register-container">
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
                            className={ojbCheckInput.isValidEmail ? 'Input-email form-control' : 'Input-email form-control is-invalid'}
                            type='text' placeholder='Email address'
                            value={email} onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            className={ojbCheckInput.isValidPhone ? 'Input-phone form-control' : 'Input-phone form-control is-invalid'}
                            type='text' placeholder='Phone number'
                            value={phone} onChange={(event) => setPhone(event.target.value)}
                        />
                        <input
                            className={ojbCheckInput.isValidUsername ? 'Input-username form-control' : 'Input-username form-control is-invalid'}
                            type='text' placeholder='User name'
                            value={username} onChange={(event) => setUsername(event.target.value)}
                        />
                        <input
                            className={ojbCheckInput.isValidPassword ? 'Input-pass form-control' : 'Input-pass form-control is-invalid'}
                            type='password' placeholder='Password'
                            value={pass} onChange={(event) => setPass(event.target.value)}
                        />
                        <input
                            className={ojbCheckInput.isValidConfirmPassword ? 'Input-pass form-control' : 'Input-pass form-control is-invalid'}
                            type='password' placeholder='Re-enter Password'
                            value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)}
                        />

                        <button
                            className='btLogin btn btn-primary'
                            onClick={() => handleRegister()}
                        >Register</button>
                        <span className='text-center'><a className='forgot-pass' href='xxx'>Forgotten password?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button className='btLogin btn btn-success'
                                onClick={() => handleLogin()}>Already have account? Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Register