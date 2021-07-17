import axios from 'axios';
import  React, { useState, useEffect } from 'react';


function App() {

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  
  useEffect(() => {    
   async function fetchData(){
     try{
       
      let response =  await axios.get("https://randomuser.me/api/");
      
      
     setFirst(response.data.results[0].name.first)
     setLast(response.data.results[0].name.last);
     
    // console.log(first,last)
     }
     catch(e){

     }
    }
    fetchData();
  }, []);
   

  if(first==="")
  return(<h3>Nothing yet to render</h3>)
  else
        return(
         
          
      <div>
        <form>
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            aria-label="first"
          />
          <input
            type="text"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            aria-label="last"
          />
          <h2 data-testid="fullname">FirstName: {first}, LastName: {last}</h2>
        </form>
      </div>
    );
       

  }

  export default App;