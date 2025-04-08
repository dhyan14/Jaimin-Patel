import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AcademicCapIcon, BookOpenIcon, DocumentTextIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { coursesData, assignmentsData } from '../data/courses';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Navigation from '../components/Navigation';
import AssignmentSubmission from '../components/AssignmentSubmission';

export default function Resources() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [contentType, setContentType] = useState(null);

  const handleReset = () => {
    setSelectedCourse(null);
    setSelectedSemester(null);
    setSelectedUnit(null);
    setContentType(null);
  };

  const handleBack = () => {
    if (selectedUnit) {
      setSelectedUnit(null);
    } else if (selectedSemester) {
      setSelectedSemester(null);
    } else if (selectedCourse) {
      setSelectedCourse(null);
    } else {
      setContentType(null);
    }
  };

  const getEmbedUrl = (url) => {
    const fileId = url.match(/\/d\/([^/]+)\/view/)[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const getCurrentData = () => {
    return contentType === 'assignments' ? assignmentsData : coursesData;
  };

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const renderAssignments = () => {
    if (selectedAssignment) {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setSelectedAssignment(null)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Assignments
            </button>
          </div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-display font-bold text-gray-900 mb-6"
          >
            {selectedAssignment.title}
          </motion.h2>
          <AssignmentSubmission 
            assignmentUrl={selectedAssignment.url}
            dueDate={selectedAssignment.dueDate}
            assignmentId={selectedAssignment.id} 
          />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-display font-bold text-gray-900"
        >
          Available Assignments
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(assignmentsData).map(([key, assignment]) => (
            <Card
              key={key}
              title={assignment.title}
              subtitle={assignment.description}
              onClick={() => setSelectedAssignment({ ...assignment, id: key })}
              icon={DocumentTextIcon}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!contentType) {
      return (
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-display font-bold text-gray-900"
          >
            Select Content Type
          </motion.h2>
          <Navigation onSelect={setContentType} />
        </div>
      );
    }

    if (contentType === 'assignments') {
      return renderAssignments();
    }

    if (!selectedCourse) {
      return (
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-display font-bold text-gray-900"
          >
            Select Your Course
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(getCurrentData()).map((course) => (
              <Card
                key={course}
                title={course}
                subtitle="Click to view semesters"
                onClick={() => {
                  setSelectedCourse(course);
                  toast.success(`Selected ${course}`);
                }}
                icon={AcademicCapIcon}
              />
            ))}
          </div>
        </div>
      );
    }

    if (!selectedSemester) {
      return (
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-display font-bold text-gray-900"
          >
            Select Semester
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(getCurrentData()[selectedCourse]).map((semester) => (
              <Card
                key={semester}
                title={semester}
                subtitle="Click to view units"
                onClick={() => {
                  setSelectedSemester(semester);
                  toast.success(`Selected ${semester}`);
                }}
                icon={BookOpenIcon}
              />
            ))}
          </div>
        </div>
      );
    }

    if (!selectedUnit) {
      return (
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-display font-bold text-gray-900"
          >
            Select Unit
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(getCurrentData()[selectedCourse][selectedSemester]).map((unit) => (
              <Card
                key={unit}
                title={unit}
                subtitle="Click to view PDF"
                onClick={() => {
                  setSelectedUnit(unit);
                  toast.success(`Opening ${unit}`);
                }}
                icon={DocumentTextIcon}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6 bg-primary-50">
          <h2 className="text-xl font-display font-semibold text-primary-900">
            {selectedCourse} - {selectedSemester} - {selectedUnit}
          </h2>
        </div>
        <div className="aspect-[16/9] w-full bg-gray-100">
          <iframe
            src={getEmbedUrl(getCurrentData()[selectedCourse][selectedSemester][selectedUnit])}
            className="w-full h-full"
            allow="autoplay"
            frameBorder="0"
          ></iframe>
        </div>
      </motion.div>
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {(contentType || selectedCourse || selectedSemester || selectedUnit) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleBack}
            className="mb-6 inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </motion.button>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCourse}-${selectedSemester}-${selectedUnit}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
