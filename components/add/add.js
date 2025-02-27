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
            // onSubmit({ date: selectedDate, twi: twi });
            var formattedDate = selectedDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
            await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sql: `INSERT INTO DATA(date, twi, recordedby) VALUES('${formattedDate}','${twi}','${Cookies.get("username")}')` })
            });

            setData([{ date: formattedDate, twi: twi }, ...data]);
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