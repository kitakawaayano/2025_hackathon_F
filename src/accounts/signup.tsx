import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ToastContainer, toast } from 'react-toastify';
import './accounts.css';

export const SignUp: React.FC = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async ( data: any ) => {
        try {
            const uniqueCheck = await axios.get(`https://2025-hackathon-f-json.vercel.app/users?user_name=${data.user_name}`);
            if (uniqueCheck.data.length > 0) {
                toast.error("アカウントの作成に失敗しました");
                return;
            }

            const response = await axios.post('https://2025-hackathon-f-json.vercel.app/users', {
                user_name: data.user_name,
                password: data.pw,
                // password_confirmation: data.pw_con,
            });
            navigate("/login", {
                state: { signup: true }
            });
        } catch (error) {
            toast.error("アカウントの作成に失敗しました");
        }
    }

    return (
        <main className='account-main'>
            <div className='account-appName-container'>
                <h1 className="app-name">アプリ名</h1>
            </div>
            <div className="Register account-content-area">
                <h2 className='page-title'>アカウント新規登録</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="Form">
                    <div className='input-container'>
                        <label htmlFor="user_name">
                            <span className="material-symbols-outlined">person</span>
                            ユーザー名
                        </label>
                        <input
                            type="text"
                            id="user_name"
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
                    <div className='input-container'>
                        <label htmlFor="pw_con">
                            <span className="material-symbols-outlined">check_circle</span>
                            パスワード(確認)
                        </label>
                        <input
                            type="password"
                            id='pw_con'
                            placeholder="パスワードを再度入力"
                            className={errors.pw_con ? 'error-input' : ''}
                            {...register("pw_con", {
                                required: "確認のためパスワードを再度入力して下さい",
                                validate: (value) => value === getValues("pw") || "パスワードが一致しません"
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name='pw_con'
                            render={({ message }) => <p className="error-message">{message}</p>}
                        />
                    </div>
                    <div className='button-container'>
                        <button type="submit" className='main-button'>登録</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </main>
    );
};

export default SignUp;
