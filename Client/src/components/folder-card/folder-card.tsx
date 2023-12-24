import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './folder-card.module.scss';
import * as Common from '../../lib/common'

export interface FolderCardProps {
    folder: string;
    description?: string;
    refresh?: () => void;
    className?: string;
}

export const FolderCard = ({ folder, description, refresh }: FolderCardProps) => {

    const Confirmation = () => {
        if (confirm(`Are you sure you want to delete "${folder}"?\nAll information stored in this folder will be deleted forever!`)) DeleteFolder();
    }

    const DeleteFolder = () => {
        fetch(`http://localhost:3000/api/folders?token=${Common.getCookie('token')}&mode=delete&data=${folder}`, { method: 'POST' })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error) return alert(json.error);
                if (refresh) refresh();
            })
            .catch(err => { alert(err), console.error(err) });
    }


    return (
        <div className="mb-3 flex h-[80px] w-[360px] justify-between border gap-2 border-gray-300 bg-gray-100">
            <p className="ml-2 flex cursor-pointer flex-col justify-center">
                <button className="p-2" onClick={Confirmation}>❌</button>
            </p>

            <Link className='w-full cursor-pointer' to={{ pathname: '/tax-list', search: `?folder=${folder}` }}>
                <div className="p-2 text-right">
                    <b>{folder || 'N/A'}</b>
                    <p className="italic">{description || 'No description set.'}</p>
                </div>
            </Link>
        </div>
    );
};
