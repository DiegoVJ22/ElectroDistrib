import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Role } from '@/types/roles';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Roles() {
    const { roles, flash } = usePage<{
        roles: Role[];
        flash?: { success?: string; error?: string };
    }>().props;
    const { delete: destroy } = useForm();
    // Muestra el toast cada vez que llegue un flash nuevo
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('roles.create')} className={buttonVariants({ variant: 'default' })}>
                        Agregar
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-center">ID</TableHead>
                            <TableHead className="text-center">Nombre</TableHead>
                            <TableHead className="w-[200px] text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-muted-foreground py-4 text-center">
                                    No hay roles disponibles.
                                </TableCell>
                            </TableRow>
                        ) : (
                            roles.map(({ id, name, permissions }) => (
                                <TableRow key={id}>
                                    <TableCell className="text-center font-medium">{id}</TableCell>
                                    <TableCell className="text-center">{name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2">
                                            {/* <Link href={route('roles.show', id)} className={buttonVariants({ variant: 'secondary' })}>
                                                Detalles
                                            </Link> */}
                                            <Drawer>
                                                <DrawerTrigger className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                                                    Permisos
                                                </DrawerTrigger>
                                                <DrawerContent className="mx-auto max-w-2xl">
                                                    <div className="px-6 py-8">
                                                        <DrawerHeader className="text-center">
                                                            <DrawerTitle className="text-primary mb-4 text-2xl font-bold">
                                                                Permisos del Rol {name}
                                                            </DrawerTitle>

                                                            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                                                                {permissions.map((permission) => (
                                                                    <div
                                                                        key={permission.id}
                                                                        className="bg-muted/50 hover:bg-accent flex items-center rounded-lg border p-3 transition-all"
                                                                    >
                                                                        <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                                                                        <DrawerDescription className="text-foreground text-base font-medium">
                                                                            {permission.name}
                                                                        </DrawerDescription>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </DrawerHeader>

                                                        <DrawerFooter className="mt-8">
                                                            <DrawerClose className="flex justify-center">
                                                                <Button variant="outline">Cerrar</Button>
                                                            </DrawerClose>
                                                        </DrawerFooter>
                                                    </div>
                                                </DrawerContent>
                                            </Drawer>
                                            <Link href={route('roles.edit', id)} className={buttonVariants({ variant: 'default' })}>
                                                Editar
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">Eliminar</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Esta acción no se puede deshacer. Eliminará el usuario de forma permanente.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                const toastId = toast.loading('Eliminando usuario...');
                                                                destroy(route('roles.destroy', id), {
                                                                    onSuccess: () => toast.remove(toastId),
                                                                });
                                                            }}
                                                        >
                                                            Continuar
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
