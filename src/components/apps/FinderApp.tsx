import { time } from 'framer-motion';
import { memo } from 'react';

const projects = [
  {
    title: 'AI Interview Platform',
    tech: 'Next.js, Firebase, Vapi',
    description: 'An AI-powered mock interview platform developed using Next.js, Firebase, and Vapi that simulates real-time voice-based interviews.It generates dynamic interview sessions based on role, tech stack, and experience level, providing a highly interactive and personalized preparation experience.  ',
    link: 'https://github.com/Hari-hara-sudan/Mock_interview_agent',
  },
  {
    title: 'Multi-Vendor Booking Platform',
    tech: 'React, TypeScript, Node.js, Express, PostgreSQL, GraphQL',
    description: 'A full-stack multi-vendor service booking platform enabling vendors to list services, manage availability slots, and track earnings. It supports real-time booking with auto-acceptance, customer reviews, role-based dashboards (Customer, Vendor, Admin), payment tracking, and analytics, designed to streamline service discovery and scheduling through an intuitive marketplace. ',
    link: 'https://github.com/Hari-hara-sudan/Multi-Vendor-Booking-Platform',
  },
  {
    title: 'Blood Donor Application',
    tech: 'React Native, Firebase Realtime Database, Expo',
    description: 'A fast, emergency-focused mobile app built with React Native and Firebase Realtime Database to connect blood donors with seekers based on location and blood group. It features real-time alerts, secure authentication, donor history tracking, and a lightweight UI optimized for urgent request handling. ',
    link: ' https://github.com/Hari-hara-sudan/Blood-donation',
  },
];

const FinderApp = memo(() => (
  <div className="h-full flex">
    {/* Sidebar */}
    <div className="w-44 shrink-0 border-r border-black/10 p-3" style={{ background: 'hsl(220 10% 93%)' }}>
      <div className="text-[11px] font-semibold text-black/40 uppercase mb-2">Favorites</div>
      <div className="text-[13px] text-black/80 bg-primary/10 rounded-md px-2 py-1 font-medium">📂 Projects</div>
      {/* <div className="text-[13px] text-black/80 bg-primary/10 rounded-md px-2 py-1 font-medium mt-4">📝 Resume</div> */}
    </div>
    {/* Content */}
    <div className="flex-1 p-5 overflow-auto">
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.title} className="p-4 rounded-lg border border-black/8 hover:border-black/15 transition-colors"
            style={{ background: 'hsl(220 10% 98%)' }}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-black/85">{p.title}</h3>
              <a href={p.link} target="_blank" rel="noreferrer"
                className="text-xs text-blue-500 hover:underline shrink-0 ml-2">GitHub →</a>
            </div>
            <div className="text-[11px] font-mono text-black/40 mb-2">{p.tech}</div>
            <p className="text-xs text-black/60 leading-relaxed break-words whitespace-pre-line max-w-full">{p.description}</p>
          </div>
        ))}
        
      </div>
    </div>
  </div>
));

FinderApp.displayName = 'FinderApp';
export default FinderApp;
