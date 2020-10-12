import React, {useCallback, useState} from "react";
import { TextInput, PrimaryButton } from "../components";
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  return (
    <div>
      <h2>サインイン</h2>
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div>
        <PrimaryButton 
          label={"サインイン"}
          onClick={() => dispatch(signIn(email, password))}
        />
      </div>
    </div>
  )
}

export default SignIn;