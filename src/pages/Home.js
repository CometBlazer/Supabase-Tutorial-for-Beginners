import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  // console.log(supabase);
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()

      if (error) {
        setFetchError('Could not fetch the data');
        console.log(error);
        setSmoothies(null);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    }
    fetchSmoothies();
  }, [])

  console.log(smoothies);

  return (
    <div className="page home">
      {/* <h2>Home</h2> */}
      {fetchError && (
        <p>{fetchError}</p>
      )}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {/* Order-by buttons */}
            {smoothies.map(smoothie => (
              <div key={smoothie.id} className="smoothie">
                <SmoothieCard key={smoothie.id} smoothie={smoothie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home