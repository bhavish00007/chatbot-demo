"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  Users,
  Phone,
  Mail,
  Menu,
  X,
  Stethoscope,
  Activity,
  Shield,
  Award,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Zap,
} from "lucide-react";

// --- Configuration ---
const PHONE_NUMBER = "919535234179";
const WHATSAPP_CONTACT_LINK = `https://wa.me/${PHONE_NUMBER}?text=Hi%20Optimal%20Care%20Clinic,%20I%20have%20an%20inquiry.`;
const WHATSAPP_BOOKING_LINK = `https://wa.me/${PHONE_NUMBER}?text=Hello,%20I%20would%20like%20to%20schedule%20an%20appointment%20with%20a%20doctor.`;

// --- Data ---
const services = [
  {
    name: "Cardiology",
    icon: Heart,
    desc: "Heart health monitoring.",
    color: "text-rose-500",
    bg: "bg-rose-100",
    border: "border-rose-200",
    shadow: "hover:shadow-rose-500/30",
  },
  {
    name: "Family Care",
    icon: Users,
    desc: "Care for the whole family.",
    color: "text-blue-500",
    bg: "bg-blue-100",
    border: "border-blue-200",
    shadow: "hover:shadow-blue-500/30",
  },
  {
    name: "Checkups",
    icon: Stethoscope,
    desc: "Annual health assessments.",
    color: "text-violet-500",
    bg: "bg-violet-100",
    border: "border-violet-200",
    shadow: "hover:shadow-violet-500/30",
  },
  {
    name: "Specialists",
    icon: Award,
    desc: "Top-tier expert doctors.",
    color: "text-amber-500",
    bg: "bg-amber-100",
    border: "border-amber-200",
    shadow: "hover:shadow-amber-500/30",
  },
  {
    name: "Wellness",
    icon: Shield,
    desc: "Proactive prevention plans.",
    color: "text-emerald-500",
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    shadow: "hover:shadow-emerald-500/30",
  },
  {
    name: "Emergency",
    icon: Activity,
    desc: "24/7 rapid response.",
    color: "text-cyan-500",
    bg: "bg-cyan-100",
    border: "border-cyan-200",
    shadow: "hover:shadow-cyan-500/30",
  },
];

const doctors = [
  {
    name: "Dr. Sarah Williams",
    specialty: "Cardiologist",
    experience: "15+ Years",
    gradient: "from-rose-400 to-orange-400",
  },
  {
    name: "Dr. James Chen",
    specialty: "Family Physician",
    experience: "12+ Years",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Internal Medicine",
    experience: "18+ Years",
    gradient: "from-violet-400 to-fuchsia-400",
  },
];

const navLinks = ["Services", "Doctors", "Contact"];

