'use client'
import { useEffect, useState } from "react";



export default function ShowDetailTable(){

  const [loading, setLoading] = useState(true);
  const [data,setData]=useState([])
  useEffect(() => {
    fetch("/api/fetch-data")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        } else {
          alert("Error fetching data");
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!data.length) return <p>No data found in MongoDB.</p>;

return(
  <>
    {data.length > 0 && (
                    <div className="overflow-auto max-h-[500px] border mt-4">
                        <table className="min-w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-100">
                                    {Object.keys(data[0]).map((key) => (
                                        <th
                                            key={key}
                                            className="border px-4 py-2 text-left text-sm font-medium text-gray-700"
                                        >
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, idx) => (
                                    <tr key={idx} className="odd:bg-white even:bg-gray-50">
                                        {Object.values(row).map((value, i) => (
                                            <td key={i} className="border px-4 py-2 text-sm">
                                                {String(value)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
  </>
    )
}