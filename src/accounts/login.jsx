import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
    const [user_name, setName] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/preset-list';

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(user_name, pw);

        if (result.success) {
            // ログイン成功時は元のページまたはホームにリダイレクト
            navigate(from, { replace: true });
        } else {
            setError(result.error);
        }

        setLoading(false);
    };
    
    return (
        <div className='Login'>
            <h1>ログイン</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={user_name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ユーザー名"
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="パスワード"
                    required
                    disabled={loading}
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'ログイン中...' : 'ログイン'}
                </button>
            </form>
        </div>
    )
}

export default Login;
