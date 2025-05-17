import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <div style={{ width: 400, padding: 32, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
