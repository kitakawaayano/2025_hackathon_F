import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
    const [user_id, setUser_Id] = useState('');
    const [user_name, setName] = useState('');
    const [pw, setPw] = useState('');
    const [pw_con, setPw_con] = useState('');

    const navigate = useNavigate();

    const [error, setError] = useState<string | null > (null);

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        if(pw != pw_con) {
            console.error("パスワードが一致しません。");
            return;
        }
    

        try {
        const response = await axios.post('http://localhost:3000/users', {
            user_name: user_name,
            password: pw,
            password_confirmation: pw_con,
        });
            
            alert("アカウントが作成されました。");
            navigate("/");
        } catch (error) {
            setError("アカウントを作成できませんでした。");
        }
    }

    return (
        <div className="Register">
            <h1>アカウント新規登録画面</h1>
            <form onSubmit={handleSubmit} className="Form">
                <input
                    type="text"
                    placeholder="名前"
                    value={user_name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="確認パスワード"
                    value={pw_con}
                    onChange={(e) => setPw_con(e.target.value)}
                />
                <button type="submit">登録</button>
            </form>
        </div>
            
    );
};

export default SignUp;
