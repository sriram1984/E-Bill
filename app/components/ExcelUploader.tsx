"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelUploader() {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      console.log(data);
      setJsonData(data as any[]);
    };
    reader.readAsBinaryString(file);
  };
  const handleUploadToDB = async () => {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    });

    const result = await res.json();
    if (result.success) {
      alert(`Successfully inserted ${result.inserted} rows to MongoDB`);
    } else {
      alert("Failed to upload");
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        <label
          htmlFor="excel-upload"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload Excel File
        </label>
        <input
          id="excel-upload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
        />
      </div>

      {jsonData.length > 0 && (
        <button
          onClick={handleUploadToDB}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save to MongoDB
        </button>
      )}
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
    </div>
  );
}
