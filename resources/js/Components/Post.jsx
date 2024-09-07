import * as React from "react";
import { Card, CardContent, CardFooter } from "@/Components/card";
import { Button } from "@/Components/button";
import Waveform from "@/Components/Wave";
import {
    Heart,
    MoreHorizontal,
    MessageCircle,
    Share2,
    Download,
} from "@geist-ui/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { ProfileHeader } from "@/Components/ProfileHeader";

// Ejemplo de publicación con una fecha de publicación
const examplePost = {
    username: "Wandorius",
    imagenperfil:
        "https://2upra.com/wp-content/uploads/2024/09/1ndoryu_1725478496.webp",
    content: "Este es un post de ejemplo con una imagen y un audio.",
    audio: "/ACAPELLA @VIOLENCIA MANE (6).wav",
    likes: 120,
    comments: 15,
    postId: 1,
    waveCargada: false,
    timestamp: new Date(2024, 8, 5, 12, 30), // Fecha de ejemplo (año, mes, día, hora, minuto)
};

export function SocialPostCard() {
    const timeAgo = formatDistanceToNow(examplePost.timestamp, {
        addSuffix: true,
    });

    return (
        <Card className="max-w-[600px] w-[600px] my-4 bg-background rounded-lg overflow-hidden relative">
            {examplePost.image && (
                <>
                    <div
                        className="absolute inset-0 bg-center bg-cover"
                        style={{ backgroundImage: `url(${examplePost.image})` }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
                </>
            )}

            <div className="relative z-10">
                <div className="flex items-center justify-between p-6">
                    <ProfileHeader
                        username={examplePost.username}
                        imagenperfil={examplePost.imagenperfil}
                        timestamp={examplePost.timestamp}
                        imageSize={40} 
                        fontSize="16px"
                        showTime={true} 
                    />
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreHorizontal className="w-5 h-4 mr-1" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Prueba 1</DropdownMenuItem>
                                <DropdownMenuItem>Prueba 2</DropdownMenuItem>
                                <DropdownMenuItem>Prueba 3</DropdownMenuItem>
                                <DropdownMenuItem>Prueba 4</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <CardContent>
                    <p>{examplePost.content}</p>

                    {examplePost.audio && (
                        <div className="my-4">
                            <Waveform
                                audioSrc={examplePost.audio}
                                postId={examplePost.postId}
                                waveCargada={examplePost.waveCargada}
                            />
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        className="text-white bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30"
                    >
                        <Heart className="w-5 h-4 mr-1" />
                        {examplePost.likes}
                    </Button>

                    <Button
                        variant="outline"
                        className="text-white bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30"
                    >
                        <MessageCircle className="w-5 h-4 mr-1" />
                        {examplePost.likes}
                    </Button>

                    <Button
                        variant="outline"
                        className="text-white bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30"
                    >
                        <Share2 className="w-5 h-4 mr-1" />
                        {examplePost.likes}
                    </Button>

                    <Button
                        variant="outline"
                        className="text-white bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30"
                    >
                        <Download className="w-5 h-4" />
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}
