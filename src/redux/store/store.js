import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import accountReducer from "../slice/accountSlice";
import transactionReducer from "../slice/transactionSlice";

const store = configureStore({

   reducer: {

    auth: userReducer,
    account: accountReducer,
    transaction: transactionReducer
   }
})

export default store