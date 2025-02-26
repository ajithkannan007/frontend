import { React,useEffect, useState, } from 'react'
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from 'react-router-dom'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import Login from './Login'
import Launch from './Launch'
import Signup from './Signup'
import ForgetPassword from './ForgetPassword'
import Validate from './Validate'
import ChangePassword from './changePassword'
import Services from './Services'
import Form from './Form'

function App(){
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <>
   <div className='App'>
    <BrowserRouter>
    <Routes>
      <Route path='/Launch' element={<Launch email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
      <Route path='/' element={<Navigate to="/Launch" replace />}/>
      <Route path='/Services' element={<Services setLoggedIn={setLoggedIn} />} />
      <Route path='/Login' element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail}/>} />
      <Route path='/Signup' element={<Signup setLoggedIn={setLoggedIn} setEmail={setEmail}/>} />
      <Route path='/ForgetPassword' element={<ForgetPassword setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
      <Route path='/Validate' element={<Validate setLoggedIn={setLoggedIn} />} />
      <Route path='/ChangePassword' element={<ChangePassword setLoggedIn={setLoggedIn} />} />
      <Route path='/Form' element={<Form setLoggedIn={loggedIn}/>} />
    </Routes>
    </BrowserRouter>

   </div>
    </>
  )
}
{/* 
//   const [count, setCount] = useState(0)
//   const [inputs,setInputs] = useState("");
//   const [myCar,setMycar] = useState("volvo");
//   const [count1,setCount1] = useState(0);
//   const [count2,setCount2] = useState(0);
//   const [todos, setTodos] = useState(["todo 1", "todo 2"]);

//   const increment = () => {
//     setCount1((c) => c + 1);
//   };
//   const shoot = (a, b) => {
//     alert(b.type);
    
//     }
//     const handleChange = (event) => {
//       const name = event.target.name;
//       const value = event.target.value;
//       setInputs(values => ({...values, [name]: value}))
//       if(event.target.name === "car"){
//       setMycar(event.target.value);
//       }
//   };
  
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(`This person Name is ${inputs.username} and age is ${inputs.age}. He loves this ${myCar} car brand`);
//   }
//   const [car,setCar] = useState({
//     brand: "ford",
//     model: "mustand",
//     year: 1967,
//     color: "red"
//   })
//   const updateColor = () => {
//     setCar(previousState => {
//       return {...previousState, color: "blue"}
//     });
//   }
//   useEffect(() => {
//   setTimeout(() => {
//   setCount2((count2) => count2+1)
// },1000);
// },[]);
//   return (
//     <>
    
//     <button className="back" onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
//     <h1 className={styles.bigblue}>Hello Car!</h1>
//     <h1>I have rendered {count2} times!</h1>
//     <div>
//       <h1>my {car.brand}</h1>
//       <p>it is a {car.color} {car.model} from {car.year}</p>
//       <button type='button' onClick={updateColor}>blue</button>
      
//     </div>
//     <div>
//     <form onSubmit={handleSubmit}>
//       <label>Enter your name:
//         <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} placeholder='enter your name' required/>
//       </label>
//       <label>Enter your age:
//         <input 
//         type="text" 
//         name="age" 
//         value={inputs.age || ""} 
//         onChange={handleChange}
//         placeholder='enter age' required/>
//       </label>
//       <label>Car brand:
//       <select name="car" value={myCar} onChange={handleChange}>
//        <option value="ford">ford</option>
//        <option value="volvo">volvo</option>
//        <option value="BMW">BMW</option>
//       </select>
//       </label>
//       <input className="submit" type='submit' value='submit'/>  
//     </form>
//   </div>
//   <div>
//   <Todos todos={todos} />
//       <hr />
//       <div>
//         Count: {count1}
//         <button onClick={increment}>+</button>
//       </div>
//       </div>
//       <div>
      
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// } */}

export default App
