import React, { useEffect, useState } from 'react' 
import PetList from '../components/PetList';
import axios from 'axios';

const Main = (props) => {
const [pets, setPets] = useState([]);  
useEffect(()=>{
    axios.get('http://localhost:8000/')
        .then(res=>{
            setPets(res.data);
    })
        .catch(err => console.error(err));
},[pets]);  
    return (
        <div>
            
           {pets ? <PetList pets = {pets} />: "" }
        </div>
    );
}
    
export default Main;

