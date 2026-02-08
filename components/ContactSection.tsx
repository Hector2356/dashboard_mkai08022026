
import React from 'react';

const ContactSection: React.FC = () => {
  // Using a mailto link for simplicity instead of a full form with state management
  const mailtoEmail = 'mikmusic2356@gmail.com';
  const subject = encodeURIComponent('Consulta de Producción Musical');
  const body = encodeURIComponent('Hola MIK MUSIC,\\n\\nMe gustaría hacer una consulta sobre sus servicios.\\n\\n[Escribe aquí tu mensaje]\\n\\nGracias.');
  const mailtoLink = `mailto:${mailtoEmail}?subject=${subject}&body=${body}`;

  return (
    <section id="contacto" className="py-20 md:py-32 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-anton">¿Listo para Crear?</h2>
          <p className="text-lg text-gray-400 mt-4 leading-relaxed">
            Tienes un proyecto en mente o alguna pregunta sobre nuestros servicios.
            <br className="hidden md:block" />
            No dudes en contactarnos. Estamos aquí para ayudarte a hacer realidad tu visión musical.
          </p>
          <div className="mt-12">
            <a
              href={mailtoLink}
              id="contact-cta-button"
              className="inline-block bg-green-600 text-white font-bold uppercase tracking-widest py-4 px-10 rounded-md hover:bg-green-500 transition-all duration-300 transform hover:scale-105 neon-glow-green"
            >
              Enviar un Mensaje
            </a>
            <p className="text-sm text-gray-500 mt-4">
              O escríbenos directamente a <a href={`mailto:${mailtoEmail}`} className="text-green-400 hover:underline">{mailtoEmail}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;