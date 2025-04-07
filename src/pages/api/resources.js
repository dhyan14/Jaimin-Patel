import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('educational_resources');

    const { courseType, semester, type } = req.query;
    const query = {};
    
    if (courseType) query.courseType = courseType;
    if (semester) query.semester = parseInt(semester);

    // Determine which collection to query
    const collection = type === 'assignments' ? 'assignments' : 'units';
    
    // Create the collection if it doesn't exist
    const collections = await db.listCollections({ name: collection }).toArray();
    if (collections.length === 0) {
      await db.createCollection(collection);
      // Return empty array if collection was just created
      return res.status(200).json([]);
    }
    
    // Get the data
    const data = await db.collection(collection)
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ message: 'Error fetching resources' });
  }
}
