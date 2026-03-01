import { Toaster as SonnerToaster } from 'sonner';

export const Toaster = ({ ...props }) => {
    return (
        <SonnerToaster
            {...props}
            toastOptions={{
                className: 'custom-toast',
            }}
        />
    );
};
