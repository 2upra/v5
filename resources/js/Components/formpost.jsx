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
        <div className="p-6 border rounded-lg max-w-[600px] w-[600px]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="contenido"
                        render={({ field }) => (
                            <FormItem>
                                <div className="mb-2">
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
                                        className="w-full p-0 overflow-hidden text-sm bg-transparent border-0 resize-none placeholder-neutral-500 focus:ring-0"
                                        rows="1"
                                        placeholder="Añade tags con #"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = `${e.target.scrollHeight}px`;
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                                <div className="flex gap-2">
                                    {selectedImage && (
                                        <div className="p-4 mb-4 border rounded-lg w-[100%] items-center">
                                            <img
                                                src={selectedImage}
                                                alt="Previsualización"
                                                className="object-cover w-auto h-auto rounded-md aspect-square"
                                            />
                                        </div>
                                    )}
                                    {selectedAudio && (
                                        <div className="p-4 mb-4 border rounded-lg w-[100%] content-center">
                                            {selectedAudio && (
                                                <Waveform
                                                    audioSrc={selectedAudio}
                                                    postId="unique-post-id"
                                                    waveCargada={true}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                                <FormControl >
                                    <div className="flex items-center p-4 border rounded-md">
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
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2">
                        <ImageUpload onImageSelect={setSelectedImage} />
                        <AudioUpload onAudioSelect={setSelectedAudio} />
                        <Button
                            variant="outline"
                            className="text-white bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30"
                        >
                            <File className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="ml-auto text-white bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30"
                            type="submit"
                        >
                            Publicar
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
