import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../shared/socialLogin/SocialLogin";
import { Helmet } from 'react-helmet-async';


const SignIn = () => {
    const { loginUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    // console.log("user login for items",location.state);

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userInfo = { email, password }
        console.log(userInfo);
        loginUser(email, password)
            .then((result) => {
                console.log(result.user);
                navigate(from, { replace: true })
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Best Outfit | Sign In</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <small>New here <Link className="text-base font-medium text-indigo-700" to={'/sign-up'}>Create an account</Link></small>
                    </form>
                    <div className="border-2 border-green-400 my-3"></div>
                        <div className="flex justify-center">
                            <SocialLogin/>
                        </div>
                    
                </div>
                <div className="text-center w-1/2 lg:text-left">
                    <input type="submit" className="text-5xl font-bold" value="login" />
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;