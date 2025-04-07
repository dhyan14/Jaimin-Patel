import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AcademicCapIcon, BookOpenIcon, DocumentTextIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Navigation from '../components/Navigation';
import AssignmentSubmission from '../components/AssignmentSubmission';

export default function Resources() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [contentType, setContentType] = useState(null);
  const [coursesData, setCoursesData] = useState({});
  const [assignmentsData, setAssignmentsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when component mounts
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      // Fetch units data
      const unitsRes = await fetch('/api/resources?type=units');
      const unitsData = await unitsRes.json();
      
      // Fetch assignments data
      const assignmentsRes = await fetch('/api/resources?type=assignments');
      const assignmentsData = await assignmentsRes.json();
      
      // Process units data into the format needed
      const processedUnits = processUnitsData(unitsData);
      setCoursesData(processedUnits);
      
      // Process assignments data
      const processedAssignments = processAssignmentsData(assignmentsData);
      setAssignmentsData(processedAssignments);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
      setLoading(false);
    }
  };

  // Process units data from MongoDB into the format needed by the UI
  const processUnitsData = (units) => {
    const processed = {};
    
    units.forEach(unit => {
      const courseType = unit.courseType.toUpperCase();
      const semester = `Semester ${unit.semester}`;
      const unitName = unit.unit;
      
      if (!processed[courseType]) {
        processed[courseType] = {};
      }
      
      if (!processed[courseType][semester]) {
        processed[courseType][semester] = {};
      }
      
      processed[courseType][semester][unitName] = unit.pdfLink;
    });
    
    return processed;
  };
  
  // Process assignments data from MongoDB into the format needed by the UI
  const processAssignmentsData = (assignments) => {
    const processed = {};
    
    assignments.forEach((assignment, index) => {
      processed[`assignment-${index}`] = {
        title: assignment.assignmentTitle,
        description: `${assignment.courseType.toUpperCase()} - Semester ${assignment.semester} - ${assignment.unit}`,
        url: assignment.pdfLink,
        dueDate: assignment.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Default due date 1 week from now
      };
    });
    
    return processed;
  };

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
    try {
      const fileId = url.match(/\/d\/([^/]+)\/view/)[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    } catch (error) {
      // If the URL doesn't match the pattern, return the original URL
      return url;
    }
  };

  const getCurrentData = () => {
    return contentType === 'assignments' ? assignmentsData : coursesData;
  };

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const renderAssignments = () => {
    if (loading) {
      return <div className="text-center py-10">Loading assignments...</div>;
    }
    
    if (Object.keys(assignmentsData).length === 0) {
      return <div className="text-center py-10">No assignments available</div>;
    }
    
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
    if (loading) {
      return <div className="text-center py-10">Loading resources...</div>;
    }
    
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
    
    if (Object.keys(coursesData).length === 0) {
      return <div className="text-center py-10">No course materials available</div>;
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
