import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: null,
    message: '',
    transactions: [],
    transaction: {},
    isCreated: false,
    isUpdated: false,
}

//create transaction
export const createTransaction = createAsyncThunk(

    'transaction/create',
    async(payload, {getState, dispatch}) => {

        const {name, id, account, transactionType, amount, category, notes} = payload

        try {

            const token = getState()?.auth?.userAuth?.userInfo?.token

            const config = {

                headers: {

                    Authorization: `Bearer ${token}`
                }
            }

            const res = await axios.post(`${baseURL}/transactions`, {

                name,
                 account,
                 transactionType, 
                  amount, 
                  category, 
                  notes,
                  account: id

            }, config)

            if(res.statusText === 'OK') {

                toast.success('Transaction created successfully')

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

//update transaction
export const updateTransaction = createAsyncThunk(
    'transaction/update',
    async(payload, {getState, dispatch}) => {

        const {name, id, account, transactionType, amount, category, notes} = payload

        try {

            const token = getState()?.auth?.userAuth?.userInfo?.token

            const config = {

                headers: {

                    Authorization: `Bearer ${token}`
                }
            }

            const res = await axios.put(`${baseURL}/transactions/${id}`, {

                name,
                id,
                account,
                transactionType,
                amount,
                category,
                notes

            }, config)

            if(res.statusText === 'OK') {

                toast.success('Transaction updated successfully')

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

//get single transaction
export const getSingleTransaction = createAsyncThunk(
    'transaction/getSingle',
    async(id, {getState, dispatch}) => {

        try {

            const token = getState()?.auth?.userAuth?.userInfo?.token

            const config = {

                headers: {

                    Authorization: `Bearer ${token}`
                }
            }

            const res = await axios.get(`${baseURL}/transactions/${id}`, config)

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

const transactionSlice = createSlice({

    name: 'transaction',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(createTransaction.pending, (state) => {

           state.loading = true
        })

        builder.addCase(createTransaction.fulfilled, (state, action) => {

            state.loading = false
            state.isCreated = true
            state.transaction = action.payload
        })

        builder.addCase(createTransaction.rejected, (state, action) => {

            state.loading = false
            state.isCreated = false
            state.transaction = null
            state.error = action.payload
        })

        //update transaction
        builder.addCase(updateTransaction.pending, (state) => {

            state.loading = true
        })

        builder.addCase(updateTransaction.fulfilled, (state, action) => {

            state.loading = false
            state.transaction = action.payload
            state.isUpdated = true
        })

        builder.addCase(updateTransaction.rejected, (state, action) => {

            state.loading = false
            state.error = action.payload
            state.isUpdated = false
            state.transaction = null
        })

        //get single transaction
        builder.addCase(getSingleTransaction.pending, (state) => {

         state.loading = false
        })

        builder.addCase(getSingleTransaction.fulfilled, (state, action) => {

            state.loading = false
            state.transaction = action.payload
        })

        builder.addCase(getSingleTransaction.rejected, (state, action) => {

            state.loading = false
            state.error = action.payload
            state.transaction = null
        })
    }

})

const transactionReducer = transactionSlice.reducer

export default transactionReducer