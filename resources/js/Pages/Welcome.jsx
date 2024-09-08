import { Link, Head, usePage } from "@inertiajs/react";
import { SocialPostCard } from "@/Components/Post";
import { ProfileForm } from "@/Components/formpost";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/Components/TabsVertical";
import React, { useState, useEffect } from "react";
import CreateTask from '@/Components/Tasks/CreateTask';
import ViewTask from '@/Components/Tasks/ViewTask';
import TaskManager from "@/Components/Tasks/TaskManager";

export default function Welcome({ }) {
    const { auth } = usePage().props;
    const handleTaskCreated = (task) => {
        console.log('Task created:', task);
    };
    const taskId = 1;
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
                            <TabsTrigger value="tab1">Samples</TabsTrigger>
                            <TabsTrigger value="tab2">Test</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1">
                            <div className="flex flex-col items-center justify-center m-auto max-w-[600px]">
                                <div className="w-full mt-5 mb-0 text-left">
                                    <div>
                                        {auth.user && (
                                            <p>User ID: {auth.user.id}</p>
                                        )}
                                    </div>
                                    <h2>1. Gestión de samples</h2>
                                    <p>
                                        Esta es la principal fuente de valor del
                                        proyecto y la más importante, por lo
                                        tanto es la primera en la que se debería
                                        de trabajar. Para que sea realmente
                                        especial, no solo desde la publicación,
                                        sino desde su distribución y búsqueda
                                        deben de ofrecer una experiencia
                                        irrepetible en cualquier otra
                                        plataforma.
                                    </p>
                                </div>

                                <div className="w-full mt-5 mb-5 text-left">
                                    <h3>1.1 Formulario de sample</h3>
                                    <p>
                                        Esta es la herramienta principal de los
                                        artistas, lo que le permitirá compartir
                                        sus trabajos, conseguir colaboraciones y
                                        presentarse ante sus fans.
                                    </p>

                                </div>

                                <ProfileForm />

                                <div className="w-full mt-5 mb-5 text-left">
                                    <h4>1.1.1 Conexión al backend</h4>
                                    <p>
                                        Al publicar un sample debe generase una
                                        publicación adjunto al usuario que
                                        contenga los archivos que subio, y toda
                                        la información que proporcionó. <br />
                                        <br />
                                    </p>
                                    <TaskManager descriptions={[
                                        'Implementar validación de archivos subidos',
                                        'Desarrollar lógica de detección de tipo de publicación',
                                        'Crear sistema de procesamiento de audio',
                                        'Implementar almacenamiento de archivos en servidor',
                                        'Desarrollar detección de audios duplicados',
                                        'Crear API para manejo de publicaciones',
                                        'Integrar formulario con backend',
                                        'Implementar manejo de errores y notificaciones',
                                        'Optimizar rendimiento de carga y procesamiento',
                                        'Realizar pruebas de integración y seguridad'
                                    ]} />
                                    <TaskManager descriptions={['Tarea 1', 'Tarea 2', 'Tarea 3']} />
                                </div>
                                <SocialPostCard />
                            </div>
                        </TabsContent>
                        <TabsContent value="tab2"></TabsContent>
                        <TabsContent value="tab3">
                            <p>Contenido del Tab 3</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
