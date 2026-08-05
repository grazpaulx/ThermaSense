import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AuditLog from './pages/AuditLog';
import { AnimatePresence } from 'framer-motion';

const API_URL = "http://localhost:8001/predict";
const UPDATE_INTERVAL = 2000;
const INITIAL_HISTORY_COUNT = 10;

function RootApp() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [history, setHistory] = useState([]);
  const [eventLog, setEventLog] = useState([{ time: new Date().toLocaleTimeString(), event: "Link Established: Optimizing cooling array." }]);
  const [currentResult, setCurrentResult] = useState({ prediction: 0.1, status: 'NORMAL' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSpiking, setIsSpiking] = useState(false);

  // Initialize v4.1: Extra Telemetry
  useEffect(() => {
    const data = Array.from({ length: INITIAL_HISTORY_COUNT }).map((_, i) => ({
      time: i, 
      ambient: 24, 
      cpu: 42 + Math.random() * 4, 
      rpm: 65,
      coolant: 88,
      latency: 12
    }));
    setHistory(data);
    setIsLoading(false);
  }, []);

  // Theme Sync
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const currentStep = history[history.length - 1] || { cpu: 40, ambient: 24, rpm: 65, coolant: 88, latency: 12 };
  const status = (currentStep.cpu > 80 || currentResult.prediction > 0.75) ? "CRITICAL" : (currentStep.cpu > 70 ? "WARNING" : "NORMAL");

  // Telemetry Loop
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(async () => {
      const last = history[history.length - 1];
      let nextCPU = isSpiking ? Math.min(96, last.cpu + (Math.random() * 8 + 6)) : 42 + (Math.random() - 0.5) * 6;
      if (!isSpiking) nextCPU = last.cpu + (nextCPU - last.cpu) * 0.2;

      const nextStep = {
        time: last.time + 1, 
        ambient: 24 + (Math.random() - 0.5), 
        cpu: nextCPU, 
        rpm: 65 + (isSpiking ? (nextCPU - 40) * 1.5 : 0),
        coolant: 88 - (isSpiking ? (nextCPU - 40) * 0.5 : 0),
        latency: 12 + (isSpiking ? 10 : Math.random() * 2)
      };

      const updatedHistory = [...history.slice(1), nextStep];
      setHistory(updatedHistory);

      // Event Logging
      const currentStatus = (nextCPU > 80) ? "CRITICAL" : (nextCPU > 70 ? "WARNING" : "NORMAL");
      if (currentStatus !== status) {
        setEventLog(prev => [{ time: new Date().toLocaleTimeString(), event: `${currentStatus}: Sequential breach risk detected.` }, ...prev.slice(0, 80)]);
      }

      try {
        const payload = { data: updatedHistory.map(h => [h.ambient, h.cpu, h.rpm]) };
        const response = await fetch(API_URL, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(payload) 
        });
        if (response.ok) setCurrentResult(await response.json());
      } catch (err) { console.error("Neural Drift", err); }
    }, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [history, isLoading, isSpiking, status]);

  if (isLoading) return null;

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-all duration-1000 relative overflow-hidden ${status === 'CRITICAL' ? 'emergency-active' : ''}`}>
        <div className="ai-grid" />
        <div className="scanline" />

        <Navbar 
          isSpiking={isSpiking} 
          toggleSpike={() => setIsSpiking(!isSpiking)} 
          isDark={isDarkMode} 
          toggleDark={() => setIsDarkMode(!isDarkMode)} 
        />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard history={history} currentResult={currentResult} status={status} isDark={isDarkMode} />} />
            <Route path="/audit" element={<AuditLog logs={eventLog} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default RootApp;
