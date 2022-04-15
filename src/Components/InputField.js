import { useState } from "react"


export default function InputField(props){


    return(
        <div style={styles.inputContainer}>
            <h3 style={styles.placeholder}>{props.placeholder}</h3>
            <input 
                type={props.type} 
                name={props.name} 
                value={props.value} 
                onChange={props.handleChange}
                style={styles.input}
            />
        </div>
    )
}

const styles = {
    inputContainer:{
        width:"100%",
        paddingBottom:25,
    },
    input:{
        width:"100%",
        height:40,
        borderRadius:5,
        fontSize:20,
        fontWeight:"bold",
        paddingLeft:10,
    },
    placeholder:{
        margin:0,
        paddingBottom:10,
    }
}