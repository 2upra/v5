import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/Components/Table";

const MediaTable = () => {
    // Datos de ejemplo
    const mediaItems = [
        {
            id: 1,
            post_id: 101,
            type: "Image",
            path: "media/image1.jpg",
            created_at: "2024-09-01 12:00:00",
        },
        {
            id: 2,
            post_id: 102,
            type: "Video",
            path: "media/video1.mp4",
            created_at: "2024-09-02 13:30:00",
        },
        {
            id: 3,
            post_id: 103,
            type: "Audio",
            path: "media/audio1.mp3",
            created_at: "2024-09-03 15:45:00",
        },
    ];

    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Post ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mediaItems.length > 0 ? (
                        mediaItems.map((media) => (
                            <TableRow key={media.id}>
                                <TableCell>{media.id}</TableCell>
                                <TableCell>{media.post_id}</TableCell>
                                <TableCell>{media.type}</TableCell>
                                <TableCell>
                                    {media.path}
                                </TableCell>
                                <TableCell>{media.created_at}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="5" className="text-center">
                                No media items available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MediaTable;