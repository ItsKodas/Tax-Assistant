import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './tax-list.module.scss';
import * as Common from '../../lib/common';
import { TableRow } from './table-row'

export interface TaxListProps {
    className?: string;
}

export const TaxList = ({ className }: TaxListProps) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [folderDescription, setFolderDescription] = useState('No description found...');

    const [folderReceipts, setFolderReceipts] = useState([{ date: 'N/A', type: 'N/A', vendor: 'N/A', description: 'N/A', value: 0, gst: 0 }]);

    const [taxDate, setTaxDate] = useState();
    const [taxType, setTaxType] = useState('');
    const [taxVendor, setTaxVendor] = useState('');
    const [taxDescription, setTaxDescription] = useState('');
    const [taxValue, setTaxValue] = useState(0);
    const [taxGST, setTaxGST] = useState(0);

    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);


    const handleChange = (event: any) => {
        switch (event.target.name) {
            case 'updateDescription': setFolderDescription(event.target.value); break;
            case 'date': setTaxDate(event.target.value); break;
            case 'type': setTaxType(event.target.value); break;
            case 'vendor': setTaxVendor(event.target.value); break;
            case 'description': setTaxDescription(event.target.value); break;
            case 'value': setTaxValue(event.target.value); break;
            case 'gst': setTaxGST(event.target.value); break;
        }
    };

    const Folder = searchParams.get('folder');


    const TableUpdate = () => {
        FetchData()
            .then((data: any) => {
                setFolderReceipts(data.receipts.data)
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {

        if (!Folder) document.location.href = '/folders';

        FetchData()
            .then((data: any) => setFolderDescription(data.index.description))
            .catch((err) => console.error(err));

        setInterval(TableUpdate, 10 * 1000), TableUpdate();

    }, [Folder]);


    const FetchData = () => {
        return new Promise((resolve, reject) => {

            fetch(`http://localhost:3000/api/tax-list?token=${Common.getCookie('token')}&folder=${Folder}`)
                .then(res => res.json())
                .then(json => {
                    if (json.error) return document.location.href = '/folders';
                    if (!json.data) return reject('Folder data empty!');

                    resolve(json.data);
                })

        })
    };


    const UpdateDescription = () => {
        fetch(`http://localhost:3000/api/tax-list?token=${Common.getCookie('token')}&folder=${Folder}&mode=update&data=${folderDescription}`, { method: 'POST' })
            .then(res => res.json())
            .then(json => {
                if (json.error) return console.error(json.error);

                alert(`Successfully updated description for "${Folder}"!`);
            })
    };


    const InsertReceipt = () => {

        const Data = {
            date: taxDate,
            type: taxType,
            vendor: taxVendor,
            description: taxDescription,
            value: taxValue,
            gst: taxGST
        }

        if (!Data.date || !Data.value) return alert('Date and Value are both required!');

        fetch(`http://localhost:3000/api/tax-list?token=${Common.getCookie('token')}&folder=${Folder}&mode=insert&data=${JSON.stringify(Data)}`, { method: 'POST' })
            .then(res => res.json())
            .then(json => {
                if (json.error) return console.error(json.error);
                TableUpdate();
            })
    };


    const TableRowArray = ({ receipts }: any) => {
        return receipts.map((receipt: any, index: number) => {
            return (<TableRow receipt={receipt} folder={Folder!} refresh={TableUpdate} key={index} />)
        })
    };


    const uploadToClient = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    }


    return (
        <>
            <div className="flex justify-center gap-2 m-10">
                <table className="block border border-black overflow-scroll overflow-x-hidden max-h-[50vh]">

                    <tr className="border border-black border-solid sticky top-0 bg-white">
                        <th className="p-2 border border-black">Date</th>
                        <th className="p-2 border border-black">Type</th>
                        <th className="p-2 border border-black">Vendor</th>
                        <th className="p-2 border border-black">Value</th>
                        <th className="p-2 border border-black">GST</th>
                        <th className="p-2 border border-black">Description</th>
                    </tr>

                    <TableRowArray receipts={folderReceipts} />

                </table>

                <form className="flex flex-col justify-center gap-2">
                    <div className={styles['insert-div']}>
                        <label htmlFor="date">Date*</label>
                        <input className={styles['input-field']} type="date" name="date" onChange={handleChange} required />
                    </div>
                    <div className={styles['insert-div']}>
                        <label htmlFor="type">Type</label>
                        <input className={styles['input-field']} type="text" name="type" placeholder="Fuel, Clothing, etc" onChange={handleChange} />
                    </div>
                    <div className={styles['insert-div']}>
                        <label htmlFor="vendor">Vendor</label>
                        <input className={styles['input-field']} type="text" name="vendor" placeholder="Woolies, etc..." onChange={handleChange} />
                    </div>
                    <div className={styles['insert-div']}>
                        <label htmlFor="description">Description</label>
                        <input className={styles['input-field']} type="text" name="description" placeholder="This purchase is for..." onChange={handleChange} />
                    </div>
                    <div className={styles['insert-div']}>
                        <label htmlFor="value">Value*</label>
                        <input className={styles['input-field']} type="number" step=".01" name="value" placeholder="$0.00" onChange={handleChange} required />
                    </div>
                    <div className={styles['insert-div']}>
                        <label htmlFor="gst">GST</label>
                        <input className={styles['input-field']} type="number" step=".01" name="gst" placeholder="$0.00" onChange={handleChange} />
                    </div>
                </form>

                <button type="button" className="p-5" onClick={InsertReceipt}>Insert</button>
                <button type="button" className="p-5 text-2xl" onClick={() => document.getElementById('image-upload')?.click() }>📸</button>

                <input id='image-upload' type="file" accept="image/*" capture="environment" hidden />
            </div>

            <div className="flex flex-col justify-center gap-2 m-10">
                <input type="text" className="p-2 w-full" placeholder="Description of this folder." value={folderDescription} onChange={handleChange} onKeyDown={(e) => { if (e.code == 'Enter') UpdateDescription() }} />

                <div className='flex justify-center gap-2'>
                    <button type="button" className="p-2" name="updateDescription" onClick={UpdateDescription}>Update Description</button>
                    <button type="button" className="p-2">Delete Folder</button>
                </div>
            </div>
        </>
    );
};
