import React, { useEffect } from "react";
import "../styles/Winner.css"; // Add any styles needed

const Winner = ({ projects }) => {
  // Ensure there are enough projects to display
  const champion = projects[0]; // Assuming the first project is the Champion
  const firstRunnerUp = projects[1]; // Second project is the first runner-up
  const secondRunnerUp = projects[2]; // Third project is the second runner-up

  // Helper function to open the modal
  const openModal = (project) => {
    if (project) {
      document.getElementById("modal2-name").textContent = project.title;
      document.getElementById("modal2-description").textContent =
        project.description;
      console.log(project.ytLink);
      document.getElementById("modal2-video").src = project.ytLink.replace(
        "watch?v=",
        "embed/",
      );

      document.getElementById("modal2").style.display = "flex";
      document.getElementById("overlay").style.display = "block";
    }
  };

  // Helper function to close the modal
  const closeModal = () => {
    const modal2 = document.getElementById("modal2");
    const modalVideo = document.getElementById("modal2-video");

    modal2.style.display = "none"; // Hide modal2
    modalVideo.src = ""; // Clear the iframe src to stop playback
    document.getElementById("overlay").style.display = "none"; // Hide overlay
  };

  useEffect(() => {
    // Add event listener to close the modal when the close button is clicked
    document.getElementById("close2").addEventListener("click", closeModal);

    // Add event listener to close the modal if clicked outside the modal content
    const handleOutsideClick = (event) => {
      const modal2 = document.getElementById("modal2");
      const modalVideo = document.getElementById("modal2-video");

      if (event.target === modal2) {
        closeModal();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    // Clean up the event listeners on component unmount
    return () => {
      document
        .getElementById("close2")
        .removeEventListener("click", closeModal);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      {/* Winner Section - Champion */}
      <section className="winner">
        <div className="winner-label">Champion</div>
        <div className="winner-content">
          <div className="winner-image">
            <div className="image-overlay"></div>
            <img
              src={champion.imageBase64 || "anonymous.jpg"}
              alt="Champion Image"
            />
            <div className="medal-icon gold">🥇</div>
          </div>
          <div className="winner-description">
            <h2>{champion.title}</h2>
            <p>{champion.description}</p>
            <button className="card-button" onClick={() => openModal(champion)}>
              More
            </button>
          </div>
        </div>
      </section>

      {/* Runner-up Sections - Side by Side */}
      <div className="runner-up-places">
        <div className="runner-up-column">
          {firstRunnerUp && (
            <section className="runner-up">
              <div className="runner-up-label">1st Runner-Up</div>
              <div className="runner-up-content">
                <div className="runner-up-image">
                  <div className="image-overlay"></div>
                  <img
                    src={firstRunnerUp.imageBase64 || "anonymous.jpg"}
                    alt="First Runner-up Image"
                  />
                  <div className="medal-icon silver">🥈</div>
                </div>
                <div className="runner-up-description">
                  <h2>{firstRunnerUp.title}</h2>
                  <p>{firstRunnerUp.description}</p>
                  <button
                    className="card-button"
                    onClick={() => openModal(firstRunnerUp)}
                  >
                    More
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="runner-up-column">
          {secondRunnerUp && (
            <section className="runner-up">
              <div className="runner-up-label">2nd Runner-Up</div>
              <div className="runner-up-content">
                <div className="runner-up-image">
                  <div className="image-overlay"></div>
                  <img
                    src={secondRunnerUp.imageBase64 || "anonymous.jpg"}
                    alt="Second Runner-up Image"
                  />
                  <div className="medal-icon bronze">🥉</div>
                </div>
                <div className="runner-up-description">
                  <h2>{secondRunnerUp.title}</h2>
                  <p>{secondRunnerUp.description}</p>
                  <button
                    className="card-button material-symbols-rounded"
                    onClick={() => openModal(secondRunnerUp)}
                  >
                    More
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Modal */}
      <div className="modal2" id="modal2" style={{ display: "none" }}>
        <div className="modal2-content">
          <span className="close2" id="close2">
            &times;
          </span>

          {/* Video placed at the top */}
          <div className="video-container">
            <iframe
              id="modal2-video"
              className="modal2-video"
              src=""
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Project details */}
          <h2 id="modal2-name"></h2>
          <p id="modal2-title"></p>
          <p id="modal2-description"></p>
        </div>
      </div>

      {/* Overlay */}
      <div id="overlay" className="overlay"></div>
    </div>
  );
};

export default Winner;
