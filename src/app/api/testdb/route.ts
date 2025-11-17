import {connect }from "@/lib/db";


export async function GET() {
    connect();
    return new Response("Hello, Next.js!");
}