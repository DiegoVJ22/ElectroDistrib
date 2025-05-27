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
        title: 'Crear Usuario',
        href: '/users',
    },
];

export default function UsersCreate() {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'), {
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
            <Head title="Crear Usuario" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link href={route('users.index')} className={buttonVariants({ variant: 'default' })}>
                        Volver
                    </Link>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                            id="nombre"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="nombre"
                            placeholder=""
                        />
                        <InputError message={errors.name} />

                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="precio"
                            placeholder=""
                            type="email"
                        />
                        <InputError message={errors.email} />

                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            className="mt-1 block w-full"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="stock"
                            placeholder=""
                            type="password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <Button>Crear</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
