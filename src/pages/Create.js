import { useState } from 'react';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState(1);
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !method || !rating) {
      setFormError('Please include all fields');
      return;
    }

    // console.log(title, method, rating);
    const { data, error } = await supabase
      .from('smoothies')
      .insert([
        { 
          title: title, 
          method: method, 
          rating: rating
        }
      ]);
    
    if(error) {
      console.log(error);
      setFormError('Please try again');
    }
    if(data) {
      console.log(data);
      setFormError(null);
      setTitle('');
      setMethod('');
      setRating(1);

      navigate('/');
    }

  }

  return (
    <div className="page create">
    <h2>Create a Smoothie Recipe</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input 
        type="text" 
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="method">Method:</label>
      <textarea 
        id="method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      />

      <label htmlFor="rating">Rating:</label>
      <input 
        type="number"
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button>Create Smoothie Recipe</button>

      {formError && <p className="error">{formError}</p>}
    </form>
  </div>
  )
}

export default Create