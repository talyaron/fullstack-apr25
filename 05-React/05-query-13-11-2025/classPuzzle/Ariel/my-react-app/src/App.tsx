import { useEffect, useState } from 'react';
import styles from './App.module.scss';

interface DogResponse {
  message: string[];
  status: string;
}

function App() {
  const [dogs, setDogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
      const data: DogResponse = await response.json();
      setDogs(data.message);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <h1>🐕 Dog Gallery</h1>
      <button onClick={fetchDogs} className={styles.button}>
        Get New Dogs
      </button>
      <div className={styles.dogGrid}>
        {dogs.map((dogUrl, index) => (
          <img 
            key={index} 
            src={dogUrl} 
            alt={`Dog ${index + 1}`}
            className={styles.dogImage}
          />
        ))}
      </div>
    </div>
  );
}

export default App;