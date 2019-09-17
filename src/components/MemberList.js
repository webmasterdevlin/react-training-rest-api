import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import {Link} from '@reach/router'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }),
);

function MemberList() {
  const classes = useStyles();

  const [forEditing, setForEditing] = useState(0);
  const [memberToUpdate, setMemberToUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({});

  useEffect( () => {
      console.log("USE_EFFECT!");
      loadMembers();
  }, []);

const loadMembers = async () => {
  setLoading(true);
  const { data } =  await axios.get("http://localhost:5000/members")
  console.log( "RESPONSE: ", data);
  setMembers(data);
  setLoading(false);
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

const handleEditNameOnChange = ({currentTarget}) => {
  setMemberToUpdate({...memberToUpdate, name: currentTarget.value});
}
const  handleEditAgeOnChange = ({currentTarget}) => {
  setMemberToUpdate({...memberToUpdate, age: currentTarget.value});
}

const handleAddMember = async () => {
    setLoading(true);
  try {
      const {data : createdMember} = await axios.post("http://localhost:5000/members", member);
      const newMemberCollection =  [...members, createdMember]
      setMembers(newMemberCollection);
  } catch (e) {
        alert(e.message)
  }
    setLoading(false);
}

const handleEditMember = (member) => {
  setForEditing(member.id);
  setMemberToUpdate(member)
}

const handleUpdateMember = async () => {
const previousMembers = [...members];
const index = members.findIndex(m => m.id === memberToUpdate.id);
const updatedMembers = [...members];
updatedMembers[index] = memberToUpdate;
setMembers(updatedMembers);
setForEditing(0);
 
try {
  await axios.put(`http://localhost:5000/members/${memberToUpdate.id}`, memberToUpdate)
  } catch (e) {
  alert(e.message)
  setMembers(previousMembers)
    }
}
  return (
    <div style={{width: "75vw", margin: "0 auto", padding: "2rem"}}>
      <h2>React Demo</h2>
      <TextField margin="dense"
        variant="outlined"
        multiline  rowsMax="4"  onChange={handleNameOnChange} />
      <TextField margin="dense"
        variant="outlined"
        multiline  rowsMax="4" onChange={handleAgeOnChange} />
      <Button variant="contained" color="primary" onClick={handleAddMember}>Add Member</Button>
      <h3>
        <ul  style={{listStyle: 'none'}}>
          {loading ? 
        <h2>Loading..</h2>
          : 
          members.map(m => 
        <Box boxShadow={3}>  <li key={m.id}>   
          {forEditing === m.id ? (
              <>
                <TextField margin="dense"
        variant="outlined"
        multiline  rowsMax="4"  value={memberToUpdate.name} onChange={handleEditNameOnChange} />
                <TextField margin="dense"
        variant="outlined"
        multiline  rowsMax="4"  value={memberToUpdate.age} onChange={handleEditAgeOnChange}/>
              </>) : (`name: ${m.name}, age: ${m.age}`)
            }
            {forEditing === m.id ?
               (<Button variant="contained" color="primary" onClick={handleUpdateMember} >Update</Button>) : 
               (<Button variant="contained" className={classes.button} onClick={() => handleEditMember(m)} >Edit</Button>)}
            <Button variant="contained" color="secondary" onClick={() => deleteMember(m.id)} >Delete</Button>
               <Link to={`/edit-member/${m.id}`}>
          <Button variant="outlined" >Check profile</Button>
               </Link> 
          </li>
          </Box>
          )}
        </ul>
      </h3>
    </div>
  );
}

export default MemberList;
