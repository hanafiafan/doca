import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';

import { CursorGlow } from '@/components/ui/CursorGlow';

export const metadata = {
  title: 'DOCA! — Donat Pancake Mini Premium',
  description: 'Camilan kekinian premium dengan 7 varian topping. Pesan online, delivery & pick-up di Surakarta.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <CursorGlow />
        <Navbar />
        <main style={{ paddingTop: '80px', flex: 1 }}>
          {children}
        </main>
        <CartDrawer />
        <ToastContainer />
      </body>
    </html>
  );
}
