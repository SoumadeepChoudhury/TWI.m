import Cookies from 'js-cookie';
import './styles.css';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Add({ data, setData }) {
    const [twi, setTwi] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSubmit = async () => {
        if (twi.trim() !== "") {
            var formattedDate = selectedDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
            var isThere = false;
            data.map((d) => {
                if (d.date == formattedDate)
                    isThere = true;
            })
            if (!isThere && twi > 0) {
                const resp = await fetch("/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ sql: `INSERT INTO DATA(date, twi, recordedby) VALUES('${formattedDate}','${twi}','${Cookies.get("username")}')` })
                });
                const data_ = await resp.json();
                try {
                    console.log(data_.data['affectedRows'] == 1);
                    if ("error" != Object.keys(data_) && data_.data['affectedRows'] == 1)
                        setData([{ date: formattedDate, twi: twi }, ...data]);
                } catch (e) { }
            } else {
                alert(twi <= 0 ? "Enter valid TWI data..." : "Data already exists on this date...")
            }
            setTwi("");
        }
    };

    return (
        <div className='add'>
            <h1 className='section-heading'>Add</h1>
            <div className="twi-card">
                <div className="twi-card-content">
                    <h3 className="twi-card-title">Enter TWI Data</h3>

                    <div className="date-picker">
                        <label>Select Date: <br /></label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="MMM dd, yyyy"
                        />
                    </div>
                    <div className="input-container">
                        <input type="number"
                            placeholder="Enter TWI value"
                            value={twi}
                            onChange={(e) => setTwi(e.target.value)} />
                        <span className="suffix">L</span>
                    </div>

                    <button className="twi-submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}