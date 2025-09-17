import axios from 'axios';

const API_KEY = 'a31aba5005de931f98a94ada77b3c10a';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;  //ES6 Template Option

// 1) Action type을 상수로 정의하는 이유는, 다른 곳에서 사용할 때 오타로 인한 버그를 줄이기 위함.
// 2) Reducer과 Action등 어디서든 불러와서 사용할 때 Key값으로 사용하기 위함.
// 3) String이 변하게 되어도 Action / Reducer에서 변경점이 없음.
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url); //request promise
  
  return {
    type: FETCH_WEATHER,
    payload: request
  };
}

