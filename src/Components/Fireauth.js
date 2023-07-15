import React ,{useEffect,useState}from 'react'
import {auth} from '../firebase';

function Fireauth() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [user,setUser] = useState('');

    let create = async()=> {
        let res = await auth.createUserWithEmailAndPassword(email,password);
        console.log(res);
    }
    useEffect(()=>{
        let unsub = auth.onAuthStateChanged((user)=>setUser(user))
        return ()=>{
            unsub();
        }
    },[])

    let logout = async() =>{
        await auth.signOut();
    }
    let signin = async() =>{
        await auth.signInWithEmailAndPassword(email,password)
    }
  return (
        <>
        {
            user == null ?
            <div>
                <label htmlFor='email'>Email</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <label htmlFor='password' value={password} onChange={(e)=>setPassword(e.target.value)}></label>
                <button onClick={signin}>Sign In</button>
            </div> :
            <>
                <div>{user.email}</div>
                <button onClick={logout}>Logout</button>
            </>
        }
        </>
    )
}

export default Fireauth