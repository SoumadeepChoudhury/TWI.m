import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";

const CREATE_TABLE_USERS_SQL = "CREATE TABLE IF NOT EXISTS USERS(email VARCHAR(50),username VARCHAR(50) PRIMARY KEY, password VARCHAR(50),role VARCHAR(50));";
const CREATE_TABLE_DATA_SQL = "CREATE TABLE IF NOT EXISTS DATA(date VARCHAR(50) PRIMARY KEY,twi VARCHAR(50), recordedby VARCHAR(50), checkedby VARCHAR(50));";

export async function POST(req) {
    try {
        const db = await createConnection();
        await db.query(CREATE_TABLE_USERS_SQL);
        await db.query(CREATE_TABLE_DATA_SQL);
        const { sql } = await req.json();
        const [rows] = await db.query(sql);
        return NextResponse.json({ data: rows });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }

}