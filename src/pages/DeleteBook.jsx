import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react'

const DeleteBook = () => {
 const navigate = useNavigate();
 const { id } = useParams();
 const handleDeleteBook = () => {
   axios
     .delete(`https://books-app-server-1.onrender.com/books/${id}`)
     .then(() => {
       navigate('/home');
     })
     .catch((error) => {
       console.log(error);
     });
 };
 return (
  <div className='p-4'>
    <BackButton />
    <h1 className='my-4'>Delete Book</h1>
 
    <div className='d-flex flex-column flex-justify-center border border-danger rounded-xl p-5'>
      <h5 className='display-5 my-5 text-center'>Are You Sure You want to delete this book?</h5>
      
      <button
        className='p-4 btn btn-danger text-white m-8'
        onClick={handleDeleteBook}
      > 
        Yes, Delete it 
      </button>
    </div>
  </div>
 )
}
 export default DeleteBook;