import { useState, useEffect } from "react";
import { FaStar, FaRegStar,FaUser  } from "react-icons/fa";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const Home = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [likedJobs, setLikedJobs] = useState<Map<string, any>>(new Map());
  const [clickedJobs, setClickedJobs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(searchQuery);
  const router = useRouter();
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
          params: {
            query: debouncedSearchQuery || "Front-end",
            page: 1,
            num_pages: 1,
            country: "us",
            date_posted: "all",
          },
          headers: {
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
            "x-rapidapi-key": "b77d06debemsh2a21616cbc14910p17df4ajsn4720deaf04ef",
          },
        });

        const data = response.data.data;

        if (data && Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [debouncedSearchQuery]);

  const toggleLike = (jobId: string, jobData: any) => {
    const updatedLikes = new Map(likedJobs);
    if (updatedLikes.has(jobId)) {
      updatedLikes.delete(jobId);
    } else {
      updatedLikes.set(jobId, jobData);
    }
    setLikedJobs(updatedLikes);
    localStorage.setItem("likedJobs", JSON.stringify(Array.from(updatedLikes.values())));
  };

  const handleViewDetails = (jobId: string) => {
    setLoading(true);
    const updatedClickedJobs = new Set(clickedJobs);
    updatedClickedJobs.add(jobId);
    setClickedJobs(updatedClickedJobs);
    localStorage.setItem("clickedJobs", JSON.stringify(Array.from(updatedClickedJobs)));
    router.push(`/job-details/${jobId}`);
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    setProfileExists(!!storedProfile);
  }, []);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedJobs");
    if (storedLikes) {
      const storedData = new Map(
        JSON.parse(storedLikes).map((job: any) => [job.job_id, job])
      );
      setLikedJobs(storedData);
    }

    const storedClickedJobs = localStorage.getItem("clickedJobs");
    if (storedClickedJobs) {
      const storedClicked = new Set(JSON.parse(storedClickedJobs));
      setClickedJobs(storedClicked);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="preloader mr-4"></div>
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Job Listings</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for jobs"
            className="border border-gray-300 rounded-lg py-2 px-4 text-lg  search-input"
          />
          <Link href="/liked">
            <button className="px-6 py-3 rounded-md text-white font-semibold bg-blue-500 hover:bg-blue-700 focus:outline-none nav-button flex items-center">
              View Liked Jobs &nbsp;
              <FaStar className="mr-2 text-yellow-400" />
            </button>
          </Link>

          <Link href="/create-profile">
            <button className="px-6 py-3 rounded-md text-white font-semibold bg-green-500 hover:bg-green-700 focus:outline-none nav-button flex items-center ml-4">
              {profileExists ? "View My Profile" : "Create Profile"} &nbsp;
              <FaUser className="mr-2 text-white" />
            </button>
          </Link>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job: any) => (
          <div key={job.job_id} className="job-card relative p-4 border rounded-lg shadow-md">
            <button
              onClick={() => toggleLike(job.job_id, job)}
              className="absolute top-2 right-2 text-3xl"
              aria-label={likedJobs.has(job.job_id) ? "Unlike" : "Like"}
            >
              {likedJobs.has(job.job_id) ? (
                <FaStar color="gold" />
              ) : (
                <FaRegStar color="gray" />
              )}
            </button>
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
                className={`website-button px-4 py-2 rounded-md text-white font-semibold w-32 ${!job.employer_website ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
                disabled={!job.employer_website}
              >
                Visit Website
              </button>
              <button
                onClick={() => handleViewDetails(job.job_id)}
                className="view-button px-4 py-2 rounded-md text-white font-semibold w-32"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
