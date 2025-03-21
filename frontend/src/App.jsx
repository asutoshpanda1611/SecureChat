import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Sender from "./Interface/Sender";
import Receiver from "./Interface/Receiver";
import Auth from "./Interface/Auth";
import PrivateRoute from "./PrRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/sender" element={<PrivateRoute><Sender /></PrivateRoute>} />
        <Route path="/receiver" element={<PrivateRoute><Receiver /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;