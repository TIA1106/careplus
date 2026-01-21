"use client";
import React, { useState, useEffect } from 'react';
import { MOCK_PATIENTS, PATIENT_NAMES_POOL } from './constants';

export const QueueWidget = () => {
  const [patients, setPatients] = useState(MOCK_PATIENTS);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => {
        const nextList = prev.slice(1);
        const randomName = PATIENT_NAMES_POOL[Math.floor(Math.random() * PATIENT_NAMES_POOL.length)];
        const nextId = prev[prev.length - 1].id + 1;
        const initials = randomName.split(' ').map(n => n[0]).join('');
        
        nextList.push({
          id: nextId,
          name: randomName,
          status: 'Waiting',
          initials: initials
        });
        
        if (nextList[0]) nextList[0].status = 'In Progress';
        if (nextList[1]) nextList[1].status = 'Next';

        return nextList;
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm transform transition-all hover:scale-[1.02]">
      <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
          <span className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              Dr. Smith's Queue
          </span>
          <span className="text-xs text-neutral-500">Cardiology • Room 302</span>
      </div>
      <div className="flex flex-col">
          {patients.map((patient: any, index: number) => (
              <div key={patient.id} className={`flex items-center justify-between p-4 border-b border-neutral-800/50 transition-all duration-500 ${index === 0 ? 'bg-blue-500/10' : ''}`}>
                  <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-offset-2 ring-offset-neutral-900 transition-colors duration-300 ${
                          index === 0 ? 'bg-blue-600 text-white ring-blue-600' : 
                          index === 1 ? 'bg-neutral-800 text-neutral-300 ring-neutral-800' : 'bg-neutral-900 text-neutral-600 ring-neutral-900'
                      }`}>
                          {patient.initials}
                      </div>
                      <div>
                          <div className={`text-base font-medium transition-colors duration-300 ${index === 0 ? 'text-blue-400' : 'text-neutral-300'}`}>{patient.name}</div>
                          <div className="text-xs text-neutral-500">Token #{patient.id}</div>
                      </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                      index === 0 ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 
                      index === 1 ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'text-neutral-600'
                  }`}>
                      {patient.status}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};
