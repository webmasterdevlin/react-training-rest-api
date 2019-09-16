import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({});

  useEffect( () => {
      console.log("USE_EFFECT!");
      loadMembers();
  }, []);

const loadMembers = async () => {
  const { data } =  await axios.get("http://localhost:5000/members")
  console.log( "RESPONSE: ", data);
  setMembers(data);
}

const deleteMember = async (id) => {
  const previousMembers = [...members];
   const newMembers = members.filter(m => m.id !== id);
    setMembers(newMembers);
 try {
    await axios.delete(`http://localhost:5000/members/${id}`);
 } catch (e) {
   setMembers(previousMembers);
   alert(e.message);
 }
}

const handleNameOnChange = ({currentTarget}) => {
  setMember({...member, name: currentTarget.value});
}
const  handleAgeOnChange = ({currentTarget}) => {
  setMember({...member, age: currentTarget.value});
}
const handleAddMember = async () => {
  try {
      const {data : createdMember} = await axios.post("http://localhost:5000/members", member);
      const newMemberCollection =  [...members, createdMember]
      setMembers(newMemberCollection);
  } catch (e) {
        alert(e.message)
  }
}
  return (
    <div className="App">
      <h2>React Demo</h2>
      <input type="text" onChange={handleNameOnChange} />
      <input type="text" onChange={handleAgeOnChange} />
      <button onClick={handleAddMember}>Add Member</button>
      <h3>
        <ul>
          {members.map(m => 
          <li key={m.id}>name: {m.name}, age: {m.age}
            <button onClick={() => deleteMember(m.id)} >Delete</button>
          </li>
          )}
        </ul>
      </h3>
    </div>
  );
}

export default App;
