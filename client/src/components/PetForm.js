import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

const PetForm = () => {
    
    const [name, setName] = useState(""); 
    const [type, setType] = useState("");
    const [description, setDescription] = useState(""); 
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const uploadImage = async e => {
        const files =e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'petUpload')
        setLoading(true)
        const res = await fetch(
            'http://api.cloudinary.com/v1_1/dawjjeajd/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        
        setImage(file.secure_url)
        setLoading(false)
    }
    
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/pets/new', {
            name,
            type,
            description,
            skill1, 
            skill2,
            skill3,
            image 
        })
            .then(res=>navigate('/'))
            .catch(err=>console.log(err))
    }
    
    return (
        <div>
        <Link className='float_right font25 ' to={"/"}>back to home</Link>
        <p className='color font30'>Know a pet who needs a home?</p>
        <form className='add_box font25' onSubmit={onSubmitHandler}>
            <p>
                <label className='color'>Pet Name:</label><br/>
                <input className='font25' type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
            </p>
            <p>
                <label className='color'>Pet Type:</label><br/>
                <input className='font25' type="text" onChange={(e)=>setType(e.target.value)} value={type}/>
            </p>
            <p>
                <label className='color'>Pet Description:</label><br/>
                <input className='font25' type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
            </p>
            <p>Skills (optional):</p>
            <p>
                <label className='color'>Skill 1:</label><br/>
                <input className='font25' type="text" onChange={(e)=>setSkill1(e.target.value)} value={skill1}/>
            </p>
            <p>
                <label className='color'>Skill 2:</label><br/>
                <input className='font25' type="text" onChange={(e)=>setSkill2(e.target.value)} value={skill2}/>
            </p>
            <p>
                <label className='color'>Skill 3:</label><br/>
                <input className='font25' type="text" onChange={(e)=>setSkill3(e.target.value)} value={skill3}/>
            </p>
            
            <p className='font25'>Upload a picture!</p>
            <input
                type="file" 
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
            />  
            {loading ? (
                <h3>Loading...</h3>
            ): (
                <img src={image} style={{width: '300px'}}/>
            )}

            <input className='button_green' type="submit" value="Add Pet"/>
        </form>
        </div>
    )
}

export default PetForm 

