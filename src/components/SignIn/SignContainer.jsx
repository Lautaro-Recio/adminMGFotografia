import SignInWithGoogle from "./SignInWithGoogle";

export default function SignContainer(props) {
  const { setUserTrue } = { ...props };
  return (
    <div className="bg-backgroundSignIn bg-cover h-[100vh] flex justify-center items-center">
      <SignInWithGoogle setUserTrue={setUserTrue} />
    </div>
  );
}
