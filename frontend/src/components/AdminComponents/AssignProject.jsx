import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import "./styles/Forms.css"


const AssignProject = () => {
  const [mentors, setMentors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  //Fetching mentors and projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorData = await axios.get(
          "https://project-admin-mentor-portal.onrender.com/mentor/mentors"
        );
        const projectData = await axios.get(
          "https://project-admin-mentor-portal.onrender.com/mentor/projects"
        );
        setMentors(mentorData.data);
        setProjects(projectData.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchData();
  }, []);

  //assigning part
  const handleAssign = async () => {
    try {
      const res = await axios.post(
        "https://project-admin-mentor-portal.onrender.com/admin/assignProject",
        { mentorId: selectedMentor, projectId: selectedProject }
      );
      toast(res.data.message);
    } catch (error) {
      console.log("Error assigning project", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Box className="form-container"
        sx={{
          maxWidth: "400px",
          textAlign: "center",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginTop:"3rem",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Assign Project to Mentor
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <InputLabel id="mentor-label">Select Mentor</InputLabel>
          <Select
            labelId="mentor-label"
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
          >
            {mentors.map((mentor) => (
              <MenuItem key={mentor._id} value={mentor._id}>
                {mentor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "16px" }}>
          <InputLabel id="project-label">Select Project</InputLabel>
          <Select
            labelId="project-label"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button className="add-btn" onClick={handleAssign}>
          Assign Project
        </Button>
      </Box>
    </div>
  );
};

export default AssignProject;
