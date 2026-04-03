import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useLanguage } from '../i18n/LanguageContext';

// Modern styling for inputs - Updated for better light mode contrast
const StyledInput = ({ label, type = "text", placeholder, value, onChange, required = false }: any) => (
    <div className="flex flex-col gap-2 group w-full">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 group-focus-within:text-violet-600 transition-colors">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'textarea' ? (
            <textarea
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all resize-none placeholder:text-slate-400 hover:border-slate-300 shadow-sm"
            />
        ) : (
             <input
                required={required}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 hover:border-slate-300 shadow-sm"
             />
        )}
    </div>
);

const Contact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { lang, t } = useLanguage();

  // Form Data State
  const [formData, setFormData] = useState({
      name: '',
      company: '',
      email: '',
      budget: '',
      message: ''
  });

  useSEO(ref, t.contact.seoTitle[lang], t.contact.seoDesc[lang]);

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
    <section id="contact" ref={ref} className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden transition-colors duration-300 w-full">
      {/* Background Glow - Contained within overflow-hidden section */}
      <div className="absolute top-1/2 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-violet-900/5 blur-[80px] md:blur-[150px] pointer-events-none rounded-full transform -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          <div className="lg:w-5/12">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-8xl uppercase leading-[0.9] mb-6 md:mb-8">
              {t.contact.headline1[lang]} <br />
              <span className="text-violet-600">{t.contact.headline2[lang]}</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 md:mb-12">
              {t.contact.subtext[lang]}
            </p>

            <div className="space-y-8 md:space-y-10">
              <a href="mailto:info@ezwebsite.nl" className="flex items-center space-x-6 group cursor-pointer w-fit max-w-full">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-300 shadow-md"
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t.contact.emailLabel[lang]}</p>
                  <p className="font-display font-bold text-lg md:text-2xl group-hover:text-violet-500 transition-colors truncate">info@ezwebsite.nl</p>
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
            <div className="bg-slate-100 backdrop-blur-xl border border-slate-200 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl relative overflow-hidden group">

              {/* Animated Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex justify-between items-center mb-8 md:mb-10">
                 <h3 className="font-display font-bold text-xl md:text-2xl uppercase text-slate-900">{t.contact.formTitle[lang]}</h3>
                 <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${formState === 'success' ? 'bg-violet-500' : 'bg-green-500'} shadow-[0_0_10px_currentColor] animate-pulse`}></div>
                     <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                         {formState === 'success' ? t.contact.messageSent[lang] : t.contact.online[lang]}
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
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                              <CheckCircle className="w-10 h-10" />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-3xl mb-2">{t.contact.thanks[lang]}</h4>
                            <p className="text-slate-500 max-w-xs mx-auto">
                                {t.contact.thanksMessage[lang]}
                            </p>
                          </div>
                          <button
                            onClick={() => setFormState('idle')}
                            className="text-sm font-bold uppercase tracking-widest text-violet-500 hover:text-violet-600"
                          >
                              {t.contact.sendAnother[lang]}
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
                                label={t.contact.nameLabel[lang]}
                                placeholder={t.contact.namePlaceholder[lang]}
                                value={formData.name}
                                onChange={(e: any) => handleChange('name', e.target.value)}
                                required
                            />
                            <StyledInput
                                label={t.contact.companyLabel[lang]}
                                placeholder={t.contact.companyPlaceholder[lang]}
                                value={formData.company}
                                onChange={(e: any) => handleChange('company', e.target.value)}
                            />
                        </div>
                        <StyledInput
                            label={t.contact.emailFieldLabel[lang]}
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e: any) => handleChange('email', e.target.value)}
                            required
                        />
                        <StyledInput
                            label={t.contact.budgetLabel[lang]}
                            placeholder={t.contact.budgetPlaceholder[lang]}
                            value={formData.budget}
                            onChange={(e: any) => handleChange('budget', e.target.value)}
                        />
                        <StyledInput
                            label={t.contact.messageLabel[lang]}
                            type="textarea"
                            placeholder={t.contact.messagePlaceholder[lang]}
                            value={formData.message}
                            onChange={(e: any) => handleChange('message', e.target.value)}
                            required
                        />

                        <div className="pt-4">
                        <button
                            disabled={formState === 'submitting'}
                            className="w-full group relative overflow-hidden rounded-2xl bg-slate-900 text-white font-display font-bold uppercase tracking-widest text-lg py-5 px-8 transition-all hover:bg-violet-600 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {formState === 'submitting' ? (
                                    <>
                                        {t.contact.submitting[lang]}
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        {t.contact.submit[lang]}
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
