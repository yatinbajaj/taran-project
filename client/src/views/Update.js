import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";

const Update = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState(''); 
    const [skill1, setSkill1] = useState('');
    const [skill2, setSkill2] = useState('');
    const [skill3, setSkill3] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState('false');

    useEffect(() => {
        axios.get('http://localhost:8000/pets/' + id)
            .then(res => {
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setSkill1(res.data.skill1);
                setSkill2(res.data.skill2);
                setSkill3(res.data.skill3);
                setImage(res.data.image);
            })
    }, [id]);
    
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
        axios.put('http://localhost:8000/pets/' + id + '/edit', {
            name,
            type,
            description,
            skill1,
            skill2,
            skill3,
            image
        })
            .then(res => {navigate("/")})
            .catch(err => console.error(err));
    }
    
    return (
        <div>
            <p className='bold40'>Make Changes to {name}'s info</p>
            <Link className='font25 float_right' to={"/"}>back to all pets</Link>
            <form  className='edit_box font25' onSubmit={onSubmitHandler}>
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

                <p className='font25 color'>Upload a new picture?</p>
                <input
                    type="file" 
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                />  
                {loading ? (
                    <h3 className='color'>waiting for upload...</h3>
                ): (
                    <img src={image} style={{width: '300px'}}/>
                )}

                <input className='button_green' type="submit" value="Update Pet"/>
        </form>
        
        </div>
    )
}
    
export default Update;