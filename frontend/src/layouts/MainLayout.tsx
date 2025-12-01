import type {ReactNode} from 'react';
import Navbar from "../components/Navbar";


interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Navbar />
            <main className="container mt-4">
                {children}
            </main>
        </>
    );
};

export default MainLayout;
