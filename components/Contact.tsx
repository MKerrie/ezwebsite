import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

// Modern styling for inputs - Updated for better light mode contrast
const StyledInput = ({ label, type = "text", placeholder, value, onChange, required = false }: any) => (
    <div className="flex flex-col gap-2 group w-full">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400 ml-1 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'textarea' ? (
            <textarea
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={4}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-neutral-600 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none"
            />
        ) : (
             <input
                required={required}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-600 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none"
             />
        )}
    </div>
);

const Contact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Form Data State
  const [formData, setFormData] = useState({
      name: '',
      company: '',
      email: '',
      budget: '',
      message: ''
  });

  useSEO(
    ref,
    "Contact | Start Your Project with ezwebsite",
    "Ready to take action? Contact ezwebsite for a free consultation. We are available 24/7 to help your business grow."
  );

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormState('submitting');
      
      // Simulate API call
      setTimeout(() => {
          setFormState('success');
          setFormData({ name: '', company: '', email: '', budget: '', message: '' });
          
          // Reset after 5 seconds
          setTimeout(() => setFormState('idle'), 5000);
      }, 1500);
  };

  const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-slate-50 dark:bg-black text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 w-full">
      {/* Background Glow - Contained within overflow-hidden section */}
      <div className="absolute top-1/2 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-violet-900/5 dark:bg-violet-900/10 blur-[80px] md:blur-[150px] pointer-events-none rounded-full transform -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <div className="lg:w-5/12">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.9] mb-6 md:mb-8">
              Let's <br />
              <span className="text-violet-600">Work.</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-10 md:mb-12">
              Klaar om de volgende stap te zetten? Wij zijn er klaar voor. 
              Stuur een bericht en we reageren sneller dan je verwacht.
            </p>

            <div className="space-y-8 md:space-y-10">
              <a href="mailto:hello@ezwebsite.nl" className="flex items-center space-x-6 group cursor-pointer w-fit max-w-full">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-300 shadow-md"
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">Email</p>
                  <p className="font-display font-bold text-lg md:text-2xl group-hover:text-violet-500 transition-colors truncate">hello@ezwebsite.nl</p>
                </div>
              </a>
              
              <a href="tel:+31612345678" className="flex items-center space-x-6 group cursor-pointer w-fit max-w-full">
                <motion.div 
                   whileHover={{ rotate: -15, scale: 1.1 }}
                   className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-300 shadow-md"
                >
                  <Phone className="w-5 h-5" />
                </motion.div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">Telefoon (24/7)</p>
                  <p className="font-display font-bold text-lg md:text-2xl group-hover:text-violet-500 transition-colors truncate">+31 6 1234 5678</p>
                </div>
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-7/12 relative w-full"
          >
            {/* Glass Card */}
            <div className="bg-slate-100 dark:bg-neutral-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl dark:shadow-2xl relative overflow-hidden group">
              
              {/* Animated Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex justify-between items-center mb-8 md:mb-10">
                 <h3 className="font-display font-bold text-xl md:text-2xl uppercase text-slate-900 dark:text-white">Start Project</h3>
                 <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${formState === 'success' ? 'bg-violet-500' : 'bg-green-500'} shadow-[0_0_10px_currentColor] animate-pulse`}></div>
                     <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                         {formState === 'success' ? 'Bericht verstuurd' : 'Online'}
                     </span>
                 </div>
              </div>

              <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                      >
                          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                              <CheckCircle className="w-10 h-10" />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-3xl mb-2">Bedankt!</h4>
                            <p className="text-slate-500 dark:text-gray-400 max-w-xs mx-auto">
                                We hebben je bericht ontvangen. We nemen zo snel mogelijk contact met je op.
                            </p>
                          </div>
                          <button 
                            onClick={() => setFormState('idle')}
                            className="text-sm font-bold uppercase tracking-widest text-violet-500 hover:text-violet-600"
                          >
                              Stuur nog een bericht
                          </button>
                      </motion.div>
                  ) : (
                    <motion.form 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="space-y-6 relative z-10 w-full" 
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <StyledInput 
                                label="Naam" 
                                placeholder="John Doe" 
                                value={formData.name}
                                onChange={(e: any) => handleChange('name', e.target.value)}
                                required
                            />
                            <StyledInput 
                                label="Bedrijf" 
                                placeholder="Jouw Bedrijf" 
                                value={formData.company}
                                onChange={(e: any) => handleChange('company', e.target.value)}
                            />
                        </div>
                        <StyledInput 
                            label="Email" 
                            type="email" 
                            placeholder="john@example.com" 
                            value={formData.email}
                            onChange={(e: any) => handleChange('email', e.target.value)}
                            required
                        />
                        <StyledInput 
                            label="Wat is je budget?" 
                            placeholder="€2k - €5k" 
                            value={formData.budget}
                            onChange={(e: any) => handleChange('budget', e.target.value)}
                        />
                        <StyledInput 
                            label="Vertel ons over je project" 
                            type="textarea" 
                            placeholder="Ik wil een nieuwe website die..." 
                            value={formData.message}
                            onChange={(e: any) => handleChange('message', e.target.value)}
                            required
                        />
                        
                        <div className="pt-4">
                        <button 
                            disabled={formState === 'submitting'}
                            className="w-full group relative overflow-hidden rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-display font-bold uppercase tracking-widest text-lg py-5 px-8 transition-all hover:bg-violet-600 dark:hover:bg-violet-600 hover:text-white dark:hover:text-white disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {formState === 'submitting' ? (
                                    <>
                                        Versturen...
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Verstuur Bericht
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                        </div>
                    </motion.form>
                  )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;