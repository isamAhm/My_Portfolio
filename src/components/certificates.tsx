import { Award } from 'lucide-react';
import React, { useState } from 'react';
import udacity from '../assets/udacity.png';
import networking from '../assets/networking_essential.png';
import packettracer from '../assets/pkt.png';
import networkingbadge from '../assets/networking-essentials-badge.png';
import { useTheme } from '@/context/ThemeContext';

function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<null | number>(null);
  const { theme } = useTheme();

  const certificates = [
    {
      name: "Fundamentals of Programming",
      issuer: "Udacity",
      date: "2024",
      image: udacity,
      url: "https://www.udacity.com/certificate/e/fb8ae44c-4b7f-11ef-98a4-43079eeac7a4"
    },
    {
      name: "Cisco: Networking Essentials",
      issuer: "Cisco",
      date: "2023",
      image: networking,
      url: "https://www.netacad.com/courses/networking-essentials?courseLang=en-US"
    },
    {
      name: "Cisco: Introduction to Packet Tracer",
      issuer: "Cisco",
      date: "2023",
      image: packettracer,
      url: "https://www.netacad.com/cisco-packet-tracer"
    },
    {
      name: "Cisco: Networking Essentials Badge",
      issuer: "Cisco",
      date: "2023",
      image: networkingbadge,
      url: "https://www.credly.com/badges/4a2810a8-0cd8-4c9c-a92d-ff0639191886/public_url"
    }
  ];

  return (
    <div>
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Award className="w-6 h-6 text-blue-600" />
            <h2 className={`text-3xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Certificates</h2>
          </div>
          <p className={`text-xl mb-8 ${theme === 'dark' ? '' : 'text-black'}`}>Certificates I received in my journey</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <div 
                key={index}
                onClick={() => setSelectedCertificate(index)}
                className={`group border-2 border-blue-700 block hover:shadow-blue-950 hover:ease-in-out hover:transition-transform hover:duration-500  rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden transform hover:-translate-y-1 duration-300 cursor-pointer ${theme === 'dark' ? 'bg-transparent' : 'bg-gradient-to-br from-white via-blue-200 to-white backdrop-blur-md'}`}
              >
                <div className="relative overflow-hidden">
                  <div className={`absolute inset-0  z-10 ${theme === 'dark' ? 'bg-gradient-to-t from-black/60 via-transparent/30 to-transparent' : 'bg-gradient-to-t from-white/60 via-transparent/10 to-transparent'}`} />
                  <img
                    src={certificate.image}
                    alt={certificate.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-600 transition-colors">
                    {certificate.name}
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{certificate.issuer}</p>
                  <p className="text-sm text-blue-700 mt-2">{certificate.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCertificate !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className={`relative  rounded-xl max-w-4xl w-full p-6 border border-blue-800 ${theme === 'dark' ? 'bg-gradient-to-br from-black via-gray-950 to-black' : 'bg-gradient-to-br from-white via-blue-200 to-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute -top-3 -right-3 bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img
              src={certificates[selectedCertificate].image}
              alt={certificates[selectedCertificate].name}
              className="w-full h-full max-h-[70vh] object-contain rounded-lg"
            />
            
            <div className="mt-4 text-center">
              <h3 className={`text-2xl font-bold  mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {certificates[selectedCertificate].name}
              </h3>
              <div className="flex justify-center gap-4 mt-4">
                
                <a
                  href={certificates[selectedCertificate].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  View Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Certificates;