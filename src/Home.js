import { useState} from "react"
import { useNavigate } from "react-router-dom";

import Button from "./Components/Button";
import InputField from "./Components/InputField";

export default function Home(){
    return(
        <div 
            style={styles.rootContainer}
        >
            <Info/>
            <InputForm/>
        </div>
    )
}

function Info(){
    return(
        <div style={styles.infoContainer}>
            <h1 style={styles.title}>TEXT CENSORSHIP</h1>
            <h4 style={styles.content}>
                Protecting you from R E A L I T Y. Lorem Ipsum has been
                the industry's standard dummy text ever since
                the 1500s,  printing and typesetting industry. 
            </h4>
        </div>
    )
}


function InputForm(){
    let navigate = useNavigate();

    const [status,setStatus] = useState("acc_creation");
    const [credentials,setCredentials] = useState({"username":"","email":"","password":""})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCredentials(values => ({...values, [name]: value}))
    }
    const handleSubmission = (e)=>{
        e.preventDefault();
        if(status==="login"){
            console.log("Handling login")

            var myHeaders = new Headers();

            var formdata = new FormData();
            formdata.append("username", credentials.username);
            formdata.append("password", credentials.password);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://127.0.0.1:8002/auth/login/", requestOptions)
            .then((response) => {
                if(response.ok){
                    return response.json()
                }
            })
            .then((result) => {
                if(result){
                    console.log(result);
                    localStorage.setItem('user_id',result.user_id);
                    
                    navigate("Main",{state:result});
                    
                }
            })
            .catch(error => console.log('error', error));
        }else{    
            console.log("Handling Registration")
            var myHeaders = new Headers();

            var formdata = new FormData();
            formdata.append("username", credentials.username);
            formdata.append("password", credentials.password);
            formdata.append("email", credentials.email);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://127.0.0.1:8002/auth/register/", requestOptions)
            .then((response) => {
                if(response.ok){
                    return response.json()
                }
            })
            .then((result) => {
                if(result){
                    console.log(result);
                    localStorage.setItem('user_id',result.user_id);
                    
                    navigate("Main",{state:result});
                    
                }
            })
            .catch(error => console.log('error', error));
        }
    }
    
    if(status==="acc_creation")
        return(
                
            <form onSubmit={handleSubmission} style={styles.inputForm}>  
                <InputField name="username" type="text" placeholder="Username" value={credentials.username} handleChange={handleChange}/>
                <InputField name="email" type="email" placeholder="Email" value={credentials.email} handleChange={handleChange}/>
                <InputField name="password" type="password" placeholder="Password" value={credentials.password} handleChange={handleChange}/>

                <div style={styles.buttonContainer}>
                    <Button 
                        title="Create Account" 
                        type="submit"                    
                    />
                </div>

                <div style={styles.statusContainer}>
                    <button 
                        style={styles.status}
                        onClick={()=>{setStatus("login")}}
                    >Already have an account?</button>
                </div>
            </form>
        )

    return(
             
        <form onSubmit={handleSubmission} style={styles.inputForm}>  
            <InputField name="username" type="text" placeholder="Username" value={credentials.username} handleChange={handleChange}/>
            <InputField name="password" type="password" placeholder="Password" value={credentials.password} handleChange={handleChange}/>

            <div style={styles.buttonContainer}>
                <Button 
                    title="Login" 
                    type="submit"
                />
            </div>

            <div style={styles.statusContainer}>
                <button 
                    style={styles.status}
                    onClick={()=>{setStatus("acc_creation")}}
                >Don't have an account?</button>
            </div>
        </form>
    )
    
}
function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your age:
        <input 
          type="number" 
          name="age" 
          value={inputs.age || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )
}
const styles = {
    rootContainer:{
        width:"80%",
        height:"100%",
        margin:"auto",
        display:"flex",
        flexDirection:"row",
        paddingTop:150,
        justifyContent:'center',
        alignItems:"center",
       "@media (maxWidth: 767px)": {
            backgroundColor:"red"
        },
        "@media (maxWidth: 767px)": {
            backgroundColor:"green"
        },
    },
    title:{
        fontSize:50
    },
    content:{
        width: "80%",
        height: "fit-content"
    },
    infoContainer:{
        height:"fit-content",
        width:"50%",
        paddingTop:70,
        padding:50,
    },
    inputForm:{
        height:"100%",
        width:"50%",
    },
    buttonContainer:{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        paddingTop:30
    },
    statusContainer:{
        width:"100%",
        display:"flex",
        justifyContent:'center',
    },
    status:{
        backgroundColor:"white",
        border:"none",
        fontWeight:"bold",
        fontSize:20,
        marginTop:10,
        cursor:"pointer",
    }
}