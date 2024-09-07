import { useRef } from "react";
import { Button } from "@/components/button";
import { Music } from "@geist-ui/icons";

export function AudioUpload({ onAudioSelect }) {
    const audioInputRef = useRef(null);

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const audioUrl = URL.createObjectURL(file);
            onAudioSelect(audioUrl);
        }
    };

    return (
        <>
            <input
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="hidden"
                ref={audioInputRef}
            />
            <label htmlFor="audioUpload" className="cursor-pointer">
                <Button
                    variant="outline"
                    className="text-white bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30"
                    onClick={() => audioInputRef.current.click()}
                >
                    <Music className="w-4 h-4" />
                </Button>
            </label>
        </>
    );
}