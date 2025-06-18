import Sidebar from './Sidebar';
import Header from './Header';
import FloatingChat from './FloatingChat';
import { ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-[#142720]">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16 p-8 min-h-screen bg-[#142720] relative">
        {children}
      </main>
      <FloatingChat />
    </div>
  );
} 