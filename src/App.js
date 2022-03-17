import React, { useState, useEffect } from "react";
import UseReducerApp from './hookreducer';
import axios from "axios";

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
  
  return (  
    <>
      
       <div className="App">
       
       <TableList /> 
       <UseReducerApp/>
       
     </div>
    </>
  )  
 
}
