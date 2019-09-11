const express = require('express');
const router = express.Router();
const courses = [
  {id:1,name:'course1'},
  {id:2,name:'course2'},
  {id:3,name:'course3'},
]

router.get('',(req,res)=>{
  res.send(courses);
});

router.post('',(req,res)=>{
  //const result = validateCourse(req.body);
  //object destructuring introduced in modern JS
  const{error} = validateCourse(req.body); //same as using result.error
  // console.log(result);
  if(error){
    res.status(400).send(error.details[0].message);
  }
  const course = {
    id: courses.length+1,
    name:req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put('/:id',(req,res)=>{
  //Look up the course and if it does not exists return 404
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('requested course was not found');
    //same as below
    // res.status(404).send('requested course was not found');
    // return;

  //validate and return 400 if invalid
  //const result = validateCourse(req.body);
  //object destructuring introduced in modern JS
  const{error} = validateCourse(req.body); //same as using result.error
  // console.log(result);
  if(error) return res.status(400).send(error.details[0].message);
  //Update and return the updated one
  course.name = req.body.name;
  res.send(course);
});

router.delete('/:id',(req,res)=>{
  //Look for a course and raise error if not exists
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('requested course was not found');
  //delete
  const index = courses.indexOf(course);
  courses.splice(index,1);
  //send this course object
  res.send(course);
})

//'/api/courses/1'
router.get('/:id',(req,res)=>{
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('requested course was not found');
  res.send(course);
});

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  }
  let result = Joi.validate(course,schema);
  return result
}

module.exports = router;
