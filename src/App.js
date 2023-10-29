import { useState, useEffect } from 'react';
import './App.css';

function App(props) {

  const [counter, setCounter] = useState(props.counter);
  const [courses, setCourses] = useState([]);
  const [resCourse, setResCourse] = useState([]);

  // console.log(courses);

  const getResource = async (url) => {
    let response = await fetch(url);

    return await response.json();
  };

  const getCurse = async () => {
    const response = await getResource(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    );

    setCourses(courses => response.map(transformData));
  }

  const transformData = (data) => {
    return {
      cc: data.cc,
      rate: data.rate
    }
  }

  useEffect(() => {
    getCurse();
  }, []);

  function calcCourse(country) {
    const newCourse = courses.filter(elem => elem.cc === country);
    const res = counter / newCourse[0].rate;

    setResCourse(resCourse => res.toFixed(0));
    // console.log(res);
  }

  function reset() {
    setCounter(counter => 0);
    setResCourse(resCourse => 0);
  }

  return (
    <div className="app">
      <div className="counter">{counter}</div>
      <div className="resalt">{resCourse}</div>
      <div className="controls">
        <button onClick={() => calcCourse('USD')}>USD</button>
        <button onClick={() => calcCourse('EUR')}>EUR</button>
        <button onClick={() => calcCourse('PLN')}>PLN</button>
        <button onClick={() => reset()}>RESET</button>
      </div>
    </div>
  );
}

export default App;
