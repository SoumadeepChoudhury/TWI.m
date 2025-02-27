import { useEffect, useState } from "react";
import { Add } from "../add/add";
import { Navbar } from "../navbar/navbar"
import { Seen } from "../seen/seen"
import { Unseen } from "../unseen/unseen"
import Cookies from "js-cookie"

export function Home() {
    const [data, setData] = useState([]);

    async function fetchData() {
        const resp = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sql: `SELECT * FROM DATA` })
        });

        const data = await resp.json();
        setData(data.data.reverse());
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            {Cookies.get("role") == "Monitor" ? < Unseen data={data} setData={setData} /> : <Add data={data} setData={setData} />};
            <Seen data={data} />
        </div>
    )
}