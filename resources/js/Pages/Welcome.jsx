import { Link, Head, usePage } from "@inertiajs/react";
import React from "react";
import { SocialPostCard } from "@/Components/Post";
import { ProfileForm } from "@/Components/formpost";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/Components/TabsVertical";
import TaskManager from "@/Components/Tasks/TaskManager";
import PostsTable from "@/Components/TableSamples/PostTable";
import MediaTable from "@/Components/TableSamples/MediaTable";
import SamplesTable from "@/Components/TableSamples/SamplesTable";

export default function Welcome({ }) {
    const { auth } = usePage().props;
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen bg-center sm:flex sm:justify-center sm:items-center bg-dots-darker dark:bg-dots-lighter bg-origin-content selection:bg-red-500 selection:text-white">
                <div className="p-6 sm:fixed sm:top-0 sm:right-0 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="font-semibold text-gray-600 ms-4 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex flex-col w-full">
                    <Tabs
                        className="flex flex-row items-center w-full p-5"
                        defaultValue="tab1"
                    >
                        <TabsList className="fixed top-[20px] left-[20px]">
                            <TabsTrigger value="Intro">1. Introducción</TabsTrigger>
                            <TabsTrigger value="Tablas">2. Tablas</TabsTrigger>
                            <TabsTrigger value="PDC">3. Publicación de contenido</TabsTrigger>
                        </TabsList>
                        <TabsContent value="INTRO">
                            <div className="flex flex-col items-center justify-center m-auto max-w-[600px]">
                            </div>
                        </TabsContent>
                        <TabsContent value="Tablas">
                            <div className="flex flex-col items-center justify-center m-auto max-w-[600px]">
                                <div className="w-full mt-5 mb-5 text-left">
                                    <h4>2.1. Tabla de posts</h4>
                                    <PostsTable />
                                </div>
                                <div className="w-full mt-5 mb-5 text-left">
                                    <h4 >2.2. Tabla de medios</h4>
                                    <MediaTable />
                                </div>
                                <div className="w-full mt-5 mb-5 text-left">
                                    <h4>2.3. Tabla Samples</h4>
                                    <SamplesTable />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="PDC">
                            <div className="flex flex-col items-center justify-center m-auto max-w-[600px]">
                                <div className="w-full mt-5 mb-5 text-left">
                                    <h2>3. Publicación de contenido</h2>
                                    <p>
                                        Se explicará brevemente el como debe funcionar el sistema de publicacion
                                    </p>
                                </div>

                                <ProfileForm />

                                <div className="w-full mt-5 mb-5 text-left">
                                    <h3>3.1 Tareas principales</h3>
                                    <p>
                                    </p>
                                    <TaskManager id="taskSample" descriptions={[
                                        'Definir base datos de Post, medios, y samples',
                                        'Terminar IU de formulario de publicación de contenido',
                                        'Completar funciones necesarias para la publicación de contenido (3.2)',
                                        'El formulario crea y cumple todas las funciones necesarias'
                                    ]} />
                                    <TaskManager id="ejemplo" descriptions={['tarea 1', 'tarea 2', 'tarea 3']}/>
                                </div>

                                <div className="w-full mt-5 mb-5 text-left">
                                    <h3>3.2 Funciones necesarias para la publicación de contenido</h3>
                                    <p>
                                        Al publicar un sample debe generase una publicación adjunto al usuario que contenga los archivos que subio, y toda la información que se proporcionó. <br /><br />
                                    </p>
                                    <TaskManager id="taskSample" descriptions={[
                                        'Validación de archivos correctas del lado de servidor, solo permitir imagenes, audios, y archivo de formato especificos (3.2.1)',
                                        'Desarrollar lógica de detección de tipo de publicación',
                                        'Implementar almacenamiento de archivos en servidor',
                                        'Desarrollar detección de audios duplicados',
                                        'Implementar manejo de errores y notificaciones',
                                        'Optimizar rendimiento de carga y procesamiento',
                                        'Realizar pruebas de integración y seguridad'
                                    ]} />
                                </div>
                                <div className="w-full mt-5 mb-5 text-left">
                                    <h4>3.2.1 Tipos de formatos de archivos </h4>
                                    <p> 
                                        $mimes['flp'] = 'application/octet-stream';<br />
                                        $mimes['zip'] = 'application/zip';<br />
                                        $mimes['rar'] = 'application/x-rar-compressed';<br />
                                        $mimes['cubase'] = 'application/octet-stream';<br />
                                        $mimes['proj'] = 'application/octet-stream';<br />
                                        $mimes['aiff'] = 'audio/aiff';<br />
                                        $mimes['midi'] = 'audio/midi';<br />
                                        $mimes['ptx'] = 'application/octet-stream';<br />
                                        $mimes['sng'] = 'application/octet-stream';<br />
                                        $mimes['aup'] = 'application/octet-stream';<br />
                                        $mimes['omg'] = 'application/octet-stream';<br />
                                        $mimes['rpp'] = 'application/octet-stream';<br />
                                        $mimes['xpm'] = 'image/x-xpixmap';<br />
                                        $mimes['tst'] = 'application/octet-stream'; <br />
                                        <br />
                                    </p>
                                </div>
                                <SocialPostCard />
                            </div>
                        </TabsContent>

                    </Tabs>
                </div>
            </div>
        </>
    );
}
