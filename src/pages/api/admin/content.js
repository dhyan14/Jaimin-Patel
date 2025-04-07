import clientPromise from '../../../lib/mongodb';
import { verifyToken } from '../../../middleware/auth';

export default async function handler(req, res) {
  // Check authentication first
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('educational_resources');

    // GET method to retrieve content
    if (req.method === 'GET') {
      const { type, courseType, semester } = req.query;
      const query = {};
      
      if (courseType) query.courseType = courseType;
      if (semester) query.semester = parseInt(semester);

      const collection = type === 'assignments' ? 'assignments' : 'units';
      const content = await db.collection(collection).find(query).sort({ createdAt: -1 }).toArray();
      
      return res.status(200).json(content);
    }

    // POST method to add new content
    if (req.method === 'POST') {
      const { courseType, semester, unit, pdfLink, assignmentTitle, assignmentDescription } = req.body;

      if (!courseType || !semester || !unit) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }

      const content = {
        courseType,
        semester: parseInt(semester),
        unit,
        pdfLink,
        assignmentTitle,
        assignmentDescription,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Insert into appropriate collection
      if (assignmentTitle && assignmentDescription) {
        await db.collection('assignments').insertOne(content);
      } else {
        await db.collection('units').insertOne(content);
      }

      return res.status(200).json({ message: 'Content added successfully' });
    }

    // Method not allowed
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ message: 'Error processing request', error: error.message });
  }
}
