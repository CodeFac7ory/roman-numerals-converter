import React from 'react';
import './App.css';
import RomanNumerals from './RomanNumerals';

const App: React.FC<{}> = () => {

  const [arabic, setArabic] = React.useState('');
  const [roman, setRoman] = React.useState('');

  const handleArabicInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setArabic(event.currentTarget.value);

    const arabicInput = Number(event.currentTarget.value);

    if (!Number.isInteger(arabicInput) || arabicInput < 1) {
      event.currentTarget.setCustomValidity('Invalid integer');
      event.currentTarget.reportValidity();
      setRoman('');
      return;
    }

    event.currentTarget.setCustomValidity('');
    setRoman(RomanNumerals.toRoman(arabicInput));
  }

  const handleRomanInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const romanInput = event.currentTarget.value.toUpperCase();
    setRoman(romanInput);

    //numerals valid only up to MMMM (4000)
    const re1: RegExp = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    //inludes Roman numeral greather than MMMM (4000)
    const re: RegExp = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/;

    if (romanInput !== '' && !re.test(romanInput)) {
      event.currentTarget.setCustomValidity('Invalid Roman numeral');
      event.currentTarget.reportValidity();
      setArabic('');
      return;
    }
    else {
      event.currentTarget.setCustomValidity('');
      // seems like we dont need to call reportValidity in this case
      // event.currentTarget.reportValidity();

      setArabic(RomanNumerals.fromRoman(romanInput));
    }
  }

  return (
    <div className="App">
      <input
        id="arabicInput"
        type="text"
        name="arabic"
        placeholder="Please enter a positive Arabic integer"
        value={arabic}
        onChange={handleArabicInput}
      />
      <input
        id="romanInput"
        type="text"
        name="roman"
        placeholder="Please enter a Roman numeral"
        value={roman}
        onChange={handleRomanInput}
      />
    </div>
  );
};

export default App;
