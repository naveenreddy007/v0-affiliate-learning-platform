import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raju - Affiliate Learning Platform',
  description: "India's #1 affiliate learning platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
              line-height: 1.5; 
              color: #374151;
              background-color: #f9fafb;
            }
            .btn { 
              display: inline-flex; 
              align-items: center; 
              justify-content: center;
              padding: 0.5rem 1rem; 
              font-weight: 500; 
              border-radius: 0.5rem; 
              border: none; 
              cursor: pointer; 
              text-decoration: none; 
              transition: all 0.2s; 
            }
            .btn-primary { background-color: #2563eb; color: white; }
            .btn-primary:hover { background-color: #1d4ed8; }
            .btn-secondary { background-color: #e5e7eb; color: #374151; }
            .btn-secondary:hover { background-color: #d1d5db; }
            .card { 
              background: white; 
              border-radius: 0.75rem; 
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
              padding: 1.5rem; 
            }
            .input {
              width: 100%;
              padding: 0.5rem 0.75rem;
              border: 1px solid #d1d5db;
              border-radius: 0.5rem;
              font-size: 0.875rem;
            }
            .input:focus {
              outline: none;
              border-color: #2563eb;
              box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }
            .min-h-screen { min-height: 100vh; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .text-center { text-align: center; }
            .w-full { width: 100%; }
            .max-w-md { max-width: 28rem; }
            .max-w-6xl { max-width: 72rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .grid { display: grid; }
            .gap-4 { gap: 1rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-lg { font-size: 1.125rem; }
            .text-sm { font-size: 0.875rem; }
            .font-bold { font-weight: 700; }
            .font-medium { font-weight: 500; }
            .text-gray-900 { color: #111827; }
            .text-gray-600 { color: #4b5563; }
            .text-blue-600 { color: #2563eb; }
            .bg-white { background-color: white; }
            .shadow-sm { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
            .border-b { border-bottom: 1px solid #e5e7eb; }
            .rounded { border-radius: 0.25rem; }
            @media (min-width: 768px) {
              .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
              .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
            }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}