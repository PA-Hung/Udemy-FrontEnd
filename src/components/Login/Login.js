import './Login.scss'
import facebook from '../../assets/images/facebook.png'
const Login = (props) => {
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
                        <input className='Input-email form-control' type='text' placeholder='Email address or your phone number' />
                        <input className='Input-pass form-control' type='password' placeholder='Password' />
                        <button className='btLogin btn btn-primary'>Login</button>
                        <span className='text-center'><a className='forgot-pass' href='xxx'>Forgotten password?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button className='btCNAcc btn btn-success'>Create New Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Login