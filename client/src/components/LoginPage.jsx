import React from "react";
import { useLazyQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

const InitialUser = {
    email: "",
    password: "",
    dob: "",
    name: "",
    address: ""
}

const LOGIN_QUERY = gql`
    query Login($email: String!, $password: String!) {
        login (email: $email, password: $password){
            userId
            token
        }
    }
`;

const SIGNUP_QUERY = gql`
    mutation SignUp($name:String!, $email:String!, $password:String!, $dob:String!, $address: String!) {
        createUser(input:{name:$name, email:$email, password:$password, dob:$dob, address: $address}){
            _id
            email
        }
    }
`

export default function LoginPage(){
    const [page, setPage] = React.useState(false);
    const [user, setUser] = React.useState(InitialUser);
    const navigate = useNavigate();
    const [getLogin] = useLazyQuery(LOGIN_QUERY);
    const [signUp] = useMutation(SIGNUP_QUERY);

    const handleUser = (e)=>{
        const { name, value } = e.target;

        setUser({...user, [name]:value});
    }

    const handleSubmit = async ()=>{
        const {email, password, dob, name, address} = user;

        if(page) {
            await signUp({variables:{email, password,dob, name, address}})
            .then(({data})=>{
                console.log(data);
                localStorage.setItem("currentUser", JSON.stringify(data))
                alert("User is successfully Sign Up");
                navigate("/home");
            })
            .catch((err)=>{
                alert(err)
            })
            
        } else {
            await getLogin({variables:{email, password}})
            .then(({data})=>{
                localStorage.setItem("currentUser", JSON.stringify(data.login))
                alert("User is successfully loggedIn");
                navigate("/home");
            })
            .catch((err)=>{
                console.log(err);
                alert("Enter valid credentials")
            });
        }

    }

    return (
        <div className="loginPage">            
            <h1>{page ? "SignUp": "Login"}</h1>
            {page && <div>
                <span>Name :</span>
                <input type="test" value={user.name} name="name" onChange={handleUser} placeholder="Name" />
            </div>}
            {page && <div>
                <span>DOB :</span>
                <input type="date" value={user.dob} name="dob" onChange={handleUser} placeholder="Date of birth" />
            </div>}
            {page && <div>
                <span>Address :</span>
                <input type="test" value={user.address} name="address" onChange={handleUser} placeholder="Address" />
            </div>}
            <div>
                <span>Email :</span>
                <input type="email" value={user.email} name="email" onChange={handleUser} placeholder="Email" />
            </div>
            <div>
                <span>Password :</span>
                <input type="password" value={user.password} name="password" onChange={handleUser} placeholder="Password" />
            </div>
            <button onClick={handleSubmit}>{page?"Signup":"Login"}</button>
            <br />
            <span>{page?"Already have an account?":"Create a new account."}</span><span className="splitBtn" onClick={()=>setPage(!page)}>{page?"Login":"Signup"}</span>
        </div>
    )
}