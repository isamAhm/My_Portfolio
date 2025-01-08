import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Allowed characters for the randomization effect
const allowedCharacters = ['X', '$', 'Y', '#', '?', '*', '0', '1', '+'];

// Function to return a random character
function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
  return allowedCharacters[randomIndex];
}

// Function to create an event handler for hover effects
function createEventHandler() {
  let isInProgress = false;
  const BASE_DELAY = 70;

  return function handleHoverEvent(e: MouseEvent) {
    if (isInProgress) return;

    const target = e.target as HTMLElement;
    const text = target.innerText;
    const randomizedText = text.split('').map(getRandomCharacter).join('');

    for (let i = 0; i < text.length; i++) {
      isInProgress = true;

      setTimeout(() => {
        const nextIndex = i + 1;
        target.innerText = `${text.substring(0, nextIndex)}${randomizedText.substring(nextIndex)}`;
        if (nextIndex === text.length) {
          isInProgress = false;
        }
      }, i * BASE_DELAY);
    }
  };
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useGSAP(() => {
    const inputs = formRef.current?.querySelectorAll('input, textarea, button');
    if (!inputs) return;

    gsap.from(inputs, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'center center',
        invalidateOnRefresh: true,
      },
      onComplete: () => gsap.set(inputs, { clearProps: 'all' }),
    });
  }, { scope: sectionRef });

  useEffect(() => {
    const elements = document.querySelectorAll('.text-hover-effect');
    elements.forEach((element) => {
      const eventHandler = createEventHandler();
      element.addEventListener('mouseover', eventHandler);
    });

    return () => {
      elements.forEach((element) => {
        const eventHandler = createEventHandler();
        element.removeEventListener('mouseover', eventHandler);
      });
    };
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_YOUR_SERVICE_ID,
        import.meta.env.VITE_YOUR_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_YOUR_PUBLIC_KEY
      );
      

      if (result.status === 200) {
        setFeedbackMessage('Message sent successfully!');
        formRef.current.reset();
      } else {
        setFeedbackMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setFeedbackMessage('Error sending message. Please check your network and try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen bg-transparent py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-white">Let's Connect</h2>
        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-800 p-3 text-white 
                       placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-800 p-3 text-white 
                       placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={10}
              className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-800 p-3 text-white 
                       placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
              placeholder="Your message..."
              required
            />
          </div>
          <Button type="submit" size="lg" disabled={isSending} className="w-full hover:shadow-lg hover:shadow-blue-950 group">
            <span className="relative flex items-center gap-2">
              <span className="text-hover-effect">
                {isSending ? 'Sending...' : 'Send Message'}
              </span>
              <Mail className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
          {feedbackMessage && <p className="mt-4 text-center text-sm text-gray-300">{feedbackMessage}</p>}
        </form>
      </div>
      <div className="mt-36 flex justify-center gap-6">
        <a
          href="https://github.com/isamAhm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition-colors hover:text-white"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/isam-ahmed-b0b980306"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 transition-colors hover:text-white"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </section>
  );
}
