import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './accounts.css';

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
        <main className='account-main'>
            <div className='account-appName-container'>
                <h1 className="app-name">アプリ名</h1>
            </div>
            <div className="Register account-content-area">
                <h2 className='page-title'>アカウント新規登録</h2>
                <form onSubmit={handleSubmit} className="Form">
                    <div className='input-container'>
                        <label htmlFor="user_name">
                            <span className="material-symbols-outlined">person</span>
                            名前
                        </label>
                        <input
                            type="text"
                            id="user_name"
                            placeholder="名前を入力"
                            value={user_name}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="pw">
                            <span className="material-symbols-outlined">key_vertical</span>
                            パスワード
                        </label>
                        <input
                            type="password"
                            id='pw'
                            placeholder="パスワードを入力"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="pw_con">
                            <span className="material-symbols-outlined">check_circle</span>
                            パスワード(確認)
                        </label>
                        <input
                            type="password"
                            id='pw_con'
                            placeholder="パスワードを再度入力"
                            value={pw_con}
                            onChange={(e) => setPw_con(e.target.value)}
                            />
                    </div>
                    <div className='button-container'>
                        <button type="submit" className='main-button'>登録</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default SignUp;
