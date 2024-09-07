import { Link, Head, usePage } from "@inertiajs/react";
import { SocialPostCard } from "@/Components/Post";
import { ProfileForm } from "@/Components/formpost";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/Components/TabsVertical";
import Task from "@/Components/Task";
import React, { useState, useEffect } from "react";
import TaskSection from "@/Components/TaskSection";

export default function Welcome({}) {
    const { tasks: initialTasks } = usePage().props;
    const [tasks, setTasks] = useState(initialTasks || []);
    const { auth } = usePage().props;

    const taskGroups = [
        {
            title: "Grupo 1",
            tasks: [
                { title: "Tarea 1", description: "Descripción de Tarea 1" },
                { title: "Tarea 2", description: "Descripción de Tarea 2" },
            ],
        },
        {
            title: "Grupo 2",
            tasks: [
                { title: "Tarea A", description: "Descripción de Tarea A" },
                { title: "Tarea B", description: "Descripción de Tarea B" },
                { title: "Tarea C", description: "Descripción de Tarea C" },
            ],
        },
    ];

    const handleTaskCreated = (createdTask) => {
        setTasks((prevTasks) => [...prevTasks, createdTask]);
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen bg-gray-100 bg-center sm:flex sm:justify-center sm:items-center bg-dots-darker dark:bg-dots-lighter bg-origin-content selection:bg-red-500 selection:text-white dark:bg-background">
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

                                {/* Primer grupo */}
                                <div className="w-full mt-5">
                                    <h3>{taskGroups[0].title}</h3>
                                    {taskGroups[0].tasks.map(
                                        (task, taskIndex) => (
                                            <TaskSection
                                                key={taskIndex}
                                                title={task.title}
                                                description={task.description}
                                                currentUser={auth.user}
                                                tasks={tasks}
                                                onTaskCreated={
                                                    handleTaskCreated
                                                }
                                            />
                                        )
                                    )}
                                </div>

                                {/* Algún contenido intermedio si lo deseas */}
                                <div className="w-full mt-5">
                                    <h2>Contenido intermedio</h2>
                                    <p>
                                        Aquí puedes agregar cualquier contenido
                                        que desees entre los grupos.
                                    </p>
                                </div>

                                {/* Segundo grupo */}
                                <div className="w-full mt-5">
                                    <h3>{taskGroups[1].title}</h3>
                                    {taskGroups[1].tasks.map(
                                        (task, taskIndex) => (
                                            <TaskSection
                                                key={taskIndex}
                                                title={task.title}
                                                description={task.description}
                                                currentUser={auth.user}
                                                tasks={tasks}
                                                onTaskCreated={
                                                    handleTaskCreated
                                                }
                                            />
                                        )
                                    )}
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
                                        El usuario puede publicar una imagen sin
                                        problema, o no publicar ningún archivo,
                                        el sistema debe detectar que si tiene un
                                        audio, entonces es un sample, si tiene
                                        una imagen y un audio, es un sample con
                                        su respectivo cover art, si el usuario
                                        solo sube una imagen, no es un sample
                                        logicamente, el audio no puede superar
                                        más de 50 mb, el audio debe procesarse y
                                        tener una version lite de 124 kb para
                                        reproducir, y la versión hd original en
                                        la que se subio el audio, ambas
                                        versiones deben detectarse correctamente
                                        ajuntas al post, todos los audios deben
                                        detectarse si se subieron ya al
                                        servidor, en caso de que sea un audio
                                        repetido, avisar al usuario que no puede
                                        publicarlo.
                                    </p>
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
