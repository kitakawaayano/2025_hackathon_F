import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './accounts.css';

export const Login = () => {
    const [user_name, setName] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [cookies, setCookie] = useCookies(['id']);


    const getUsers = async () => {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();

        data.map(user =>{
            if (user.user_name == user_name && user.password == pw){
                setCookie('id', user.id);
                alert("ログイン成功");
                
                navigate("/");

            }else {
                // console.error(error);
                setError("ログインに失敗しました。")
            }
        })
    }
    
    return (
        <main className='account-main'>
            <div className='account-appName-container'>
                <h1 className='app-name'>アプリ名</h1>
            </div>
            <div className='Login account-content-area'>
                <h2 className='page-title'>ログイン</h2>
                <form onSubmit={getUsers}>
                    <div className='input-container'>
                        <label htmlFor="user_name">
                            <span className="material-symbols-outlined">person</span>
                            名前
                        </label>
                        <input
                            type="text"
                            id='user_name'
                            placeholder="名前を入力"
                            value={user_name}
                            onChange={(e) => setName(e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                    <div className='button-container'>
                        <button type="submit" className='main-button'>ログイン</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login;
