import * as React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/card";
import { Button } from "@/Components/button";

// Datos de ejemplo para simular un post
const examplePost = {
    username: "JohnDoe",
    content: "Este es un post de ejemplo con una imagen y un audio.",
    image: "https://via.placeholder.com/150",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    likes: 120,
    comments: 15,
};

export function SocialPostCard() {
    return (
        <Card className="w-[500px] my-4">
            <CardHeader>
                <CardTitle>{examplePost.username}</CardTitle>
            </CardHeader>

            <CardContent>
                {/* Contenido del post */}
                <p>{examplePost.content}</p>

                {/* Mostrar imagen si existe */}
                {examplePost.image && (
                    <div className="my-4">
                        <img
                            src={examplePost.image}
                            alt="Post content"
                            className="w-full rounded-md"
                        />
                    </div>
                )}

                {/* Mostrar audio si existe */}
                {examplePost.audio && (
                    <div className="my-4">
                        <audio controls>
                            <source src={examplePost.audio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between">
                {/* Contador de likes y comentarios */}
                <div>
                    <span>{examplePost.likes} Likes</span> |{" "}
                    <span>{examplePost.comments} Comments</span>
                </div>

                {/* Botón para interactuar con el post */}
                <Button variant="outline">Like</Button>
            </CardFooter>
        </Card>
    );
}
