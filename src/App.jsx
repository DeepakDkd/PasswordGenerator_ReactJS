import { useCallback, useState, useRef, useEffect } from 'react'
import './App.css'


function App() {
  const [length, setlength] = useState(8);
  const [password, setpassword] = useState('');
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  
  const refElem = useRef(null);

  const generatePassword = useCallback(() => {

    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (number) {
      str += '12345678901234567890';
    }
    if (char) {
      str += '!@#$%^&*(){}[]/;:,.<>?!@#$%^&*(){}[]/;:,.<>?';
    }
    for (let index = 0; index < length; index++) {
      let Char = Math.floor(Math.random() * str.length);
      pass += str[Char];
    }
    setpassword(pass);
  }, [length, number, char, setpassword]);


  useEffect(generatePassword, [length, number, char, setpassword]);


  return (
    <>
      <main>
        <div className="card">
          <h1>Password Generator</h1>
          <div class='inp'>
            <input type="text" value={password} ref={refElem} readOnly />
            <i class="ri-file-copy-line" onClick={() => {
              refElem.current.select();
              window.navigator.clipboard.writeText(password);
            }}></i>
          </div>
          <div className="len">
            <input type="range" min={8} max={32} value={length} onChange={(e) => { setlength(e.target.value) }} />
            <p>Length : {length}</p>
          </div>
          <div className="Check">
            <input type="checkbox" onChange={() => { setnumber((prev => !prev)) }} />
            <p>Number</p>
            <input type="checkbox" onChange={() => { setchar((prev => !prev)) }} />
            <p>Character</p>
          </div>
          <p class="note"><span>Note: </span>Always use Numbers & Characters for strong password.</p>
        </div>
      </main>
    </>
  )
}

export default App
