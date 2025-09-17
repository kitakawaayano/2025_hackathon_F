import React, { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import './accounts.css';

export const Login = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        setError
    } = useForm();

    const navigate = useNavigate();
    const { login, logout } = useAuth();

      useEffect(() => {
        logout();
    }, [])
    const onSubmit = async (data) => {
        try {
            const result = await login(data.user_name, data.pw);
            if (result.success) {
                navigate("/", {
                    state: { login: true }
                });
            } else {
                toast.error("ログインに失敗しました");
            }
        } catch (error) {
            toast.error("ログインに失敗しました");
        }
    }

    const location = useLocation();

    useEffect(() => {
        if (location.state?.signup) {
            toast.success('アカウントが作成されました');
            window.history.replaceState({}, document.title);
        }
    }, [location]);
    
    return (
        <main className='account-main'>
            <div className='account-appName-container'>
                <h1 className='app-name'>アプリ名</h1>
            </div>
            <div className='Login account-content-area'>
                <h2 className='page-title'>ログイン</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='Form'>
                    <div className='input-container'>
                        <label htmlFor="user_name">
                            <span className="material-symbols-outlined">person</span>
                            ユーザー名
                        </label>
                        <input
                            type="text"
                            id='user_name'
                            placeholder="半角英数字と記号のみ使用可(._-)"
                            className={errors.user_name ? 'error-input' : ''}
                            {...register("user_name", {
                                required: "ユーザー名は必須です",
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+$/,
                                    message: "使用できない文字が含まれています"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "50文字以内で入力して下さい"
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='user_name'
                            render={({ message }) => <p className="error-message">{message}</p>}
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
                            placeholder="半角英数字と記号のみ使用可(!@#$%^&*._-+=?)"
                            className={errors.pw ? 'error-input' : ''}
                            {...register("pw", {
                                required: "パスワードは必須です",
                                pattern: {
                                    value: /^[a-zA-Z0-9!@#$%^&*._\-+=?]+$/,
                                    message: "使用できない文字が含まれています"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "50文字以内で入力して下さい"
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='pw'
                            render={({ message }) => <p className="error-message">{message}</p>}
                        />
                    </div>
                    <div className='account-link-container'>
                        <Link to={`/signup`}>アカウントをお持ちでない方はこちら</Link>
                    </div>
                    <div className='button-container'>
                        <button type="submit" className='main-button'>ログイン</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </main>
    )
}

export default Login;
