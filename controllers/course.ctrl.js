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
  updateCourse: async (req, res) => {
    const courseId = req.params.id;
    const { courseName, courseFee, description } = req.body;
    const courseBrochure = req.file ? req.file.filename : undefined;

    try {
      const course = await req.CourseModel.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const updatedCourse = await course.update({
        courseName,
        courseFee,
        description,
        ...(courseBrochure && { courseBrochure }),
      });

      res.json(updatedCourse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Partially update a course (PATCH method)
  patchCourse: async (req, res) => {
    const courseId = req.params.id;
    const updates = req.body;
    if (req.file) {
      updates.courseBrochure = req.file.filename;
    }

    try {
      const course = await req.CourseModel.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const updatedCourse = await course.update(updates);
      res.json(updatedCourse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete a course
  deleteCourse: async (req, res) => {
    const courseId = req.params.id;

    try {
      const course = await req.CourseModel.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      await course.destroy();
      res.json({ message: "Course deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = courseDetail;
