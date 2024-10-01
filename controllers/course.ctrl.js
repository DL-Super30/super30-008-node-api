// Create a new course
const courseDetail = {
  createCourse: async (req, res) => {
    const { courseName, courseFee, description } = req.body;
    const courseBrochure = req.file ? req.file.filename : null; // Save file path
    console.log(req.CourseModel);
    try {
      const newCourse = await req.CourseModel.create({
        courseName,
        courseFee,
        description,
        courseBrochure,
      });
      res.status(201).json(newCourse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get all courses
  getAllCourse: async (req, res) => {
    try {
      const courses = await req.CourseModel.findAll();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = courseDetail;
