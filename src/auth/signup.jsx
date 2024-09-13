import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result", result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        navigate('/');
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error("Google Sign-in Error:", errorMessage);
      });
  }

  const handleManualSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
   
        const user = userCredential.user;
    
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Manual Sign-up Error:", errorMessage);
      });
  }

  return (
    <>
      <div className="mb-2 my-10 flex flex-col items-center justify-center">
        <form onSubmit={handleManualSignup}>
          <div className="flex flex-col max-w-xs md:flex-nowrap gap-4">
          <h1 className="text-center mb-4 text-3xl font-bold">Sign Up To Shop App</h1>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              label="Username"
              placeholder="Enter Your Username"
            />
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              placeholder="Enter Your Email"
            />
            <Input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
          </div>
  
        </form>
        <Button type="submit" className="my-4" color="primary">
            Sign Up
          </Button>
        <h1 className="text-center my-7">Or</h1>

        <Button onClick={handleSignInWithGoogle} color="primary">Sign Up with Google</Button>
      </div>
    </>
  );
}

export default Signup;