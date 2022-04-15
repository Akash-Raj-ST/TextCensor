import InputField from "./InputField"

export default function RechargeInput(props){
    return(
        <div>   
            <h3>Level {props.level}</h3>
            <InputField type="number"/>
        </div>
    )
}