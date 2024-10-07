import { CourseModel } from "../postgres/postgres.js"

const createCourse = async (req, res) => {
     let {
            Name,
            Fee,
            Description,
            Brochure
         } = req.body;
      
      
      try {
        const newCourse = await CourseModel.create({
          Name,
          Fee,
          Description,
          Brochure,
        });
        if (newCourse){
            res.status(201);
            res.send({
                status:"courses successfully created",
                data:newCourse ,
            });
        }
       
      } catch (error) {
        res.status(500).send({
            status: "Error",
            error: "An error occurred during registration",
            error,
          });
      }
    };
  

    const getCourse = async (req, res) => {
      try {
        const courses = await CourseModel.findAll();
        res.status(201);
        res.send({
            status:"courses successfully created",
            data:courses,
        });
      } catch (error) {
        res.status(500).send({
            status: "Error",
            error: "An error occurred during registration",
            error,
          });
      }
    };


   const updateCourse =async (req, res) => {
      const id = req.params;
      let {
         Name,
         Fee, 
         Description,
         Brochure ,
         } = req.body;
   
      try {
        const course = await CourseModel.findByPk(id);
      
  
        const updatedCourse = await course.update({
          Name,
          Fee,
          Description,
          Brochure ,
        });
        res.status(201);
        res.send({
          status: "Success",
          message: "courses Updated Successfully ",
          data: updatedCourse,
        });
       
      } catch (error) {
        res.status(500);
        res.send({
          status: "Error",
          message: "error occured while updating the course in databse ",
          error,
        });
      }
    };
  

   const deleteCourse=async (req, res) => {
      const id = req.params;
  
      try {
        const course = await CourseModel.findByPk(id);
        if (!course) {
            res.status(404);
            res.send({
              status: "courses not found ",
              error: error,
            });
        }
  else {
        const deletedCourse = course ;
        await course.destroy();
        res.status(200);
        res.send({
          message: "user deleted !",
          data: deletedCourse,
        });
    }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
 
  };
  
  export {
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
 }
  
  