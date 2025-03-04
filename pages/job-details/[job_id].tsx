import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface JobDetailsProps {
  jobDetails: any;
}

const JobDetails = ({ jobDetails }: JobDetailsProps) => {
  const router = useRouter();
  const [jobData, setJobData] = useState<any>(jobDetails);

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    // Save jobDetails to localStorage if API fails
    if (!jobData) {
      const savedJobDetails = localStorage.getItem("savedJobDetails");
      if (savedJobDetails) {
        setJobData(JSON.parse(savedJobDetails));
      }
    } else {
      // If jobDetails is available, save it in localStorage
      localStorage.setItem("savedJobDetails", JSON.stringify(jobData));
    }
  }, [jobData]);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBackClick}
        className="back-button mb-6 px-4 py-2 rounded-md text-white font-semibold bg-gray-500 hover:bg-gray-700 focus:outline-none"
      >
        <FaArrowLeft className="mr-2" style={{ width: '15px', height: '12px' }} />
        <span className="back-text">&nbsp;Back</span>
      </button>
      {jobData.data[0] ? (
        <div className="job-card relative p-4 border rounded-lg shadow-md margin-top">
          <h1 className="text-3xl font-semibold mb-6">{jobData.data[0].job_title}</h1>
          <div className="job-header flex items-center justify-between mb-4">
            {jobData.data[0].employer_logo && (
              <img
                src={jobData.data[0].employer_logo}
                alt={jobData.data[0].employer_name}
                className="h-12 w-12 object-contain mr-4"
              />
            )}
            <p className="job-employer text-sm text-gray-500 flex-grow text-right">
              {jobData.data[0].employer_name || "Employer not provided"}
            </p>
          </div>
          <p className="job-description mb-4">{jobData.data[0].job_description}</p>
          <p className="job-location mb-4">
            <strong>Location:</strong> {jobData.data[0].job_location}
          </p>
          <p className="job-posted text-gray-500 mb-4">
            <strong>Posted:</strong> {jobData.data[0].job_posted_human_readable}
          </p>
          <div className="job-buttons flex justify-between mt-4">
            <button
              onClick={() => window.open(jobData.data[0].job_apply_link, "_blank")}
              className="apply-button px-4 py-2 rounded-md text-white font-semibold w-32"
            >
              Apply Here
            </button>
            <button
              onClick={() => window.open(jobData.data[0].employer_website, "_blank")}
              className={`website-button px-4 py-2 rounded-md text-white font-semibold w-32 ${!jobData.data[0].employer_website ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
              disabled={!jobData.data[0].employer_website}
            >
              Visit Website
            </button>
          </div>
        </div>
      ) : (
        <div>Loading job details...</div>
      )}
    </div>
  );
};

export async function getServerSideProps({ params }: any) {
  const { job_id } = params;
  try {
    const res = await fetch(
      `https://jsearch.p.rapidapi.com/job-details?job_id=${job_id}&country=us`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
          "x-rapidapi-key": "b77d06debemsh2a21616cbc14910p17df4ajsn4720deaf04ef",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch job details");
    }

    const data = await res.json();
    return {
      props: {
        jobDetails: data || null,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        jobDetails: null,
      },
    };
  }
}

export default JobDetails;
