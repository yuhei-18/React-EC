import React, {useCallback, useState} from "react";
import { TextInput, PrimaryButton } from "../components";
import { resetPassword } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  return (
    <div>
      <h2>パスワードリセット</h2>
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <div>
        <PrimaryButton 
          label={"パスワードリセット"}
          onClick={() => dispatch(resetPassword(email))}
        />
        <p onClick={() => dispatch(push("./signin"))}>サインイン画面に戻る</p>
      </div>
    </div>
  )
}

export default Reset;