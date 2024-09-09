import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/Components/Table"; // Ajusta la ruta según sea necesario

const PostsTable = () => {
  // Datos de ejemplo
  const posts = [
    {
      id: 1,
      user_id: 101,
      type: "Post",
      content: "Este es el primer post, solo es texto",
      created_at: "2024-09-01 10:00:00",
    },
    {
      id: 2,
      user_id: 102,
      type: "Post",
      content: "Este es el segundo post con una imagen",
      created_at: "2024-09-02 11:30:00",
    },
    {
      id: 3,
      user_id: 103,
      type: "Sample",
      content: "Este post contiene un sample c:",
      created_at: "2024-09-03 14:45:00",
    },
  ];

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.user_id}</TableCell>
                <TableCell>{post.type}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.created_at}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center">
                No posts available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;