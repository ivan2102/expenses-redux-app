import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProjectAccount } from "../../redux/slice/accountSlice";
import Loading from "../Loading/Loading";


const AddAccount = () => {
  const [account, setAccount] = useState({
    name: "",
    initialBalance: "",
    notes: "",
    accountType: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const accountSlice = useSelector(state => state.account)
  const { loading, error} = accountSlice

  //---Destructuring---
  const { name, initialBalance, notes, accountType } = account;
  //---onchange handler----
 const handleChange = (event) => {

  setAccount({...account, [event.target.name]: event.target.value})
 }
  //---onsubmit handler----
  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(createProjectAccount(account))
    navigate('/dashboard')
    
  };
  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <h2 className="mb-4 text-4xl md:text-5xl text-center font-bold font-heading tracking-px-n leading-tight">
            Add New Account
          </h2>
          {loading && <Loading />}
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            Create an account(Project) to start tracking your transactions
          </p>

            {/* error */}
            {error && <p className="mb-3 font-medium text-lg text-red-600 leading-normal">
            { error }
          </p>}

          <form onSubmit={handlerSubmit}>
            <label className="block mb-5">
              <input
                value={name}
                onChange={handleChange}
                name="name"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-1"
                type="text"
                placeholder="Enter Name"
              />
            </label>
            <label className="block mb-5">
              <input
                value={initialBalance}
                onChange={handleChange}
                name="initialBalance"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-2"
                type="text"
                placeholder="Enter Amount"
              />
            </label>

            <label className="block mb-5">
              <select
                value={accountType}
                onChange={handleChange}
                name="accountType"
                class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option>-- Select Account Type --</option>
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
                <option value="Checking">Checking</option>
                <option value="Credit Card">Credit Card</option>
                <option value="School">School</option>
                <option value="Project">Project</option>
                <option value="Utilities">Utilities</option>
                <option value="Travel">Travel</option>
                <option value="Groceries">Groceries</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Personal">Personal</option>
                <option value="Loan">Loan</option>
                <option value="Cash Flow">Cash Flow</option>
                <option value="Education">Education</option>
                <option value="Uncategorized">Uncategorized</option>
              </select>
            </label>

            <div>
              <div className="mt-3 mb-3">
                <textarea
                  onChange={handleChange}
                  value={notes}
                  placeholder="Add Notes"
                  rows={4}
                  name="notes"
                  id="comment"
                  className="block p-2  w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
            >
              Create Account
            </button>
            {/* <p className="font-medium">
              <span>Already have an account?</span>
              <a className="text-indigo-600 hover:text-indigo-700" href="#">
                Back To Account
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddAccount;
