// individualController.js

const Individual = require('../models/individual');

exports.createIndividual = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Validate dates
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      throw new Error('Invalid date format');
    }

    // Create a new individual in the database using the data from the request body
    const individual = await Individual.create(req.body);

    // Log the created individual for debugging
    console.log('Created Individual:', individual);

    // Extract specific fields for the response
    const responseData = {
      _id: individual._id,
      projectName: individual.projectName,
      startDate: individual.startDate.toISOString(),
      endDate: individual.endDate.toISOString(),
      // Add other fields as needed
    };

    // Respond with a success status and the specific individual data
    res.status(201).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error('Error creating individual:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

exports.getIndividualProjects = async (req, res) => {
  try {
    const individuals = await Individual.find();

    // Respond with all individual projects
    res.status(200).json({
      success: true,
      data: individuals,
    });
  } catch (error) {
    console.error('Error fetching individual projects:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

exports.getFilteredProjects = async (req, res) => {
  try {
    const { status } = req.params;
    const currentDate = new Date().toISOString();
    let filteredProjects = [];

    const individuals = await Individual.find();

    if (status === 'Project Schedule') {
      filteredProjects = individuals.filter((project) => new Date(project.startDate) > new Date(currentDate));
    } else if (status === 'In Progress') {
      filteredProjects = individuals.filter(
        (project) => new Date(project.startDate) <= new Date(currentDate) && new Date(project.endDate) >= new Date(currentDate)
      );
    } else if (status === 'Complete') {
      filteredProjects = individuals.filter((project) => new Date(project.endDate) < new Date(currentDate));
    }

    // Respond with filtered projects
    res.status(200).json({
      success: true,
      data: filteredProjects,
    });
  } catch (error) {
    console.error('Error fetching filtered projects:', error.message);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

// Helper function to validate dates
const isValidDate = (dateString) => {
  return !isNaN(new Date(dateString).getTime());
};

exports.updateIndividualProject = async (req, res) => {
  try {
    const { projectName } = req.params;
    const updatedData = req.body; // Updated data from the front end

    // Find the individual project by name and update it with the new data
    const updatedProject = await Individual.findOneAndUpdate(
      { projectName },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedProject) {
      // If the project is not found, respond with an error
      return res.status(404).json({ success: false, message: 'Individual project not found' });
    }

    // Respond with a success status and the updated project data
    res.status(200).json({ success: true, message: 'Individual project updated successfully', data: updatedProject });
  } catch (error) {
    console.error('Error updating Individual project:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};