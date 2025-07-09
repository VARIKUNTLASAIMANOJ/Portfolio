import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import SpaceParticles from './SpaceParticles';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        'service_5n7ghlf',    // Your service ID
        'template_00pm90g',   // Your template ID
        formRef.current,
        'F5m1YXEgae1B1FPrY'   // Your public key
      )
      .then(() => {
        setStatusMessage({ type: 'success', text: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setStatusMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden bg-black overflow-x-hidden"
    >
      <SpaceParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to work together? I'd love to hear about your project and discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'varikuntlasaimanoj@gmail.com',
                    href: 'mailto:varikuntlasaimanoj@gmail.com'
                  },
                  {
                    icon: Phone,
                    label: 'Phone',
                    value: '+91-91#######1',
                    href: 'tel:+91-9100161401'
                  },
                  { icon: MapPin, label: 'Location', value: 'Hyderabad, India', href: null }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-center p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl hover:bg-gray-900/50 transition-all duration-300 border border-white/20"
                  >
                    <div className="w-12 h-12 bg-gray-800/60 rounded-lg flex items-center justify-center mr-4 border border-white/10">
                      <item.icon className="text-gray-300" size={20} />
                    </div>
                    <div className="break-words max-w-full">
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white hover:text-gray-300 transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white break-words">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex space-x-4 flex-wrap">
                {[
                  {
                    icon: Github,
                    href: 'https://github.com/VARIKUNTLASAIMANOJ',
                    label: 'GitHub'
                  },
                  {
                    icon: Linkedin,
                    href: 'https://www.linkedin.com/in/varikuntla-sai-manoj-082b782b8/',
                    label: 'LinkedIn'
                  }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-900/30 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group border border-white/20"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <social.icon
                      className="text-gray-400 group-hover:text-black transition-colors"
                      size={20}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full max-w-full px-4 py-3 bg-gray-800/60 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 border border-white/20"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full max-w-full px-4 py-3 bg-gray-800/60 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 border border-white/20"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full max-w-full px-4 py-3 bg-gray-800/60 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 resize-none border border-white/20"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:shadow-white/30 transition-all duration-300 group relative overflow-hidden border-2 border-white"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Send className="mr-3 group-hover:translate-x-1 transition-transform relative z-10" size={20} />
                  <span className="relative z-10">Send Message</span>
                </motion.button>

                {/* Status Message */}
                {statusMessage && (
                  <p
                    className={`text-sm mt-4 ${
                      statusMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {statusMessage.text}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
