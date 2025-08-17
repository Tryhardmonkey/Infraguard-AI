import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-200">
        <h1 className="text-5xl font-bold text-green-600 text-center mt-10">
          InfraGuard AI Dashboard 🚀
        </h1>
      </main>
    </div>
  );
}
