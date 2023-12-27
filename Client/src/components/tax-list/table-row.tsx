import React, { useState, useEffect } from 'react';

import * as Common from '../../lib/common';

export interface TableRowProps {
    receipt: {
        uuid: string;
        date: string;
        type: string;
        vendor: string;
        description: string;
        value: number;
        gst: number;
    }
    folder: string;
    refresh: any;
    className?: string;
}

export const TableRow = ({ receipt, folder, refresh }: TableRowProps) => {

    function Delete() {
        fetch(`http://localhost:3000/api/tax-list?token=${Common.getCookie('token')}&folder=${folder}&mode=redact&data=${receipt.uuid}`, { method: 'POST' })
            .then(res => res.json())
            .then(json => {
                if (json.error) return console.error(json.error);
                refresh();
            })
    }

    return (
        <tr id={receipt.uuid}>
            <td className="p-2 border border-black border-dotted">{receipt.date}</td>
            <td className="p-2 border border-black border-dotted">{receipt.type}</td>
            <td className="p-2 border border-black border-dotted">{receipt.vendor}</td>
            <td className="p-2 border border-black border-dotted">${receipt.value}</td>
            <td className="p-2 border border-black border-dotted">${receipt.gst}</td>
            <td className="p-2 border border-black border-dotted">{receipt.description}</td>
            <td className='p-2 border border-black border-dotted'><button className='p-1' onClick={Delete}>🗑️</button></td>
        </tr>
    )

};
