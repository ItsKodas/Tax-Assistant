import React, { useState, useEffect } from 'react';

export interface TableRowProps {
    receipt: {
        date: string;
        type: string;
        vendor: string;
        description: string;
        value: number;
        gst: number;
    }
    refresh: any;
    className?: string;
}

export const TableRow = ({ receipt }: TableRowProps) => {

    return (
        <tr className="">
            <td className="p-2 border border-black border-dotted">{receipt.date}</td>
            <td className="p-2 border border-black border-dotted">{receipt.type}</td>
            <td className="p-2 border border-black border-dotted">{receipt.vendor}</td>
            <td className="p-2 border border-black border-dotted">${receipt.value}</td>
            <td className="p-2 border border-black border-dotted">${receipt.gst}</td>
            <td className="p-2 border border-black border-dotted">{receipt.description}</td>
            <td className='p-2 border border-black border-dotted'><button className='p-1'>🗑️</button></td>
        </tr>
    )

};