const LandingSections = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-white overflow-x-hidden selection:bg-fuchsia-200 selection:text-fuchsia-900">
      
      {/* --- Navbar (Glassy) --- */}
      <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-white/20 z-50 transition-all">
        <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 rotate-3 hover:rotate-0 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Optimal<span className="text-slate-900">Care</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-slate-600 hover:text-fuchsia-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={WHATSAPP_BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Book Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-900"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl"
            >
              <nav className="flex flex-col p-6 space-y-4">
                {navLinks.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-bold text-slate-700 hover:text-fuchsia-600"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href={WHATSAPP_BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center font-bold rounded-xl shadow-lg"
                >
                  Book Appointment
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO SECTION (Colorful Gradient Mesh) --- */}
      <section className="relative w-full pt-32 pb-48 lg:pt-48 lg:pb-64 overflow-hidden bg-slate-50">
        
        {/* Colorful Blobs Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[100px] mix-blend-multiply" />
            <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-pink-400/30 rounded-full blur-[120px] mix-blend-multiply" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
        </div>

        {/* Container */}
        <div className="relative z-10 w-full px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-violet-100 text-violet-600 text-xs font-black uppercase tracking-wider mb-8 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-fuchsia-500" />
            Healthcare Reimagined
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-8 mx-auto leading-[1]"
          >
            Wellness meets <br />
            {/* "Innovation" to Purple Gradient */}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl sm:text-2xl text-slate-600 mb-12 w-full leading-relaxed font-medium max-w-2xl mx-auto"
          >
            Your health isn&apos;t black and white. Experience colorful, personalized care powered by modern tech.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <a
              href={WHATSAPP_BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              // Button to match Purple/Indigo Gradient
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-purple-500/40"
            >
              <Calendar className="w-5 h-5" />
              Start Journey
            </a>
            <a
              href={WHATSAPP_CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg transition-all hover:border-violet-200 hover:text-violet-600 hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat With Us
            </a>
          </motion.div>
        </div>

        {/* --- Wave --- */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg className="relative block w-full h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
            </svg>
        </div>
      </section>

      {/* --- Services Grid (Colorful Cards) --- */}
      <section id="services" className="relative py-24 bg-white w-full">
        <div className="w-full px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-violet-600 font-bold tracking-wider uppercase text-sm">Services</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-2 mb-4">
                What We Do Best
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className={`bg-white p-8 rounded-3xl border-2 ${service.border} shadow-sm ${service.shadow} transition-all duration-300 group`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${service.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg">
                    {service.desc}
                  </p>
                  <div className={`mt-6 flex items-center text-sm font-bold ${service.color} opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}>
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Doctors Section (Stylish Cards) --- */}
      <section id="doctors" className="py-32 bg-slate-50 w-full relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-20 left-[-10%] w-96 h-96 bg-violet-200/50 rounded-full blur-[80px]" />
        
        <div className="w-full px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              The Dream Team
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium">
              Not your average doctors. We bring energy, expertise, and empathy to every visit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {doctors.map((doc, i) => (
              <div
                key={i}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 relative"
              >
                {/* Gradient Header */}
                <div className={`h-32 w-full bg-gradient-to-r ${doc.gradient}`} />
                
                <div className="p-8 relative">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                        <div className="w-24 h-24 rounded-2xl bg-white p-2 shadow-lg rotate-3 group-hover:rotate-0 transition-all duration-300">
                            <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center">
                                <Users className="w-10 h-10 text-slate-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center">
                        <h3 className="text-2xl font-black text-slate-900 mb-1">{doc.name}</h3>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-sm mb-6 uppercase tracking-wider">{doc.specialty}</p>
                        
                        <div className="flex justify-center gap-6 text-sm mb-8">
                            <div className="text-center">
                                <span className="block font-black text-slate-900 text-lg">{doc.experience}</span>
                                <span className="text-slate-400 font-semibold text-xs uppercase">Exp</span>
                            </div>
                            <div className="w-px h-10 bg-slate-100"></div>
                            <div className="text-center">
                                <span className="block font-black text-slate-900 text-lg flex items-center gap-1 justify-center">5.0 <span className="text-amber-400">★</span></span>
                                <span className="text-slate-400 font-semibold text-xs uppercase">Rating</span>
                            </div>
                        </div>

                        <a 
                            href={WHATSAPP_BOOKING_LINK} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-slate-50 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300"
                        >
                            Book Appointment
                        </a>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Banner (UPDATED: Purple/Indigo Gradient) --- */}
      <section className="py-24 px-6 w-full bg-white">
        {/* CHANGED: Background to Purple -> Indigo */}
        <div className="w-full bg-gradient-to-br from-purple-600 to-indigo-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center shadow-2xl shadow-purple-500/30">
            {/* Shapes */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[60px]" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                    Ready to feel your best?
                </h2>
                <p className="text-white/80 text-xl mb-12 font-medium max-w-2xl mx-auto">
                    Join thousands of patients who actually enjoy going to the doctor. 
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                    <a
                        href={WHATSAPP_BOOKING_LINK}
                        target="_blank" 
                        rel="noopener noreferrer"
                        // CHANGED: Text to Purple
                        className="px-10 py-5 bg-white text-purple-700 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl"
                    >
                        Book Now
                    </a>
                    <a
                        href={WHATSAPP_CONTACT_LINK}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-10 py-5 bg-black/20 hover:bg-black/30 backdrop-blur-md text-white border-2 border-white/20 rounded-2xl font-bold text-lg transition-all"
                    >
                        WhatsApp Us
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* --- Footer (Dark Mode Contrast) --- */}
      <footer id="contact" className="bg-slate-900 text-white pt-24 pb-12 w-full">
        <div className="w-full px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                   <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="font-bold text-2xl">Optimal Care</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                Modern healthcare designed for real life.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Explore</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li className="hover:text-fuchsia-400 cursor-pointer transition-colors">Cardiology</li>
                <li className="hover:text-fuchsia-400 cursor-pointer transition-colors">Checkups</li>
                <li className="hover:text-fuchsia-400 cursor-pointer transition-colors">Family Care</li>
                <li className="hover:text-fuchsia-400 cursor-pointer transition-colors">Emergency</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li className="hover:text-fuchsia-400 cursor-pointer transition-colors">About</li>
                <li className="hover:text-fuchsia-400 cursor-pointer transition-colors">Team</li>
                <li className="hover:text-fuchsia-400 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-fuchsia-400 cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Connect</h4>
              <ul className="space-y-4 font-medium">
                <a href={WHATSAPP_CONTACT_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-fuchsia-400 transition-colors group">
                  <Phone className="w-5 h-5" />
                  <span>+91 9535234179</span>
                </a>
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5" />
                  <span>bhavishkolpe@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm font-medium">
            <p>© {new Date().getFullYear()} Optimal Care Clinic. Made with ⚡️ & ❤️.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingSections;