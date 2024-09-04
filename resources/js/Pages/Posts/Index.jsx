import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Index({ posts }) {
    return (
        <div>
            <h1>Publicaciones</h1>
            <InertiaLink href="/posts/create">
                Crear nueva publicación
            </InertiaLink>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>Escrito por {post.user.name}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
