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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Product } from '@/types/product';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/products',
    },
];

export default function Products() {
    const { products } = usePage<{ products: Product[] }>().props;
    const { delete: destroy } = useForm();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('products.create')} className={buttonVariants({ variant: 'default' })}>
                        Agregar
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-center">ID</TableHead>
                            <TableHead className="text-center">Nombre</TableHead>
                            <TableHead className="text-center">Precio</TableHead>
                            <TableHead className="text-center">Stock</TableHead>
                            <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-muted-foreground py-4 text-center">
                                    No hay productos disponibles.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map(({ id, nombre, precio, stock }) => (
                                <TableRow key={id}>
                                    <TableCell className="text-center font-medium">{id}</TableCell>
                                    <TableCell className="text-center">{nombre}</TableCell>
                                    <TableCell className="text-center">{precio}</TableCell>
                                    <TableCell className="text-center">{stock}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2">
                                            <Link href={route('products.edit', id)} className={buttonVariants({ variant: 'default' })}>
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
                                                            Esta acción no se puede deshacer. Eliminará el producto de forma permanente.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => destroy(route('products.destroy', id))}>
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
