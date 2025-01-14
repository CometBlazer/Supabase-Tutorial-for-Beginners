import { useState } from 'react';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState(1);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title || !method || !rating) {
      setFormError('Please include all fields');
      return;
    }

    console.log('Submitting:', { title, method, rating });

    try {
      const { data, error } = await supabase
        .from('smoothies')
        .insert([{ title, method, rating }]);
      
      if(error) {
        console.error('Supabase error:', error);
        setFormError('Please try again');
      } else {
        console.log('Supabase data:', data);
        setFormError(null);
        setTitle('');
        setMethod('');
        setRating(1);

        console.log('Navigating to home page');
        navigate('/');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setFormError('An unexpected error occurred');
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