import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../controller/controller.jsx';
import Winner from './Winner';  // Child component that renders winner details
import '../styles/Winner.css'; // Add any styles needed

const WinnerParent = () => {
  const [projects, setProjects] = useState([]);  // State to hold fetched projects
  const [loading, setLoading] = useState(true);  // Loading state for projects

  // Fetch projects data when the component mounts
  useEffect(() => {
    const getProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();

        // Sort and format projects based on pitching score
        const sortedProjects = fetchedProjects
          .sort((a, b) => b.pitching - a.pitching) // Sort by pitchingScore in descending order
          .map((project, index) => ({
            ...project,
            formattedTitle: `Project ${index + 1}: ${project.title}`,
          }));

        setProjects(sortedProjects);  // Update state with sorted and formatted projects
        setLoading(false);  // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching projects:', error);  // Handle any errors
        setLoading(false);  // Set loading to false even if error occurs
      }
    };

    getProjects();
  }, []);  // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      {loading ? (
        <div>Loading projects...</div>  // Show loading message while fetching
      ) : (
        <Winner projects={projects} />  // Pass the fetched and formatted projects to Winner component
      )}
    </div>
  );
};

export default WinnerParent;

