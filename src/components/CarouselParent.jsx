import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../controller/controller.jsx';  // Assuming fetchProjects is your method to fetch data
import Swiper from "swiper/bundle";
import "swiper/css/bundle";  // Include the swiper styles
import '../styles/Carousel.css';

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
        setProjects(fetchedProjects);  // Update state with fetched projects
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
                    data-title={dev.title}
                    data-description={dev.description}
                    // No modal opening here, will open only when "More" button is clicked
                  >
                    <img src={dev.image} alt="Card Image" className="card-image" />
                    <p className="badge">{dev.name}</p>
                    <h2 className="card-title">{dev.title}</h2>
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
            <p id="modal-title">{modalData.title}</p>
            <p id="modal-description">{modalData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselParent;
