import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slice/userSlice";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

        const Register = () => {

            const dispatch = useDispatch()
            const navigate = useNavigate()

            const authUser = useSelector(state => state.auth)
            const {loading, userAuth} = authUser

            const [formData, setFormData] = useState({

                fullname: '',
                email: '',
                password: ''
            })

            const {fullname, email, password} = formData

            const handleChange = (event) => {

                setFormData({...formData, [event.target.name]: event.target.value})
            }

            const submitHandler = (event) => {
                event.preventDefault()
                if(!email || !password) {

                    return toast.error('Please enter a valid email and password')
                 }
              
                 if(password.length < 6) {
              
                  return toast.error('Please enter at least 6 characters')
               }
                dispatch(registerUser(formData))
                navigate('/dashboard')
            }

           return(
            <section class="min-h-screen flex flex-col">

           { loading && <Loading />  }

            <div class="flex flex-1 items-center justify-center">
                <div class="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
                    <form onSubmit={submitHandler} class="text-center">
                        <h1 class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                            Register
                        </h1>

                        <div class="py-2 text-left">
                            <input type="text" name="fullname" value={fullname} onChange={handleChange} class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Full Name" />
                        </div>

                        <div class="py-2 text-left">
                            <input type="email" name="email" value={email} onChange={handleChange}  class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Email" />
                        </div>
                        <div class="py-2 text-left">
                            <input type="password" name="password" value={password} onChange={handleChange}   class="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 " placeholder="Password" />
                        </div>
                        <div class="py-2">
                            <button type="submit" class="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700">
                                Register
                            </button>
                        </div>
                    </form>
                    <div class="text-center">
                        <a href="#" class="hover:underline">Forgot password?</a>
                    </div>
                    <div class="text-center mt-12">
                        <span>
                            Already have an account?  Please
                        </span>
                        <Link to='/login' class="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800">Login</Link>
                    </div>
                </div>
            </div>
        </section>
  )
}


export default Register;
