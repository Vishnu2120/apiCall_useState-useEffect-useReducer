import React, { useState, useEffect,useReducer } from "react";

import axios from "axios";
const initialState = {  
  user: {},  
  loading: true,  
  error: ''  
}  
const reduce = (state, action) => {  
  switch (action.type) {  
      case 'OnSuccess':  
          return {  
              loading: false,  
              user: action.payload,  
              error: ''  
          }  
      case 'OnFailure':  
          return {  
              loading: false,  
              user: {},  
              error: 'Something went wrong'  
          }  

      default:  
          return state  
  }  
} 
function TableList() {
  const [users, setUsers] = useState({ hits: [] });
  fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((json) => console.log(json));

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers({ hits: data });
    };
    fetchData();
  }, [setUsers]);
  

 
  return (
    <div>
       <h2>Mock Api call using 'useState, useEffect'</h2>
      <ul>
        {users.hits &&
          users.hits.map(item => (
            <li key={item.id}>
              <span>{item.name}---{item.id}--{item.address.street}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}


export default function App() {
  const [state, dispatch] = useReducer(reduce, initialState)  
  
  useEffect(() => {  
      axios.get('https://reqres.in/api/users/3')  
          .then(response => {  
              dispatch({ type: 'OnSuccess', payload: response.data.data })  
          })  
          .catch(error => {  
              dispatch({ type: 'OnFailure' })  
          })  
  }, [])  

  return (  
    <>
      <div> 
         <h2>Mock Api call using 'useReducer' with error handler</h2>
          {state.loading ? 'Loading!! Please wait' : state.user.email}  
          {state.error ? state.error : null}  
      </div>  
       <div className="App">
       
       <TableList />
       
       
     </div>
    </>
  )  
 
}
