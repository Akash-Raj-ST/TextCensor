import Home from "./Home";
import Main from "./Main";

function App() {
  return (
    <div style={styles.root}>
      <Home/>
    </div>
  );
}

const styles = {
  root:{
    fontFamily: "Montserrat",
    height:"100%",
  }
}
export default App;
