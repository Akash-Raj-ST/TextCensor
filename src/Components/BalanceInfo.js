export default function BalanceInfo(props){
    return(
        <div style={styles.container}>
            <h3 style={styles.text}>Level {props.level}</h3>
            <h3 style={styles.text}>
                <span style={{fontSize:50}}>{props.calls}</span>
                calls
            </h3>
        </div>
    )
}

const styles = {
    container:{
        width:"fit-content",
        border:"2px solid black",
        borderRadius:5,
        padding:25
    },
    text:{
        margin:0,
        textAlign:"center",
        padding:10
    }
}