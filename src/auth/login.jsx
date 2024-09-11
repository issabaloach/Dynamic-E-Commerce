import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSignInWithEmailAndPassword = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Email/Password Sign-in Error:", errorMessage);
      });
  }

  return (
    <>
      <div className="mb-2 my-10 flex flex-col items-center justify-center">
        <form onSubmit={handleSignInWithEmailAndPassword}>
          <div className="flex flex-col max-w-xs md:flex-nowrap gap-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              placeholder="Enter Your Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="my-4" color="primary">
            Sign In
          </Button>
        </form>

        <h1 className="text-center my-7">Or</h1>

        <Button onClick={handleSignInWithGoogle} color="primary">Sign In with Google</Button>
      </div>
    </>
  );
}

export default Signin;