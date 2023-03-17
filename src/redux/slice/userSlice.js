import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    message: '',
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,

    }
}

//register
export const registerUser = createAsyncThunk(
    'user/register',
    async({fullname, email, password}, {rejectWithValue, getState, dispatch}) => {

        try {

            const config =  {

                headers: {

                    "Content-Type": "application/json"
                }
            }

            const res = await axios.post(`${baseURL}/users/register`, {

                fullname,
                email,
                password

            }, config)

            if(res.statusText === 'OK') {

                toast.success('User successfully registered')
            }

            return res.data
            
        } catch (error) {

            //return rejectWithValue(error.response.data.message)
            const message = (

                error.response && error.response.data && 
                error.response.data.message ) || error.message ||
                error.toString()
    
                toast.error(message)
            
        }


    }
)

//login user
export const loginUser = createAsyncThunk(
    'user/login',
    async({ email, password}, {rejectWithValue, getState, dispatch}) => {

        try {

            const config =  {

                headers: {

                    "Content-Type": "application/json"
                }
            }

            const res = await axios.post(`${baseURL}/users/login`, {

                email,
                password

            }, config)

            if(res.statusText === 'OK') {

                toast.success('User successfully LoggedIn')
            }

            localStorage.setItem('userInfo', JSON.stringify(res.data))

            return res.data
            
        } catch (error) {

            //return rejectWithValue(error.response.data.message)

            const message = (

                error.response && error.response.data && 
                error.response.data.message ) || error.message ||
                error.toString()
    
                toast.error(message)
            
        }


    }
)

//logout user
export const logoutUser = createAsyncThunk(
    'user/logout',
    async() => {

      //remove user from local storage
      localStorage.removeItem('userInfo')
      return null
    }
)


//user profile
export const userProfile = createAsyncThunk(
    'user/profile',
    async(payload, {rejectWithValue, getState, dispatch}) => {

        try {

            const token = getState()?.auth?.userAuth?.userInfo?.token

            const config = {

                headers: {

                    'Authorization': `Bearer ${token}`
                }
            }

            const res = await axios.get(`${baseURL}/users/profile`, config)
            return res.data
            
        } catch (error) {

            //return rejectWithValue(error.response.data)

            const message = (

                error.response && error.response.data && 
                error.response.data.message ) || error.message ||
                error.toString()
    
                toast.error(message)
            
        }
    }
)

//user slice
const userSlice = createSlice({

    name: 'users',
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        //register user
        builder.addCase(registerUser.pending, (state) => {

            state.loading = true
        })

        builder.addCase(registerUser.fulfilled, (state, action) => {

            state.loading = false
            state.userAuth.userInfo = action.payload
        })

        builder.addCase(registerUser.rejected, (state, action) => {

            state.loading = false
            state.userAuth.error = action.payload
        })

        //login user
        builder.addCase(loginUser.pending, (state) => {

            state.loading = true
        })

        builder.addCase(loginUser.fulfilled, (state, action) => {

            state.loading = false
            state.userAuth.userInfo = action.payload
        })

        builder.addCase(loginUser.rejected, (state, action) => {

            state.loading = false
            state.userAuth.error = action.payload
        })

        //logout user
        builder.addCase(logoutUser.pending, (state) => {

            state.loading = true
        })

        builder.addCase(logoutUser.fulfilled, (state, action) => {

            state.loading = false
            state.userAuth.userInfo = null

        })

        builder.addCase(logoutUser.rejected, (state, action) => {

            state.loading = false
            state.userAuth.error = action.payload
        })

        //user profile
        builder.addCase(userProfile.pending, (state) => {

            state.loading = true
        })

        builder.addCase(userProfile.fulfilled, (state, action) => {

            state.loading = false
            state.profile = action.payload
        })

        builder.addCase(userProfile.rejected, (state, action) => {

            state.loading = false
            state.userAuth.error = action.payload
            state.profile = ""
        })
    }
})

const userReducer =  userSlice.reducer

export default userReducer