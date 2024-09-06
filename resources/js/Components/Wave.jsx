import React, { useEffect, useRef, useState, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";

const Waveform = ({ audioSrc, postId, waveCargada }) => {
    const containerRef = useRef(null);
    const waveSurferRef = useRef(null);
    const [audioLoaded, setAudioLoaded] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const initWavesurfer = useCallback(() => {
        const container = containerRef.current;
        const containerHeight = container.classList.contains("waveform-container-venta") ? 60 : 102;
        const ctx = document.createElement("canvas").getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 500);
        const progressGradient = ctx.createLinearGradient(0, 0, 0, 500);
        [gradient, progressGradient].forEach((g) => {
            ["0", "0.55", "0.551", "0.552", "0.553", "1"].forEach((stop) => {
                g.addColorStop(parseFloat(stop), g === gradient ? "#FFFFFF" : "#d43333");
            });
        });

        return WaveSurfer.create({
            container: container,
            waveColor: gradient,
            progressColor: progressGradient,
            backend: "WebAudio",
            interact: true,
            barWidth: 2,
            height: containerHeight,
            partialRender: true,
        });
    }, []);

    const loadAndPlayAudio = useCallback((wavesurfer, src) => {
        const container = containerRef.current;
        window.audioLoading = true;
        container.querySelector(".waveform-loading").style.display = "block";
        container.querySelector(".waveform-message").style.display = "none";

        const waveformBackground = container.querySelector(".waveform-background");
        if (waveformBackground) {
            waveformBackground.style.display = "none";
        }

        wavesurfer.load(src);

        wavesurfer.on("ready", () => {
            window.audioLoading = false;
            setAudioLoaded(true);
            container.querySelector(".waveform-loading").style.display = "none";
        });

        wavesurfer.on("error", () => {
            setTimeout(() => loadAndPlayAudio(wavesurfer, src), 3000);
        });
    }, []);

    useEffect(() => {
        if (!initialized && containerRef.current) {
            const container = containerRef.current;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !initialized) {
                            const wavesurfer = initWavesurfer();
                            waveSurferRef.current = wavesurfer;

                            if (audioSrc) {
                                loadAndPlayAudio(wavesurfer, audioSrc);
                            }

                            setInitialized(true);
                            observer.unobserve(container);
                        }
                    });
                },
                { rootMargin: "0px", threshold: 0.1 }
            );

            observer.observe(container);
        }
    }, [audioSrc, initialized, initWavesurfer, loadAndPlayAudio]);

    const handleClick = () => {
        if (waveSurferRef.current) {
            if (!audioLoaded) {
                loadAndPlayAudio(waveSurferRef.current, audioSrc);
            } else {
                waveSurferRef.current.playPause();
            }
        }
    };

    return (
        <div
            ref={containerRef}
            id={`waveform-${postId}`}
            data-audio-url={audioSrc}
            data-wave-cargada={waveCargada}
            onClick={handleClick}
        >
            <div className="waveform-loading">Loading...</div>
            <div className="waveform-message">Click to play</div>
            <div className="waveform-background"></div>
        </div>
    );
};

export default Waveform;

/* if (!waveCargada) {
                        setTimeout(() => {
                            const image = generateWaveformImage(wavesurfer);
                            sendImageToServer(image, postId);
                        }, 1); 
                    }*/

/* const generateWaveformImage = (wavesurfer) => {
                const canvas = wavesurfer.getWrapper().querySelector('canvas');
                return canvas.toDataURL('image/png');
            };

            const sendImageToServer = async (imageData, postId) => {
                if (imageData.length < 100) {
                    console.error('Los datos de la imagen parecen ser demasiado cortos');
                    return;
                }

                const byteString = atob(imageData.split(',')[1]);
                const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeString });

                const formData = new FormData();
                formData.append('action', 'save_waveform_image');
                formData.append('image', blob, 'waveform.png');
                formData.append('post_id', postId);

                try {
                    const response = await fetch('/your-endpoint-url', {
                        method: 'POST',
                        body: formData
                    });

                    const data = await response.json();

                    if (data.success) {
                        console.log('Imagen guardada exitosamente:', data.message);
                    } else {
                        console.error('Error al guardar la imagen:', data.message);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            }; */
