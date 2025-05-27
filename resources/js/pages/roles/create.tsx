import InputError from '@/components/input-error';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Permission } from '@/types/permissions';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear Rol',
        href: '/roles',
    },
];

export default function RolesCreate() {
    const { permissions } = usePage<{ permissions: Permission[] }>().props;

    const { data, setData, post, errors } = useForm<{
        name: string;
        permissions: string[]; // Tipo explícito
    }>({
        name: '',
        permissions: [], // Ahora será string[]
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'), {
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

    function handleCheckboxChange(permissionName: string, checked: boolean) {
        if (checked) {
            setData('permissions', [...data.permissions, permissionName]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((p) => p !== permissionName),
            );
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Rol" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link href={route('roles.index')} className={buttonVariants({ variant: 'default' })}>
                        Volver
                    </Link>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="name"
                            placeholder=""
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="permissions">Permisos</Label>
                        {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center gap-2">
                                <Checkbox
                                    id={`permission-${permission.id}`}
                                    onCheckedChange={(checked: boolean) => handleCheckboxChange(permission.name, checked)}
                                />
                                <label
                                    htmlFor={`permission-${permission.id}`}
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {permission.name}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <Button>Crear</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
