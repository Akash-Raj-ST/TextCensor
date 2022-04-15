import { useState } from "react"
import BalanceInfo from "./Components/BalanceInfo"
import Button from "./Components/Button"
import RechargeInput from "./Components/RechargeInput"

export default function Main(){
    return(
        <div style={{
            width:"70%",
            margin:"auto"
        }}>
            <Top/>
            <Balance/>
            <Recharge/>
        </div>
    )
}

function Top(){

    const [showApi,setShowAPi] = useState(false);

    const name = "Akash Raj"
    const api_key = "234gdfhgfgh768@#g5645"

    const handleClick = () =>{
       navigator.clipboard.writeText(api_key)
       alert("api key copied to clipboard")
    }

    return(
        <div style={styles.top}>
            <h3 style={{textDecoration:"underline"}}>Welcome, {name}</h3>
            <div>
                <Button title="API Key" handleClick={handleClick}/>
            </div>
        </div>
    )
}


function Balance(){
    return(
        <div>
            <h2>Your Balance</h2>
            <div style={styles.BalanceContainer}>
                <BalanceInfo level={1} calls={100}/>
                <BalanceInfo level={2} calls={150}/>
                <BalanceInfo level={3} calls={270}/>
            </div>
        </div>
    )
}

function Recharge(){
    return(
        <div style={{marginTop:50}}>
            <h2>Recharge</h2>
            <div style={styles.BalanceContainer}>
                <RechargeInput level={1}/>
                <RechargeInput level={2}/>
                <RechargeInput level={3}/>
            </div>
            <div
                style={{
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    marginTop:30,
                }}
            >
                <Button title="recharge"/>
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