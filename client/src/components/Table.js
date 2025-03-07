"use client";

import { useState, useEffect } from "react";
import API from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("text");

  const userName = localStorage.getItem("userName") || "guest"

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/sheets/data");

        if (res.data.length > 0) {
          const sheetColumns = res.data[0].map((col, index) => ({
            id: index,
            name: col,
            type: "text",
          }));

          const savedColumns = JSON.parse(localStorage.getItem("customColumns")) || [];

          setColumns([...sheetColumns, ...savedColumns]);
          setData(res.data.slice(1));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Add new column
  const addColumn = () => {
    if (newColumnName.trim() !== "") {
      const newColumn = { id: columns.length, name: newColumnName, type: newColumnType };

      setColumns((prev) => [...prev, newColumn]);

      const savedColumns = JSON.parse(localStorage.getItem("customColumns")) || [];
      localStorage.setItem("customColumns", JSON.stringify([...savedColumns, newColumn]));

      setNewColumnName("");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome, {userName}</h1>

      {/* Table Card */}
      <Card className="shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-4">
          <Table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-100">
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.id} className="p-3 text-left text-gray-700 font-medium">
                    {col.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i} className="odd:bg-gray-50 hover:bg-gray-100 transition">
                  {columns.map((col, j) => (
                    <TableCell key={`${i}-${j}`} className="p-3 border-b">
                      {row[j] || ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Column Section */}
      <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
        <Input
          type="text"
          placeholder="Column Name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          className="flex-1"
        />
        <Select onValueChange={setNewColumnType} defaultValue="text">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addColumn} className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg">
          + Add Column
        </Button>
      </div>
    </div>
  );
}
