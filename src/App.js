import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Home from "./Home";
import Main from "./Main";

function App() {
  return (
    <div style={styles.root}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Main" element={<Main/>}/>
        </Routes>
      </Router>
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
