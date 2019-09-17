import React, { useEffect, useState} from 'react'
import axios from 'axios'

export default function Profile(params) {
        const [member, setMember] = useState({})
    useEffect(() => {
        getMemberById();
    }, []);

    const getMemberById = async () => {
      const {data} = await  axios.get(`http://localhost:5000/members/${params.id}`)
        setMember(data);
    }

    return <div>
        <h1>Profile works! {params.id}</h1>
        <h2>{member.name}</h2>
         <h2>{member.age}</h2>
    </div>
}