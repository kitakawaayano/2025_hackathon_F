import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
        <div className='Login'>
            <h1>ログイン</h1>
            <form onSubmit={getUsers}>
                <input
                    type="text"
                    value={user_name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="名前"
                    required
                />
                <input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="パスワード"
                    required
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">ログイン</button>
            </form>
        </div>
    )
}

export default Login;
