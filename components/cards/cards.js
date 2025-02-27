import Cookies from 'js-cookie';
import './styles.css'

export function Card({ date, twi, recordedBy, data, setData, index, getLengthOfUnseenData }) {
    async function markChecked() {
        await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sql: `UPDATE DATA SET checkedby = '${Cookies.get("username")}' WHERE date = '${date}';` })
        });
        data[index].checkedby = Cookies.get("username");
        setData([...data]);
        getLengthOfUnseenData();
    }
    return (
        <div className="card">
            <div className="card-content">
                <h3 className="card-title">{date}</h3>
                <p className="card-description">
                    TWI: {twi} L
                </p>
                <p className="card-description">
                    Recorded By: {recordedBy}
                </p>
                <button className="card-button" onClick={markChecked}><span className='material-icons'>done_outline</span></button>
            </div>
        </div>
    );
}