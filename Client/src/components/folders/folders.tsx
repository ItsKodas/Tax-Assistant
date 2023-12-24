import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './folders.module.scss';
import * as Common from '../../lib/common';
import { FolderCard } from '../folder-card/folder-card';

export interface FoldersProps {
    className?: string;
}


export const Folders = ({ className }: FoldersProps) => {

    const [folders, setFolders] = useState([{ name: 'Loading...', description: '' }]);
    const [createName, setCreateName] = useState('');

    const handleChange = (event: any) => {
        setCreateName(event.target.value);
    };


    useEffect(() => {
        setInterval(fetchFolders, 5000), fetchFolders();
    }, []);

    const fetchFolders = () => fetch(`http://localhost:3000/api/folders?token=${Common.getCookie('token')}`)
            .then(res => res.json())
            .then(json => {
                if (json.error) return console.error(json.error);
                if (!json.data) return console.error('Folder data empty!');
                setFolders(json.data);
            })

    const CreateFolder = () => {
        if (!createName) return;

        fetch(`http://localhost:3000/api/folders?token=${Common.getCookie('token')}&mode=create&data=${createName}`, { method: 'POST' })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.error) return alert(json.error);
                setCreateName('');
                fetchFolders();
            })
            .catch(err => { alert(err), console.error(err) });
    }


    const FolderCardArray = ({ data }: any) => {
        return data.map((info: any, index: number) => {
            return (<FolderCard folder={info.name} description={info.description} refresh={fetchFolders} key={index} />)
        })
    };
    


    return (
        <div className="flex flex-col gap-5 ">
            <div className="h-[80vh] w-[400px] overflow-scroll overflow-x-hidden bg-gray-200 p-3">
                <FolderCardArray data={folders} />
            </div>
            <div className="flex justify-center gap-2">
                <input type="text" className="p-2 w-full" placeholder="Folder Name" value={createName} onChange={handleChange} onKeyDown={(e) => { if (e.code == 'Enter') CreateFolder(); }} />
                <button type="button" className="p-2" onClick={CreateFolder}>Create</button>
            </div>
        </div>
    );
};