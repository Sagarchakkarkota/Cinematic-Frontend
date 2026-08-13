"use client";

import { LoginForm } from "./_components/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">
            <span className="text-gradient">Utsavam</span> Admin
          </h1>
          <p className="text-foreground/70">Sign in to access the dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
