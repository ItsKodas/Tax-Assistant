import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './login.module.scss';

export interface LoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

export const Login = ({ setIsLoggedIn }: LoginProps) => {
    const [password, setPassword] = useState('');
    const handleChange = (event: any) => {
        setPassword(event.target.value);
    };

    const Login = () => {
        if (!password) return;

        fetch(`http://localhost:3000/login?password=${password}`, {
            method: 'POST',
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.error) return alert(json.error);
                document.cookie = `token=${json.token}`;
                setIsLoggedIn(true);
            });
    };

    return (
        <div className={styles['login-layout']}>
            <div>
                <h1 className="text-5xl">Tax Assistant</h1>
                <h5 className="text-right">Version 1.0</h5>
            </div>
            <form className="flex gap-1" onSubmit={Login}>
                <input
                    type="password"
                    autoFocus={true}
                    placeholder={'Password'}
                    required={true}
                    id={'password'}
                    onChange={handleChange}
                    className={styles['login-textbox']}
                />
                <button type="button" onClick={Login} className="w-full">
                    Login
                </button>
            </form>
        </div>
    );
};
