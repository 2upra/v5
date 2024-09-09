import { Link, Head, usePage } from "@inertiajs/react";
import React from "react";
import { SocialPostCard } from "@/Components/Post";
import { ProfileForm } from "@/Components/formpost";
import { Button } from "@/Components/ButtonW";
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

import { DialogContent, DialogTrigger } from "@/Components/DialogComponet";
import { useDialog } from "@/Components/useDialog";

export default function Welcome({ }) {
    const { props } = usePage();
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
                        defaultValue="INTRO"
                    >
                        <TabsList className="fixed top-[20px] left-[20px]">
                            <TabsTrigger value="INTRO" className="text-xs">1. Introducción</TabsTrigger>
                            <TabsTrigger value="Tablas" className="text-xs">2. Tablas</TabsTrigger>
                            <TabsTrigger value="PDC" className="text-xs">3. Publicación de post/sample</TabsTrigger>
                            <TabsTrigger value="IC" className="text-xs">4. Interacción contenido</TabsTrigger>
                        </TabsList>

                        <TabsContent value="INTRO">
                            <div className="flex flex-col items-center justify-center m-auto max-w-[600px]">
                                <div className="w-full mt-5 mb-5 text-left">
                                    <h2>Presentación del Proyecto: 2upra</h2>

                                    <p className="mt-5">
                                        <strong>2upra</strong> es una plataforma social que busca simplificar y mejorar la experiencia de los artistas en la producción musical. Nuestro objetivo es crear un espacio donde los músicos puedan acceder fácilmente a recursos como samples, plugins VST y herramientas de colaboración, todo en un solo lugar. Además, 2upra facilita la promoción y distribución de música, permitiendo a los artistas emergentes llegar a nuevas audiencias sin complicaciones.
                                    </p>

                                    <p className="mt-5">
                                        En 2upra, los artistas pueden conectarse entre sí, colaborar en proyectos y vender o comprar samples, creando una comunidad dinámica y autosuficiente. Los fans también juegan un papel importante en nuestra plataforma, ya que pueden suscribirse a sus artistas favoritos, recibir actualizaciones exclusivas y apoyar directamente a los creadores que admiran.
                                    </p>

                                    <p className="mt-5">
                                        Nuestro enfoque principal es apoyar a los artistas emergentes, brindándoles las herramientas necesarias para destacar en la industria musical. Creemos en democratizar el acceso a la producción y promoción musical, asegurando que cada talento tenga la oportunidad de ser escuchado.
                                    </p>

                                    <h3 className="mt-5">¿Por qué existe un proyecto así?</h3>

                                    <p className="mt-5">
                                        En un mundo dominado por algoritmos, donde el éxito depende de la suerte en la viralización y de cuántos post puedes crear para posicionarte en algún trend de TikTok, surge un problema grave: el arte ya no predomina por su significado ni por su valor, sino por su capacidad de viralización. 2upra busca establecer un sistema justo que alivie la necesidad de contenido basura, no luchando contra él, sino abriendo nuevas puertas para explorar el mundo artístico musical de nuevas formas.
                                    </p>

                                    <h3 className="mt-5">¿Como puedo apoyar el proyecto?</h3>

                                    <p className="mt-5">
                                        Hemos abierto el código fuente de <strong>2upra</strong> en GitHub para que cualquier programador pueda unirse al proyecto y colaborar. Estamos abiertos a recibir donaciones o patrocinio.
                                    </p>

                                    <div className="flex gap-3">
                                        <Button variant="outline" className="mt-5" href="https://buy.stripe.com/bIY00GgtqawFbhSbIS" target="_blank" rel="noopener noreferrer">
                                            Sponsor
                                        </Button>
                                        <Button variant="outline" className="mt-5" href="https://chat.whatsapp.com/JOduGKvWGR9KbYfBS9BWGL" target="_blank" rel="noopener noreferrer">
                                            Unirte a programar
                                        </Button>
                                        <Button variant="outline" className="mt-5" href="https://github.com/2upra/V5" target="_blank" rel="noopener noreferrer">
                                            GitHub
                                        </Button>
                                    </div>
                                </div>
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
                                    <h2>3. Publicación de post/sample</h2>
                                    <p>
                                        Formulario principal para publicar samples y posts, puede ser usado independientemente del tipo de usuario, y solo para usuarios autenticados.
                                    </p>
                                </div>

                                <ProfileForm />

                                <div className="w-full mt-5 mb-5 text-left">
                                    <h3>3.1 Tareas principales</h3>
                                    <p>

                                    </p>
                                    <TaskManager id="3" descriptions={[
                                        'Definir base datos de Post, medios, y samples',
                                        'Terminar IU de formulario de publicación de contenido',
                                        'Completar funciones necesarias para la publicación de contenido',
                                    ]} />

                                </div>

                                <div className="w-full mt-5 mb-5 text-left">
                                    <h3>3.2 Funciones necesarias para la publicación de contenido</h3>

                                    <p>
                                        La plataforma debe validar los archivos permitidos (imágenes, audios, y archivos específicos) tanto en el cliente como en el servidor, clasificar automáticamente el contenido en samples, música o posts, gestionar archivos organizándolos por usuario y estableciendo límites de almacenamiento, detectar y evitar archivos duplicados mediante técnicas de hashing; permitir la carga asíncrona de archivos con un progreso visible y procesar correctamente las opciones del post. <br /><br />
                                    </p>

                                    <TaskManager id="taskSample" descriptions={[
                                        'Validación de archivos correcta',
                                        'Desarrollar lógica de detección de tipo de publicación',
                                        'Gestión de archivos subidos por usuario',
                                        'Desarrollar detección de archivos duplicados',
                                        'Subida de archivos asíncrono en el formulario',
                                        'Realizar pruebas de integración y seguridad',
                                        'Procesar opciones del post'
                                    ]} />

                                    {/* Tipos de archivos permitidos */}
                                    <DialogContent dialogId="task-126" hasDialogContent={true} inertiaProps={props}>
                                        <p className="text-xs">
                                            Implementar validación de tipos de archivo tanto en el cliente (formulario) como en el servidor. El sistema debe procesar únicamente los tipos de archivo especificados a continuación y notificar al usuario cuando intente cargar un archivo no permitido.
                                        </p>
                                        <p className="text-xs">
                                            Tipos de archivo permitidos:
                                            <br />
                                            1. Imágenes y audios: PNG, WAV, MP3, JPG, etc.
                                            <br />
                                            2. Archivos específicos:
                                            <br />
                                            <code>
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
                                                $mimes['tst'] = 'application/octet-stream';<br />
                                            </code>
                                        </p>
                                        <p className="text-xs">
                                            Recomendaciones de implementación:
                                            <br />
                                            - En el cliente: Utilizar la propiedad 'accept' en el input de tipo file y validar con JavaScript antes de enviar.
                                            <br />
                                            - En el servidor: Implementar middleware de validación de MIME types.
                                            <br />
                                            - Proporcionar mensajes de error claros y específicos para cada tipo de archivo no permitido.
                                        </p>
                                    </DialogContent>
                                    {/* Lógica de detección de archivos */}
                                    <DialogContent dialogId="task-17" hasDialogContent={true} inertiaProps={props}>
                                        <p className="text-xs">
                                            El sistema maneja tres tipos de contenido: samples, música y posts.
                                        </p>
                                        <p className="text-xs">
                                            El formulario principal está diseñado para publicar samples y posts. Para optimizar la experiencia del usuario, el formulario debe crear adicionalmente un sample cuando se detecta un archivo de audio, y adjuntar si existe una imagen como portada (cover art) a ese sample. Si no contiene Audio, simplemente solo crea un post.
                                        </p>
                                    </DialogContent>

                                    {/* Detección de archivos duplicados */}
                                    <DialogContent dialogId="task-127" hasDialogContent={true} inertiaProps={props}>
                                        <p className="text-xs">
                                            Implementar un sistema de detección de duplicados en el servidor para audios, imágenes y otros archivos.
                                        </p>
                                        <p className="text-xs">
                                            Notificar al usuario si el contenido que intenta publicar ya existe en el servidor.
                                        </p>
                                        <p className="text-xs">
                                            Sugerencia: Utilizar hashing (por ejemplo, MD5) para comparar archivos de manera eficiente.
                                        </p>
                                    </DialogContent>

                                    {/* Gestión de archivos de usuario */}
                                    <DialogContent dialogId="task-130" hasDialogContent={true} inertiaProps={props}>
                                        <p className="text-xs">
                                            Implementar un sistema de almacenamiento basado en carpetas por usuario para una gestión eficiente de archivos.
                                        </p>
                                        <p className="text-xs">
                                            Establecer un límite de almacenamiento de 1 GB por usuario. Mostrar una alerta cuando el usuario se acerque o supere este límite.
                                        </p>
                                        <p className="text-xs">
                                            Consejo: Utilizar un sistema de cuotas de disco y monitorear el uso de almacenamiento en tiempo real.
                                        </p>
                                    </DialogContent>

                                    {/* Carga de archivos en segundo plano */}
                                    <DialogContent dialogId="task-133" hasDialogContent={true} inertiaProps={props}>
                                        <p className="text-xs">
                                            Implementar un sistema de carga de archivos asíncrono en el formulario.
                                        </p>
                                        <p className="text-xs">
                                            Mostrar el progreso de carga en una esquina de la interfaz. Si se cancela la carga, eliminar el archivo temporal del servidor para evitar acumulación.
                                        </p>
                                        <p className="text-xs">
                                            Recomendación: Utilizar XMLHttpRequest o Fetch API con Promise para manejar las cargas asíncronas y mostrar el progreso.
                                        </p>
                                    </DialogContent>

                                    {/*Opciones de post */}
                                    <DialogContent dialogId="task-134" hasDialogContent={true} inertiaProps={props}>
                                        <p className="text-xs">
                                            El post tiene 3 opciones
                                        </p>
                                        <p className="text-xs">
                                            1. Para permitir la descarga del audio/sample o no permitirla.
                                        </p>
                                        <p className="text-xs">
                                            2. Para mostrar la publicación a solo suscriptores pagos.
                                        </p>
                                        <p className="text-xs">
                                            3. Para permitir recibir colaboraciones.
                                        </p>

                                    </DialogContent>

                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="IC">
                            <div className="w-full mt-5 mb-5 text-left">
                                <div className="flex flex-col items-center justify-center m-auto max-w-[600px]">
                                    <div className="w-full mt-5 text-left">
                                        <h2>4. Contenido </h2>

                                        <p>
                                            <br /><br />
                                        </p>
                                    </div>
                                    <SocialPostCard />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div >
        </>
    );
}
