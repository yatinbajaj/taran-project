import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../App.css';  
    
const mystyle = {marginLeft: "auto",
                marginRight: "auto"}; 

const PetList = (props) => {
    return (
        <div>
            <Link to="/pets/add">add a pet to the shelter</Link>
            <h2 className='color'>These pets are looking for a great family</h2>
            <div className = "flex list_box" >
                <table className="Table">
                    <thead>
                        <tr>
                            <th className='color'>Name</th>
                            <th className='color'>Type</th>
                            <th></th>
                            <th className='color'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.pets.map((pet, i) => {
                    return  <tr key={i}>
                            <td>{pet.name}</td>
                            <td key={i}>{pet.type}</td>
                            <td >
                               <img className='thumbnail' src={pet.image}/>
                            </td>
                            <td>                          
                                <Link to = {`/pets/${pet._id}`}>
                                    details
                                </Link>
                                |
                                <Link to = {`/pets/${pet._id}/edit`}>
                                    edit
                                </Link>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 
    
export default PetList;

