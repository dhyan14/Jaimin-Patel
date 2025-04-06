import { motion } from 'framer-motion';
import { AcademicCapIcon, BriefcaseIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function About() {
  const details = [
    {
      icon: AcademicCapIcon,
      title: 'Educational Qualifications',
      content: 'NET-JRF(Mathematics), M.Sc. (Mathematics), B.Sc. (Mathematics), B. Tech (Mechanical)',
    },
    {
      icon: BriefcaseIcon,
      title: 'Academic Experience',
      content: '2 Years',
    },
    {
      icon: EnvelopeIcon,
      title: 'Contact',
      content: 'jaiminpatel@svgu.ac.in',
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden">
            <Image
              src="/jaimin-patel.jpg"
              alt="Jaimin Patel"
              fill
              style={{ objectFit: 'cover', objectPosition: '50% 65%' }}
              priority
              className="rounded-full"
            />
          </div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Jaimin Patel
          </h1>
          <p className="text-xl text-green-600 font-medium mb-6">
            Assistant Professor
          </p>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <detail.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {detail.title}
                </h3>
                <p className="text-gray-600">
                  {detail.title === 'Contact' ? (
                    <a href={`mailto:${detail.content}`} className="hover:text-green-600 transition-colors">
                      {detail.content}
                    </a>
                  ) : (
                    detail.content
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome to My Educational Portal
          </h2>
          <div className="prose prose-green max-w-none">
            <p>
              As an Assistant Professor with expertise in Mathematics, I am dedicated to providing quality education and resources to my students.
              This platform serves as a centralized hub for accessing course materials, assignments, and other educational resources.
            </p>
            <p className="mt-4">
              Feel free to explore the resources section where you'll find comprehensive study materials and assignments designed to enhance your learning experience.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
