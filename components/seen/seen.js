import './styles.css'
import Cookies from 'js-cookie';

export function Seen({ data }) {

    return <div className='unseen'>
        <h1 className='section-heading'>Seen</h1>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>TWI</th>
                        {Cookies.get("role") == "Recorder" ? <th>Status</th> : null}
                    </tr>
                </thead>
                {data.length > 0 ?
                    <tbody>
                        {data.map((row, index) => (
                            Cookies.get("role") == "Monitor" ?
                                row.checkedby != null ?
                                    <tr key={index}>
                                        <td data-label="Date">{row.date}</td>
                                        <td data-label="TWI">{row.twi}L</td>
                                    </tr> : null :
                                <tr key={index}>
                                    <td data-label="Date">{row.date}</td>
                                    <td data-label="TWI">{row.twi}L</td>
                                    <td data-label="Status">{row.checkedby == null ? "Pending" : "Checked"}</td>
                                </tr>
                        ))}
                    </tbody> : <tbody><tr><td>No Data avaiable...</td></tr></tbody>}
            </table>
        </div>
    </div>
}