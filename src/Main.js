import { useEffect, useState } from "react"
import { useNavigate,useLocation } from "react-router-dom"

import BalanceInfo from "./Components/BalanceInfo"
import Button from "./Components/Button"
import RechargeInput from "./Components/RechargeInput"
import { url } from "./url"

export default function Main(){
    const location = useLocation();
    const [load,setLoad] = useState(false);
    const [calls,setCalls] = useState({"level1":50,"level2":50,"level3":50})
    
    useEffect(()=>{
        //get balance
        var myHeaders = new Headers();
            
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${url}/recharge/getbalance/${location.state.username}`, requestOptions)
        .then((response) => {
            if(response.ok){
                return response.json()
            }
        })
        .then((result) => {
            if(result){
                console.log(result);
                setCalls(result)             
            }
        })
        .catch(error => console.log('error', error));
        console.log("call reset done")
    },[load])


    return(
        <div style={{
            width:"70%",
            margin:"auto"
        }}>
            <Top username={location.state.username} apiKey={location.state.api_key}/>
            <Balance balance={calls}/>
            <Recharge username={location.state.username} load={load} setLoad={setLoad}/>
        </div>
    )
}

function Top(props){
    let navigate = useNavigate();


    const name = props.username
    const api_key = props.apiKey

    const handleAPI = () =>{
       navigator.clipboard.writeText(api_key)
       alert("api key copied to clipboard")
    }

    const handleLogOut = ()=>{
        localStorage.removeItem("user_id");
        navigate("/")
        console.log("Logging out!");
    }

    return(
        <div style={styles.top}>
            <h3 style={{textDecoration:"underline"}}>Welcome, {name}</h3>
            <div
                style={{
                    display:"flex",
                    flexDirection:"row",
                }}
            >
                <Button title="API Key" handleClick={handleAPI}/>
                <h3 style={{paddingRight:10}}></h3>
                <Button title="Log Out" handleClick={handleLogOut}/>
            </div>
        </div>
    )
}


function Balance(props){
    
    return(
        <div>
            <h2>Your Balance</h2>
            <div style={styles.BalanceContainer}>
                <BalanceInfo level={1} calls={props.balance.level1}/>
                <BalanceInfo level={2} calls={props.balance.level2}/>
                <BalanceInfo level={3} calls={props.balance.level3}/>
            </div>
        </div>
    )
}

function Recharge(props){
    const [totalAmt,setTotalAmt] = useState({"level1":0,"level2":0,"level3":0});
    const [totalCalls,setTotalCalls] = useState({"level1":0,"level2":0,"level3":0});
    const [recharge,setRecharge] = useState("Recharge $0");


    const handleTotalAmt = (amt) =>{
        setTotalAmt({...totalAmt,[amt.level]:amt.value});
    }

    const handleTotalCalls = (call) =>{
        setTotalCalls({...totalCalls,[call.level]:call.value});
    }

    useEffect(()=>{
        var total = Object.values(totalAmt);
        var sum = 0;
        for(var i=0;i<total.length;i++){
            sum += total[i];
        }
        setRecharge("Recharge $"+sum.toFixed(3));
    },[totalAmt])

    const hadnleRecharge = () =>{
        console.log("recharging...")
        var myHeaders = new Headers();

        var formdata = new FormData();
        formdata.append("username", props.username);
        formdata.append("level1",totalCalls.level1);
        formdata.append("level2",totalCalls.level2);
        formdata.append("level3",totalCalls.level3);
        
        console.log("calls")
        console.log(totalCalls)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(url+"/recharge/", requestOptions)
        .then((response) => {
            if(response.ok){
                return response.json()
            }
        })
        .then((result) => {
            if(result){
                console.log(result);
                console.log("updating...")
                props.setLoad(!props.load);
                                        
            }
        })
        .catch(error => console.log('error', error));

        //reload balance
    }

    return(
        <div style={{marginTop:50}}>
            <h2>Recharge</h2>
            <div style={styles.BalanceContainer}>
                <RechargeInput level={1} handleTotalAmt={handleTotalAmt} handleTotalCalls={handleTotalCalls}/>
                <RechargeInput level={2} handleTotalAmt={handleTotalAmt} handleTotalCalls={handleTotalCalls}/>
                <RechargeInput level={3} handleTotalAmt={handleTotalAmt} handleTotalCalls={handleTotalCalls}/>
            </div>
            <div
                style={{
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    marginTop:30,
                }}
            >
                <Button title={recharge} handleClick={hadnleRecharge}/>
            </div>
        </div>
    )
}

const styles={
    top:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    BalanceContainer:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-around",
        alignItems:"center"
    }
}