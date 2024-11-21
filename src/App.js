import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter/Counter';
import Controllers from './components/Controllers/Controllers';
import RobotList from './components/RobotList/RobotList';

import { useState, useEffect } from 'react';
import { users } from './constants';

function App() {
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [robots, setRobots] = useState(users);

  const plus = () => setCount(count + 1);
  const minus = () => setCount(count - 1);

  useEffect(() => {
    async function fetchRobots() {
      try {
        const response = await fetch('URL_TO_FETCH_ROBOTS'); jsonplaceholder.typicode.com
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRobots(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRobots();
  }, []);

  if (loading) return <h1>Загрузка...</h1>;
  if (error) return <h1></h1>;

  return (
    <div className="App">
      <header className="App-header">
        <RobotList robots={robots} />
        <div className='counts'>
          <Counter count={count} />
          <Controllers plus={plus} minus={minus} />
        </div>
      </header>
    </div>
  );
}

export default App;