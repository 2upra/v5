import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/Components/Tables"; 

const SamplesTable = () => {
    // Datos de ejemplo
    const samples = [
        {
            id: 1,
            media_id: 201,
            bpm: 120,
            quality: "High",
            duration: 180, // en segundos
            created_at: "2024-09-01 14:00:00",
        },
        {
            id: 2,
            media_id: 202,
            bpm: 90,
            quality: "Medium",
            duration: 240, // en segundos
            created_at: "2024-09-02 15:30:00",
        },
        {
            id: 3,
            media_id: 203,
            bpm: 140,
            quality: "Medium",
            duration: 300, // en segundos
            created_at: "2024-09-03 16:45:00",
        },
    ];

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Media ID</TableHead>
                        <TableHead>BPM</TableHead>
                        <TableHead>Quality</TableHead>
                        <TableHead>Duration (s)</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {samples.length > 0 ? (
                        samples.map((sample) => (
                            <TableRow key={sample.id}>
                                <TableCell>{sample.id}</TableCell>
                                <TableCell>{sample.media_id}</TableCell>
                                <TableCell>{sample.bpm}</TableCell>
                                <TableCell>{sample.quality}</TableCell>
                                <TableCell>{sample.duration}</TableCell>
                                <TableCell>{sample.created_at}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="6" className="text-center">
                                No samples available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default SamplesTable;