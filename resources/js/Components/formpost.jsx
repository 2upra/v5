"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import ButtonCheckbox from "@/components/ButtonCheckBox";
import { Button } from "@/components/button";
import Waveform from "@/components/Wave";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/form";
import { File, Download, Star, Triangle } from "@geist-ui/icons";
import { ProfileHeader } from "@/Components/ProfileHeader";
import { ImageUpload } from "./ImageUpload";
import { AudioUpload } from "./AudioUpload";
import { Card, CardContent, CardFooter } from "@/components/card";

const formSchema = z.object({
    contenido: z.string().min(6, {
        message: "El contenido debe tener al menos 6 caracteres.",
    }),
});

const examplePost = {
    username: "Wandorius",
    imagenperfil:
        "https://2upra.com/wp-content/uploads/2024/09/1ndoryu_1725478496.webp",
    likes: 120,
    comments: 15,
    postId: 1,
    waveCargada: false,
    timestamp: new Date(2024, 8, 5, 12, 30),
};

export function ProfileForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAudio, setSelectedAudio] = useState(null);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Card className="max-w-[600px] w-[600px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
                    <FormField
                        control={form.control}
                        name="contenido"
                        render={({ field }) => (
                            <FormItem>
                                <CardContent className="space-y-2">
                                    <div className="mt-6 mb-2">
                                        <ProfileHeader
                                            username={examplePost.username}
                                            imagenperfil={examplePost.imagenperfil}
                                            timestamp={examplePost.timestamp}
                                            imageSize={35}
                                            fontSize="16px"
                                            showTime={false}
                                        />
                                    </div>
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            className="w-full p-0 overflow-hidden text-sm bg-transparent border-0 resize-none placeholder-muted-foreground focus:ring-0"
                                            rows="1"
                                            placeholder="Añade tags con #"
                                            onInput={(e) => {
                                                e.target.style.height = "auto";
                                                e.target.style.height = `${e.target.scrollHeight}px`;
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <div className="flex gap-2 m-0">
                                        {selectedImage && (
                                            <Card className="w-full">
                                                <CardContent className="p-4">
                                                    <img
                                                        src={selectedImage}
                                                        alt="Previsualización"
                                                        className="object-cover w-auto h-auto rounded-md aspect-square"
                                                    />
                                                </CardContent>
                                            </Card>
                                        )}
                                        {selectedAudio && (
                                            <Card className="w-full">
                                                <CardContent className="p-4">
                                                    <Waveform
                                                        audioSrc={selectedAudio}
                                                        postId="unique-post-id"
                                                        waveCargada={true}
                                                    />
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                    <FormControl>
                                        <Card>
                                            <CardContent className="flex items-center p-4">
                                                <p className="font-semibold">
                                                    Opciones de publicación
                                                </p>
                                                <div className="flex gap-2 ml-auto">
                                                    <ButtonCheckbox>
                                                        <Download className="w-4 h-4" />
                                                    </ButtonCheckbox>
                                                    <ButtonCheckbox>
                                                        <Star className="w-4 h-4" />
                                                    </ButtonCheckbox>
                                                    <ButtonCheckbox>
                                                        <Triangle className="w-4 h-4" />
                                                    </ButtonCheckbox>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </FormControl>
                                </CardContent>
                            </FormItem>
                        )}
                    />
                    <CardFooter className="flex gap-2">
                        <ImageUpload onImageSelect={setSelectedImage} />
                        <AudioUpload onAudioSelect={setSelectedAudio} />
                        <Button variant="outline">
                            <File className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="default"
                            className="ml-auto"
                            type="submit"
                        >
                            Publicar
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}