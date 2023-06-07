import React, { useEffect, useState } from 'react' 
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
    
const Detail = (props) => {
    const { removeFromDom } = props;
    const [pet, setPet] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const deletePet = (petId) => {
        axios.delete('http://localhost:8000/pets/' + petId)
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err));
        }
    
    useEffect(() => {
        axios.get('http://localhost:8000/pets/' + id)
            .then(res => setPet(res.data))
            .catch(err => console.error(err));
    }, [id]);
    
    return (
        <div className='font30'>
            
            <h2>Details about: {pet.name}</h2>
            <button className='button_green' onClick={(e)=>{deletePet(pet._id)}}>
                    Adopt {pet.name}
            </button>
            <div className='detail_box color'>
                <p>Pet Type: {pet.type}</p>
                <p>Description: {pet.description}</p>
                <p>Skills: {pet.skill1}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{pet.skill2}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{pet.skill3}</p>
                <p>
                    <img className='image' src={pet.image}/>
                </p>
            </div>
            <p>
                <Link to={"/"}>back to all pets</Link>
            </p>
        </div>
        

    )
}
    
export default Detail;

