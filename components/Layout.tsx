// components/Layout.tsx
import React from 'react';
import Head from 'next/head';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Hackhoven's Weather App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>{children}</main>

        </div>
    );
};

export default Layout;
