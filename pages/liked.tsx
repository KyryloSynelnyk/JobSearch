import { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaArrowLeft  } from "react-icons/fa";
import { useRouter } from "next/router";

const LikedPage = () => {
  const [likedJobs, setLikedJobs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedLikedJobs = localStorage.getItem("likedJobs");
    if (storedLikedJobs) {
      setLikedJobs(JSON.parse(storedLikedJobs));
    }
  }, []);
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBackClick}
          className="back-button mb-6 px-4 py-2 rounded-md text-white font-semibold bg-gray-500 hover:bg-gray-700 focus:outline-none"
        >
          <FaArrowLeft className="mr-2" style={{ width: '15px', height: '12px' }} />
          <span className="back-text">&nbsp;Back</span>
        </button>
        <h1 className="text-3xl font-semibold text-center">Liked Jobs</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedJobs.length === 0 ? (
          <div>No liked jobs yet.</div>
        ) : (
          likedJobs.map((job: any) => (
            <div key={job.job_id} className="job-card relative p-4 border rounded-lg shadow-md">
              <div className="job-header flex items-center justify-between mb-4">
                {job.employer_logo && (
                  <img
                    src={job.employer_logo}
                    alt={job.employer_name}
                    className="h-12 w-12 object-contain mr-4"
                  />
                )}
                <p className="job-employer text-sm text-gray-500 flex-grow text-right">
                  {job.employer_name || "Employer not provided"}
                </p>
              </div>
              <div className="job-header flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{job.job_title}</h2>
              </div>
              <p className="job-description">{job.job_description || "No description available"}</p>
              <p className="job-posted text-gray-500 mb-4">
                <strong>Posted:</strong> {job.job_posted_human_readable || "Date not provided"}
              </p>
              <div className="job-buttons flex justify-between mt-4">
                <button
                  onClick={() => window.open(job.job_apply_link, "_blank")}
                  className="apply-button px-4 py-2 rounded-md text-white font-semibold w-32"
                >
                  Apply Here
                </button>
                <button
                  onClick={() => window.open(job.employer_website, "_blank")}
                  className="website-button px-4 py-2 rounded-md text-white font-semibold w-32"
                >
                  Visit Website
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LikedPage;
