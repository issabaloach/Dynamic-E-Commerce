import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { em } from "framer-motion/client";
import { useState } from "react";
import { auth } from "../utils/utils";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSignInWithGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(auth, provider)
  .then((result) => {
    console.log("result" , result)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <>
      <div className="mb-2 my-10 flex flex-col  items-center justify-center ">
        <form>
          <div className=" flex flex-col max-w-xs md:flex-nowrap gap-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              placeholder="Enter Your Password"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
          </div>
          <Button className="my-4" color="primary">
            SignIn
          </Button>

          <h1 className="text-center my-7">Or</h1>

          <Button onClick={handleSignInWithGoogle} color="primary">SignIn with Google</Button>
        </form>
      </div>
    </>
  );
}

export default Signin;
