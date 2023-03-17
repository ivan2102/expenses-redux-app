import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import {toast} from 'react-toastify';

const initialState = {

    loading: false,
    error: null,
    message: '',
    account: {},
    accounts: [],
    success: false,
    isUpdated: false
}


export const createProjectAccount = createAsyncThunk(
    'account/create',
    async(payload, {getState, dispatch}) => {

       try {

        const token = getState()?.auth?.userAuth?.userInfo?.token

        const config = {

            headers: {

                Authorization: `Bearer ${token}`
            }
        }

        const res = await axios.post(`${baseURL}/accounts`,{
            name: payload.name,
            accountType: payload.accountType,
            initialBalance: payload.initialBalance,
            notes: payload.notes

         },
            
        config)

        if(res.statusText === 'OK') {

            toast.success('Account successfully created')
        }

        return res.data
        
       } catch (error) {

        const message = (

            error.response && error.response.data && 
            error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
       }
    }
)

//detail project account
export const detailProjectAccount = createAsyncThunk(
    'account/detail',
    async(id, {getState, dispatch}) => {

        try {

            const token = getState()?.auth?.userAuth?.userInfo?.token

            const config = {

                headers: {

                    'Authorization': `Bearer ${token}`
                }
            }

            const res = await axios.get(`${baseURL}/accounts/${id}`, config)

            return res.data
            
        } catch (error) {

            const message = (

                error.response && error.response.data && 
                error.response.data.message ) || error.message ||
                error.toString()
    
                toast.error(message)
            
        }
    }
)

//update project account
export const updateProjectAccount = createAsyncThunk(
    'account/update',
    async(payload, { getState, dispatch }) => {

        const {name, id, initialBalance, notes, accountType} = payload

         try {

            const token = getState()?.auth?.userAuth?.userInfo?.token

            const config = {

                headers: {

                    Authorization: `Bearer ${token}`
                }
            }

            const res = await axios.put(`${baseURL}/accounts/${id}`, {

                name,
                id,
                initialBalance,
                notes,
                accountType

            }, config)

            if(res.statusText === 'OK') {

                toast.success('Account successfully updated')
            }

            return res.data
            
         } catch (error) {

            const message = (

                error.response && error.response.data && 
                error.response.data.message ) || error.message ||
                error.toString()
    
                toast.error(message)
            
         }
    }
)

const accountSlice = createSlice({

    name: "acount",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(createProjectAccount.pending, (state) => {

            state.loading = true
        })

        builder.addCase(createProjectAccount.fulfilled, (state,action) => {

            state.loading = false
            state.success = true
            state.account = action.payload
        })

        builder.addCase(createProjectAccount.rejected, (state, action) => {

            state.loading = false
            state.success = false
            state.account = null
            state.error = action.payload
        })
       
        //single account
        builder.addCase(detailProjectAccount.pending, (state) => {

            state.loading = true
        })

        builder.addCase(detailProjectAccount.fulfilled, (state, action) => {

            state.loading = false
            state.success = true
            state.account = action.payload
        })

        builder.addCase(detailProjectAccount.rejected, (state, action) => {

            state.loading = false
            state.success = false
            state.account = null
            state.error = action.payload
        })

        //update project account
        builder.addCase(updateProjectAccount.pending, (state) => {

            state.loading = true
        })

        builder.addCase(updateProjectAccount.fulfilled, (state, action) => {

            state.loading = false
            state.message = action.payload
            state.success = true
            state.account = action.payload
            state.isUpdated = true
        })

        builder.addCase(updateProjectAccount.rejected, (state, action) => {

            state.loading = false
            state.success = false
            state.isUpdated = false
            state.error = action.payload
        })

    }

})

const accountReducer = accountSlice.reducer
export default accountReducer;