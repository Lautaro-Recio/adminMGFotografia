import { useState } from "react";
import FormContainer from "./components/FormContainer/FormContainer";
import SignContainer from "./components/SignIn/SignContainer";

export default function App() {
  const [UserTrue,setUserTrue] = useState(false)
  return (
    <div className="font-serif">
    { UserTrue ?(<FormContainer/>) 
      :(<SignContainer setUserTrue={setUserTrue}/>)
    }
    </div>
  )
}
