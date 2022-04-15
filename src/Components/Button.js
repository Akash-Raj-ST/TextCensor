import { useState } from "react"

export default function Button(props){

    const [buttonColor,setButtonColor] = useState({"color":"white","bg":"black"})

    
    const styles = {
        button:{
            paddingRight:15,
            paddingLeft:15,
            paddingTop:10,
            paddingBottom:10,
            backgroundColor:`${buttonColor.bg}`,
            color:`${buttonColor.color}`,
            borderRadius:5,
            border:"2px solid black",
            cursor:"pointer",
            height:"fit-content"
        },
       
    }
    
    if(props.type==="submit")
    return(
         <button 
                style={styles.button}
                onMouseEnter={()=>setButtonColor({"color":"black","bg":"white"})}
                onMouseLeave={()=>setButtonColor({"color":"white","bg":"black"})}
                type="submit"
            >
                <h3 style={{margin:0}}>{props.title}</h3>
        </button>
    )
    
    return(
            <button 
                style={styles.button}
                onMouseEnter={()=>setButtonColor({"color":"black","bg":"white"})}
                onMouseLeave={()=>setButtonColor({"color":"white","bg":"black"})}
                onClick={(e)=>props.handleClick(e)}
                type={props.type}
            >
                <h3 style={{margin:0}}>{props.title}</h3>
            </button>
    )
}

