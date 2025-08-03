"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

export default function ShowTableData() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/api/collections")
            .then((res) => res.json())
            .then((result) => {
                console.log('result', result)
                if (result) {
                    setData(result.collections);
                } else {
                    alert("Error fetching data");
                }
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!data.length) return <p>No data found in MongoDB.</p>;

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h2>Uplaoded Files </h2>
            <ul>
                {
                    data?.map((item, index) => {
                        return (
                            <Link href={`/dashboard/${item}`} key={index}>
                                <li >
                                    <div className="flex">
                                        <div className="px-2">{index + 1}</div>
                                        <div>{item}</div>
                                    </div>
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    );
}