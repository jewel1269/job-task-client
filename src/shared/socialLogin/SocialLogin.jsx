import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SocialLogin = () => {
    const { googleLogin } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const handleGoogleSignIn = () => {
        
        googleLogin()
            .then(result => {
                console.log("google login successfully", result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log("user added by google", res.data);
                        navigate('/')
                    })
            })
    }

    return (
        <div className="my-2">
            <button
                onClick={handleGoogleSignIn}
                className="p-2 flex items-center gap-2 border-2 bg-green-600 rounded-2xl"
                aria-label="Sign in with Google"
            >
                <FaGoogle></FaGoogle>Google
            </button>
        </div>
    );
};

export default SocialLogin;