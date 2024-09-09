import { useRef } from "react";
import { Button } from "@/Components/ButtonW";
import { Image } from "@geist-ui/icons";

export function ImageUpload({ onImageSelect }) {
    const imageInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            onImageSelect(imageUrl);
        }
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={imageInputRef}
            />
            <label htmlFor="imageUpload" className="cursor-pointer">
                <Button
                    variant="outline"
                    className="text-white bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-30"
                    onClick={() => imageInputRef.current.click()}
                >
                    <Image className="w-4 h-4" />
                </Button>
            </label>
        </>
    );
}