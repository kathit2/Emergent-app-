import React, { useEffect, useState } from 'react';
import { ChevronDown, ExternalLink, Mail, Phone, Linkedin, Github, Activity, TrendingUp, Database, Code } from 'lucide-react';
import { mockProjects, mockQualifications, mockSpecializations, mockTools } from '../data/mock';
import ProjectCard from '../components/ProjectCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const Home = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const API = `${BACKEND_URL}/api`;
      
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast({
          title: "Message sent!",
          description: response.data.message,
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-[#FF6B35]">
              Kathit Sondhi
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#about" className="hover:text-[#FF6B35] transition-colors">About</a>
              <a href="#projects" className="hover:text-[#FF6B35] transition-colors">Projects</a>
              <a href="#qualifications" className="hover:text-[#FF6B35] transition-colors">Qualifications</a>
              <a href="#contact" className="hover:text-[#FF6B35] transition-colors">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#FF6B35 1px, transparent 1px), linear-gradient(90deg, #FF6B35 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Kathit Sondhi
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              UKSCA Accredited Strength & Conditioning Trainer
            </p>
            <p className="text-xl md:text-2xl text-[#00D9FF] mb-8">
              Blending Strength & Conditioning with Data-Driven Performance
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Sports Scientist at Acrophase Human Performance Lab, IIT Madras
            </p>
            <Button 
              onClick={scrollToProjects}
              className="bg-[#FF6B35] hover:bg-[#ff8555] text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              View My Projects
              <ChevronDown className="ml-2 animate-bounce" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 fade-in-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About <span className="text-[#FF6B35]">Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 hover:border-[#FF6B35] transition-all">
              <h3 className="text-2xl font-semibold mb-4 text-[#FF6B35]">Philosophy</h3>
              <p className="text-gray-300 leading-relaxed">
                I believe in the power of data to unlock athletic potential. By combining evidence-based strength and conditioning practices with advanced performance analytics, I help athletes reach their peak performance through personalized, data-driven training approaches.
              </p>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 hover:border-[#00D9FF] transition-all">
              <h3 className="text-2xl font-semibold mb-4 text-[#00D9FF]">Approach</h3>
              <p className="text-gray-300 leading-relaxed">
                My work bridges the gap between physiology and performance analytics. I create actionable dashboards, analyze GPS and heart rate data, and explore machine learning applications for injury prediction and adaptation modeling, bringing scientific rigor to athletic development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IIT Madras Section - Highlight */}
      <section className="py-20 bg-[#0f1419] fade-in-section">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-[#FF6B35]/10 to-[#00D9FF]/10 p-12 rounded-2xl border border-[#FF6B35]/30 hover:border-[#FF6B35]/60 transition-all">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-[#FF6B35] rounded-full flex items-center justify-center">
                    <Activity className="text-white" size={48} />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Sports Scientist at <span className="text-[#FF6B35]">IIT Madras</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-4">
                    Acrophase Human Performance Lab
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Working at the intersection of sports science and data analytics at one of India's leading research institutions. Dedicated to optimizing human performance through advanced data analysis, athlete monitoring systems, and applied machine learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-[#0f1419] fade-in-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Performance Analysis <span className="text-[#00D9FF]">Projects</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Explore my data-driven approach to sports performance analysis using Python and statistical modeling
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedProject === project.id}
                onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-20 fade-in-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="text-[#FF6B35]">Specializations</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mockSpecializations.map((spec, idx) => (
              <div key={idx} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#FF6B35] transition-all hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="text-[#FF6B35] mt-1">{spec.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{spec.title}</h3>
                    <p className="text-gray-400 text-sm">{spec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-[#0f1419] fade-in-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Tools & <span className="text-[#00D9FF]">Technologies</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {mockTools.map((tool, idx) => (
              <div key={idx} className="bg-[#1a1a1a] px-6 py-3 rounded-full border border-gray-800 hover:border-[#00D9FF] transition-all hover:scale-110">
                <span className="text-gray-300">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section id="qualifications" className="py-20 fade-in-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Qualifications & <span className="text-[#FF6B35]">Certifications</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {mockQualifications.map((qual, idx) => (
              <div key={idx} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#FF6B35] transition-all">
                <h3 className="text-xl font-semibold text-[#FF6B35] mb-2">{qual.title}</h3>
                <p className="text-gray-300">{qual.institution}</p>
                {qual.status && <p className="text-gray-500 text-sm mt-1">{qual.status}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#0f1419] fade-in-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Get In <span className="text-[#00D9FF]">Touch</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Open to collaborating on real-world sports science data projects
          </p>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="text-[#FF6B35]" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">+91-78905959338</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-4 mb-4">
                  <Mail className="text-[#00D9FF]" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">sondhikathit232@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-4 mb-4">
                  <Linkedin className="text-[#FF6B35]" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/kathit-sondhi-3594b4281" target="_blank" rel="noopener noreferrer" className="text-[#00D9FF] hover:underline">
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-8 rounded-xl border border-gray-800">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 mb-2 block">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-gray-700 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-gray-300 mb-2 block">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-gray-700 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="text-gray-300 mb-2 block">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-[#0a0a0a] border-gray-700 text-white"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF6B35] hover:bg-[#ff8555] text-white py-6 rounded-full transition-all hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2025 Kathit Sondhi. All rights reserved.</p>
          <p className="text-sm mt-2">Sports Scientist | UKSCA Accredited S&C Trainer</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;