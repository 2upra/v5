import * as React from "react";
import { formatDistanceToNow } from "date-fns";


export function ProfileHeader({ 
    username, 
    imagenperfil, 
    timestamp = null, 
    imageSize = 40, 
    fontSize = "16px", 
    showTime = true 
}) {
    const timeAgo = timestamp ? formatDistanceToNow(new Date(timestamp), { addSuffix: true }) : null;

    return (
        <div className="flex items-center">
            <img
                src={imagenperfil}
                alt="Imagen de perfil"
                className="rounded-full"
                style={{ width: imageSize, height: imageSize }}
            />
            <div className="ml-4">
                <span className="block" style={{ fontSize }}>{username}</span>
                {showTime && timeAgo && (
                    <p className="text-sm text-gray-500">{timeAgo}</p>
                )}
            </div>
        </div>
    );
}
