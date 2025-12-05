"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";

export default function Events() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  // Sample schedule data - replace with your actual events
  const schedule = [
    { day: "Saturday, December 13", time: "09:00", topic: "Opening Keynote", location: "Auditorium" },
    { day: "Saturday, December 13", time: "10:30", topic: "Workshop: Building with AI", location: "Workshop Room A" },
    { day: "Saturday, December 13", time: "12:00", topic: "Lunch & Networking", location: "Main Hall" },
    { day: "Saturday, December 13", time: "14:00", topic: "Panel: Future of Hardware", location: "Main Hall" },
    { day: "Saturday, December 13", time: "15:30", topic: "Project Showcase", location: "Exhibition Hall" },
    { day: "Saturday, December 13", time: "17:00", topic: "Closing Ceremony", location: "Auditorium" },
  ];

  // Sample judges/mentors - replace with your actual people
  const judges = [
    { name: "Dr. Sarah Chen", title: "VP of Engineering, Google", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
    { name: "Michael Zhang", title: "Principal Engineer, NVIDIA", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    { name: "Dr. Emily Rodriguez", title: "Research Director, MIT", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  ];

  const mentors = [
    { name: "Alex Kim", title: "Senior Hardware Engineer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
    { name: "Jordan Lee", title: "AI Research Scientist", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
    { name: "Taylor Park", title: "Robotics Engineer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" },
    { name: "Casey Wong", title: "Embedded Systems Expert", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80" },
  ];

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-slate-100 rounded-full mb-6">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.events.hackathonBadge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-slate-900">
            {t.events.hackathonTitle}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            {t.events.hackathonDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-slate-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Saturday, December 13, 2025</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-slate-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">Silicon Valley, CA</span>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="https://luma.com/nexthardware"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm"
            >
              {t.events.registerNow}
            </a>
          </div>
        </motion.div>

        {/* Contests & Competitions Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-slate-900">{t.events.contests}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: t.events.contest1.title, description: t.events.contest1.description, icon: "🏆" },
              { title: t.events.contest2.title, description: t.events.contest2.description, icon: "💡" },
              { title: t.events.contest3.title, description: t.events.contest3.description, icon: "🚀" },
            ].map((contest, index) => (
              <motion.div
                key={contest.title}
                className="border border-slate-200 rounded-lg p-6 text-center bg-white hover:border-slate-300 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-3">{contest.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-slate-900">{contest.title}</h4>
                <p className="text-sm text-slate-600">{contest.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-slate-600 mt-6 text-sm">
            {t.events.contestsNote}
          </p>
        </motion.div>

        {/* Schedule Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-slate-900">{t.events.schedule}</h3>
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.events.scheduleDay}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.events.scheduleTime}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.events.scheduleTopic}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.events.scheduleLocation}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {schedule.map((event, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-slate-50 transition-colors"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{event.day}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{event.time}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{event.topic}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{event.location}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Judges Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-slate-900">{t.events.judges}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {judges.map((judge, index) => (
              <motion.div
                key={judge.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-200">
                  <Image
                    src={judge.image}
                    alt={judge.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-1 text-slate-900">{judge.name}</h4>
                <p className="text-sm text-slate-600">{judge.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mentors Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-slate-900">{t.events.mentors}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-slate-200">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-base font-semibold mb-1 text-slate-900">{mentor.name}</h4>
                <p className="text-xs text-slate-600">{mentor.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Luma Calendar Embed */}
        <motion.div
          className="border border-slate-200 rounded-lg p-8 bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-center text-slate-900">{t.events.allEvents}</h3>
          <p className="text-slate-600 mb-6 text-center text-sm">
            {t.events.allEventsDescription}
          </p>
          <div className="w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
            <iframe
              src="https://luma.com/embed/calendar/cal-p5Pbiy0t2BunGoC/events"
              width="100%"
              height="600"
              frameBorder="0"
              style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
              allowFullScreen
              aria-label="Next Hardware Events Calendar"
              className="w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <a
              href="https://luma.com/nexthardware"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-colors text-sm text-center"
            >
              {t.events.viewAllEvents}
            </a>
            <a
              href="https://luma.com/nexthardware"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-md hover:border-slate-400 hover:text-slate-900 transition-colors text-sm text-center"
            >
              {t.events.subscribeCalendar}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

