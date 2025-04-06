import { motion } from 'framer-motion';
import { AcademicCapIcon, BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';

export default function About() {
  const details = [
    {
      icon: AcademicCapIcon,
      title: 'Education',
      content: 'Professor with expertise in Computer Science and Engineering',
    },
    {
      icon: BriefcaseIcon,
      title: 'Experience',
      content: 'Years of experience in teaching and research in computer science',
    },
    {
      icon: UserIcon,
      title: 'Teaching Philosophy',
      content: 'Focused on practical learning and student development',
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
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600">
            Dedicated to providing quality education and resources for computer science students.
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
                <p className="text-gray-600">{detail.content}</p>
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
              This platform is designed to provide students with easy access to educational
              resources, including lecture notes, assignments, and study materials. My goal
              is to facilitate learning and help students achieve their academic objectives.
            </p>
            <p className="mt-4">
              Feel free to explore the resources section for course materials and assignments.
              The content is regularly updated to ensure you have access to the latest
              educational materials.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
