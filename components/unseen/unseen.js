import { useEffect, useState } from 'react';
import { Card } from '../cards/cards';
import './styles.css';

export function Unseen({ data, setData }) {
    const [checker, setChecker] = useState(0);
    async function getLengthOfUnseenData() {
        const resp = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sql: `SELECT COUNT(*) AS total FROM DATA WHERE checkedby IS NULL;` })
        });
        const data_ = await resp.json();
        if (data_.data != undefined)
            setChecker(data_.data[0].total);
    }
    useEffect(() => { getLengthOfUnseenData(); }, [])
    return (
        <div className='unseen'>
            <h1 className='section-heading'>Unseen</h1>
            <div className='cards-list'>
                {data.length > 0 ? data.map((row, index) => (
                    row.checkedby === null ?
                        <Card key={index} date={row.date} twi={row.twi} recordedBy={row.recordedby} data={data} setData={setData} index={index} getLengthOfUnseenData={getLengthOfUnseenData} /> : null
                )) : null}
            </div>
            {data.length == 0 || checker == 0 ? <center><h3 style={{ color: 'white' }}>No New Data</h3></center> : null};
        </div>
    )
}