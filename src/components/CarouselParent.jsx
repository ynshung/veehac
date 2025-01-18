import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../controller/controller.jsx';  // Assuming fetchProjects is your method to fetch data
import Swiper from "swiper/bundle";
import "swiper/css/bundle";  // Include the swiper styles
import '../styles/Carousel.css';
function validateFields(arr) {
  // Iterate over the array of objects
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];

    // Check if the required keys are filled and have valid values
    const requiredKeys = ['pitching', 'design', 'business', 'ideaImpact', 'uniqueness', 'description'];

    for (let key of requiredKeys) {
      if (!obj.hasOwnProperty(key) || obj[key] === null || obj[key] === 0 || obj[key] === '') {
        return false;  // Return false if any key is missing or invalid
      }
    }
  }

  return true; // Return true if all checks pass
}
const CarouselParent = () => {
  const [projects, setProjects] = useState([]);  // State to hold fetched projects
  const [loading, setLoading] = useState(true);  // Loading state for projects
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility
  const [modalData, setModalData] = useState({});  // Data to display in the modal

  // Fetch projects data when the component mounts
  useEffect(() => {
    const getProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();

        // Sort and format projects based on total score
        const sortedProjects = fetchedProjects
          .sort((a, b) => {
            const totalScoreA =
              a.pitching + a.design + a.business + a.ideaImpact + a.uniqueness;
            const totalScoreB =
              b.pitching + b.design + b.business + b.ideaImpact + b.uniqueness;
            return totalScoreB - totalScoreA;
          })
          .map((project, index) => ({
            ...project,
            totalScore:
              project.pitching +
              project.design +
              project.business +
              project.ideaImpact +
              project.uniqueness,
          }));

        // Exclude top 3 projects
        const remainingProjects = sortedProjects.slice(3);

        setProjects(remainingProjects);  // Update state with sorted and sliced projects
        setLoading(false);  // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching projects:', error);  // Handle any errors
        setLoading(false);  // Set loading to false even if error occurs
      }
    };

    getProjects();
  }, []);  // Empty dependency array ensures this runs only once on mount

  // Initialize Swiper after data is loaded
  useEffect(() => {
    if (projects.length > 0) {
      new Swiper(".card-wrapper", {
        loop: true,  // Ensure loop is enabled
        speed: 1000,  // Speed of the slide transition
        autoplay: {
          delay: 3000,  // Time between slides in ms
          disableOnInteraction: false,  // Keep autoplay running even after user interaction
        },
        effect: 'coverflow',  // The visual effect of the slides
        grabCursor: true,  // Show a grab cursor when hovering over the carousel
        centeredSlides: true,  // Center the active slide
        slidesPerView: 'auto',  // Automatically adjust the number of slides visible
        coverflowEffect: {
          rotate: 0,
          stretch: 80,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1440: { slidesPerView: 4, spaceBetween: 25 },
        },
      });
    }
  }, [projects]);

  // Function to handle modal opening and setting data
  const openModal = (project) => {
    setModalData(project);  // Set the data for the modal
    setIsModalOpen(true);  // Show the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);  // Hide the modal
  };
if (validateFields(projects)){
  return (
    <div>
      {loading ? (
        <div>Loading projects...</div>  // Show loading message while fetching
      ) : (
        <div className="container swiper">
          <div className="card-wrapper">
            <ul className="card-list swiper-wrapper">
              {projects.map((dev, index) => (
                <li key={index} className="card-item swiper-slide">
                  <a
                    href="javascript:void(0)"
                    className="card-link"
                    data-name={dev.name}
                    data-description={dev.description}
                    // No modal opening here, will open only when "More" button is clicked
                  >
                    <img src={dev.imageBase64 || "anonymous.jpg"} alt="Card Image" className="card-image" />
                    <p className="badge">{dev.name}</p>
                    <button 
                      className="card-button material-symbols-rounded"
                      onClick={(e) => {
                        e.stopPropagation();  // Prevent triggering parent link's click event
                        openModal(dev);  // Open the modal
                      }}
                    >
                      More
                    </button>
                  </a>
                </li>
              ))}
            </ul>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal"
          id="modal"
          style={{ display: 'flex' }}
          onClick={(e) => {
            // Close the modal if the background (outside of modal content) is clicked
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="modal-content">
            {/* Close button positioned at the top-right with larger size */}
            <span
              className="close"
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '36px',  // Increase size here
                cursor: 'pointer',
                color: '#000',  // Set close button color to black
                background: 'transparent',
              }}
            >
              &times;
            </span>
            <div className="video-container">
              <iframe
                id="modal-video"
                className="modal-video"
                src={modalData.ytLink.replace('watch?v=', 'embed/')} // Update with your video URL
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 id="modal-name">{modalData.name}</h2>
            <p id="modal-description">{modalData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
else{
  return (
    <div>
      <p>skibidi toilet will come soon</p>
    </div>
  )
}
};

export default CarouselParent;
