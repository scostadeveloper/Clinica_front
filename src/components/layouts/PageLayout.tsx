import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export default function PageLayout({ children, title, description, actions }: PageLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-4">
            {actions}
          </div>
        )}
      </div>
      
      <div className="bg-[#1a332d] rounded-lg shadow-lg p-6">
        {children}
      </div>
    </div>
  );
} 