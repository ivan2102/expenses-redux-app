import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTransaction, getSingleTransaction } from "../../redux/slice/transactionSlice";
import Loading from "../Loading/Loading";

const EditTransaction = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const { id } = useParams()

const transactionSlice = useSelector(state => state?.transaction)
const {transaction: transactionState, loading, error, isUpdated} = transactionSlice

  const [transaction, setTransaction] = useState({
    name: transactionState?.data?.name,
    amount: transactionState?.data?.amount,
    transactionType: transactionState?.data?.transactionType,
    category: transactionState?.data?.category,
    notes: transactionState?.data?.notes
  });

  
  
  const { name, amount, transactionType, category, notes } = transaction;
  //---onchange handler----
  const handleChange = (event) => {

    setTransaction({...transaction, [event.target.name]: event.target.value})
  }

  //---onsubmit handler----
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateTransaction({ ...transaction, id }))
  };

  useEffect(() => {

    dispatch(getSingleTransaction(id))
  }, [dispatch, id])

useEffect(() => {

  setTimeout(() => {

if(isUpdated) {

  navigate('/dashboard')
  window.location.reload()
}
  }, 3000)

}, [isUpdated, navigate])

  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <h2 className="mb-4 text-4xl md:text-5xl text-center font-bold font-heading tracking-px-n leading-tight">
            Edit Transaction
          </h2>
          {loading && <Loading />}
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            You are editing transaction to {transactionState?.data?.name}
          </p>

          {/* error */}
          {error && <p className="mb-3 font-medium text-lg text-red-600 leading-normal">
            { error }
          </p>}

          <form onSubmit={submitHandler}>
            <label className="block mb-5">
              <input
                value={name}
                onChange={handleChange}
                name="name"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-1"
                type="text"
                placeholder="Name"
              />
            </label>
            <label className="block mb-5">
              <input
                value={amount}
                onChange={handleChange}
                name="amount"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-2"
                type="text"
                placeholder="Enter Amount"
              />
            </label>
            <label className="block mb-5">
              <select
                value={category}
                onChange={handleChange}
                name="category"
                class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option>-- Select Transaction Type --</option>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
            </label>
            <label className="block mb-5">
              <select
                value={transactionType}
                onChange={handleChange}
                name="transactionType"
                class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option>-- Select Category --</option>
                <option value="Personal">Personal</option>
                <option>Groceries</option>
                <option>Transportation</option>
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
              Edit Transaction
            </button>
          
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditTransaction;
