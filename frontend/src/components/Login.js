import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [Credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({email:Credentials.email, password: Credentials.password})
        });
        const json = await response.json();
        console.log(json)
        if (json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully","success");
            navigate("/");
        }

        else{
            props.showAlert("Invalid credentials","danger");
        }
    }
    const onChange=(e)=>{
        setCredentials({...Credentials, [e.target.name]: e.target.value })
      }
    return (
        <div >
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className='form-label'>Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={Credentials.email} onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={Credentials.password} onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login