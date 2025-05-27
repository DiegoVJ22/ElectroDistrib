import InputError from '@/components/input-error';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agregar Productos',
        href: '/products',
    },
];

export default function ProductsCreate() {
    const { data, setData, post, errors } = useForm({
        nombre: '',
        precio: '',
        stock: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            preserveScroll: true,
            onError: () => {
                toast.dismiss('form-error'); // evita duplicados
                toast.error('Corrige los campos marcados.', {
                    id: 'form-error',
                    duration: 4000,
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agregar Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link href={route('products.index')} className={buttonVariants({ variant: 'default' })}>
                        Volver
                    </Link>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input
                            id="nombre"
                            className="mt-1 block w-full"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            autoComplete="nombre"
                            placeholder=""
                        />
                        <InputError message={errors.nombre} />

                        <Label htmlFor="precio">Precio</Label>
                        <Input
                            id="precio"
                            className="mt-1 block w-full"
                            value={data.precio}
                            onChange={(e) => setData('precio', e.target.value)}
                            autoComplete="precio"
                            placeholder=""
                            type="number"
                        />
                        <InputError message={errors.precio} />

                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            id="stock"
                            className="mt-1 block w-full"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                            autoComplete="stock"
                            placeholder=""
                            type="number"
                        />
                        <InputError message={errors.stock} />
                    </div>

                    <div>
                        <Button>Crear</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
