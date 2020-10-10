import React, {useCallback, useState} from "react";
import { TextInput } from "../components"

const SignUp = () => {

  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPasswprd, setConfirmPasswprd] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value);
  }, [setUsername]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  const inputConfirmPasswprd = useCallback((event) => {
    setConfirmPasswprd(event.target.value);
  }, [setConfirmPasswprd]);

  return (
    <div>
      <h2>アカウント登録</h2>
      <TextInput 
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} value={username} type={"text"} onChange={inputUsername}
      />
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <TextInput 
        fullWidth={true} label={"パスワード（確認用）"} multiline={false} required={true}
        rows={1} value={confirmPasswprd} type={"password"} onChange={inputConfirmPasswprd}
      />
    </div>
  )
}

export default SignUp;