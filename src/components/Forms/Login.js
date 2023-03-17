import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/slice/userSlice";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const authUser = useSelector(state => state.auth)
    const { loading, userAuth } = authUser

   const [formData, setFormData] = useState({

    email: '',
    password: '',
   })

   const {email, password} = formData

   const handleChange = (event) => {

    setFormData({...formData, [event.target.name]: event.target.value})
   }

   const handleSubmit = (event) => {
    event.preventDefault()
    if(!email || !password) {

      return toast.error('Please enter a valid email and password')
   }

   if(password.length < 6) {

    return toast.error('Please enter at least 6 characters')
 }

    dispatch(loginUser(formData))
    navigate('/dashboard')
   }

  return (
    <section class="min-h-screen flex flex-col">

      <div class="flex flex-1 items-center justify-center">
        <div class="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
          <form onSubmit={handleSubmit} class="text-center">
            <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
              Login
            </h1>
            { loading && <Loading />  }
            <div class="py-2 text-left">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                placeholder="Email"
              />
            </div>
            <div class="py-2 text-left">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                placeholder="Password"
              />
            </div>
            <div class="py-2">
              <button
                type="submit"
                class="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700"
              >
                Login
              </button>
            </div>
          </form>
          <div class="text-center">
            <a href="#" class="hover:underline">
              Forgot password?
            </a>
          </div>
          <div class="text-center mt-12">
            <span>Don't have an account?</span>
            <Link
              to="/register"
              class="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Login;
