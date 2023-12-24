import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './home.module.scss';

export interface HomeProps {
    className?: string;
}

export const Home = ({ className }: HomeProps) => {

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};
