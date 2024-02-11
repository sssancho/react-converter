import React, {useState, useEffect} from 'react';
import { Block } from './Block';
import './index.scss';

const API_KEY="ddc39b71f93440a8ab1e3223589c7f4c"

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`)
    .then((res) => res.json())
    .then((json) => {
      setRates(json.rates);
      console.log(json.rates)
    })
    .catch((err) => {
      console.warn(err);
      alert('Не удалось получить информацию')
    })
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency]
    setToPrice(result)
    setFromPrice(value)
    
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value
    setFromPrice(result)
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className="App">
      <Block 
        value={fromPrice}
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}/>

      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}/>

    </div>
  );
}

export default App;
