import { useState,useCallback, useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length,setLength] =  useState(8)
  const  [numberAllowed,setNumberAllowed] = useState(false)
  const [characterAllowed,setCharacterAllowed] = useState(false)
  const [password,setPassword] = useState()

  const passwordGenerator =  useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str+= "0123456789"
    if(characterAllowed) str+="!@#$%^&*()_+-~"
    for(let i = 1 ;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,characterAllowed,numberAllowed,passwordGenerator])

  //useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>  
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center mb-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-5 '>
          <input type="text" value={password} className='outline-none  w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'> 
            <input onChange={(e)=>{setLength(e.target.value)}} type="range"  min={6} max={50} value={length} className='cursor-pointer'/>
            <label htmlFor="">Length:{length}</label>
          </div> 
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id='number' defaultChecked={numberAllowed} onChange={ ()=> {setNumberAllowed((prev)=> !prev)}} />
            <label htmlFor="number">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={characterAllowed} id='char' onChange={ ()=> {setCharacterAllowed((prev)=> !prev)}} />
          <label htmlFor="char">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
