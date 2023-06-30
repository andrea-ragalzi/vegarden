import './../styles/main.scss'
const LoginPage = () => {
    return (
        <div>
            <h1 className="text-2xl text-dark dark:text-light">Welcome back to Vegarden!</h1>
            <h2 className="text-xl text-dark dark:text-light"> Log in and let's continue to make the vegan garden bloom together.</h2>
            <div className="flex items-center justify-between ">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="font-medium text-red-900 hover:text-yellow-100">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
