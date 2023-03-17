import React, { useEffect } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/slice/userSlice";
import Loading from "../Loading/Loading";
import { toast } from 'react-toastify';

const MainDashBoard = () => {

const dispatch = useDispatch()
const authUser = useSelector(state => state.auth)
const { profile, loading, error } = authUser

useEffect(() => {

dispatch(userProfile())
}, [dispatch])

  return (
    <>
    {loading && <Loading /> ? toast.error :
     <>
    <AccountSummary profile={profile} />
      <AccountList profile={profile} />
      </>
     }
      
    </>
  );
};

export default MainDashBoard;
