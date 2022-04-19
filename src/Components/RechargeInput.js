import { useEffect, useState } from "react"
import InputField from "./InputField"

export default function RechargeInput(props){
    const [amount,setAmount] = useState(0);
    const [calls,setCalls] = useState(0);

    useEffect(()=>{
        var amt = calls*0.001;
        setAmount(parseFloat(amt.toFixed(3)));
    },[calls])
    
    useEffect(()=>{
        var level = "level"+props.level;
        var amt = {
            level:level,
            value:amount,
        }
        var call= {
            level:level,
            value:calls,
        }
        props.handleTotalAmt(amt)
        props.handleTotalCalls(call)
    },[amount])

    return(
        <div>   
            <h3>Level {props.level} &nbsp;&nbsp;
                <span style={{fontSize:25}}>${amount}</span>
            </h3>
            <InputField 
                type="number"
                value={calls}
                handleChange={(e)=>{setCalls(e.target.value);}}
            />
        </div>
        )
}