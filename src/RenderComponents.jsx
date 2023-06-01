import { useState } from "react";
import FormContainer from "./components/FormContainer/FormContainer";
import SignContainer from "./components/SignIn/SignContainer";
import { auth } from "../Firebase";

export default function RenderComponents() {
  const [UserTrue, setUserTrue] = useState(false);
  const SignOutGoogle = () => {
    setUserTrue(false);
    auth.signOut;
  };

  return (
    <div className="font-serif">
      {UserTrue ? (
        <FormContainer SignOutGoogle={SignOutGoogle} />
      ) : (
        <SignContainer setUserTrue={setUserTrue} />
      )}
    </div>
  );
}
