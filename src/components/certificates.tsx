import { Award } from 'lucide-react';
import React from 'react';
import udacity from '../assets/udacity.png';
import networking from '../assets/networking_essential.png';
import packettracer from '../assets/pkt.png';
import networkingbadge from '../assets/networking-essentials-badge.png';

function Certificates() {
  return (
    <div>
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Award className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-white">Certificates</h2>
          </div>
          <p className='text-xl mb-8'>Certificates I received in my journey</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
            ].map((certificate, index) => (
              <a 
                key={index}
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-blue-700 block hover:shadow-blue-950 hover:ease-in-out hover:transition-transform hover:duration-500 bg-transparent rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden transform hover:-translate-y-1 duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  {/* Fading Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent/30 to-transparent z-10" />
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
                  <p className="text-white">{certificate.issuer}</p>
                  <p className="text-sm text-blue-700 mt-2">{certificate.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Certificates;