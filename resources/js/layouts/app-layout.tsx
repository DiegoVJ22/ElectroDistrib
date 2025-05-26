import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <Toaster
            position="bottom-right"
            toastOptions={{
                className: 'bg-background text-foreground border-2 border-gray-200 shadow-lg',
                duration: 4000,
                success: {
                    iconTheme: {
                        primary: '#4CAF50', // Verde para éxito
                        secondary: 'white',
                    },
                },
            }}
        />
    </AppLayoutTemplate>
);
