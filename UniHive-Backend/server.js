const express = require("express");
const cors = require("cors");
const {User} = require('./models'); 
require("dotenv").config();

const app = express();



app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      // the 'finish' event will be emitted when the response is handed over to the OS
      console.log(`Response Status: ${res.statusCode}`);
    });
    next();
    
  });
app.use(express.json());

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));



// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


// Express code

//app.use(express.json()); // To parse JSON bodies

app.post("/signup", async (req, res) => {

    console.log('Received signup request:', req.body);
  const { 
    fullName, 
    email, 
    password, 
    confirmPassword,
    collegeLevel,
    selectedCollege,
    selectedMajor
  } = req.body;


  // Input validation
/*
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      error: 'Passwords do not match'
    });
  }
*/

  // Create user object

  const user = {
    name: JSON.stringify(fullName),
    email: JSON.stringify(email),
    password: JSON.stringify(password),
    confirmPassword: JSON.stringify(confirmPassword),
    collegeLevel:JSON.stringify(collegeLevel), 
    college: JSON.stringify(selectedCollege),
    major: JSON.stringify(selectedMajor)
  };

  try {

    // Save user to database
    await User.create({
        name: req.body.fullName,
        college_level: req.body.collegeLevel,
        email: req.body.email,
        password: req.body.password,
        college: req.body.selectedCollege,
        major: req.body.selectedMajor,
    });

    res.status(201).json({ message: 'User created!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating user' }) 
  }

});









// Start the server
const port = 3010;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  //console.log("SERVER IS RUNNING AT "+ app.address().port);
});


/*
// Define the POST endpoint to handle form submission
router.post("/api/submit-form", async (req, res) => {
  try {
    // Get the form data from the request body
    const formData = req.body;

    // Insert the form data into the database using the User model
    const newUser = await User.create({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      college_level: formData.collegeLevel,
      college:formData.selectedCollege,
      major:formData.selectedMajor,
    });

    // Respond with a success message and the newly created user (optional)
    res.json({ message: "Form data submitted successfully!", newUser });
  } catch (error) {
    console.error(error);
    // Handle error (e.g., send an error response to the frontend)
    res.status(500).json({ message: "Error submitting form data." });
  }
});

// Export the router
module.exports = router;

 const newUser = await User.createTable({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        college_level: req.body.college_level,
        college:req.body.college,
        major:req.body.major,
    });







      const newUser = await User.create({
        name: formData.name,
        college_level: formData.college_level,
      email: formData.email,
      password: formData.password,
      college:formData.college,
      major:formData.major,
      course_intrest: formData.course_intrest,
    });

    */