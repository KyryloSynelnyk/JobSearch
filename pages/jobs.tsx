import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Jobs = () => {
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || 'null');
    setProfile(userProfile);


    if (userProfile) {
      setJobs([/* Simulated job data based on the profile */]);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Job Recommendations</h1>
      {profile ? (
        <div className="mt-4">
          <h3 className="text-xl">Recommended Jobs for {profile.name}</h3>
          {jobs.length === 0 ? (
            <p>No jobs available based on your profile.</p>
          ) : (
            {(jobs ?? []).map((job: any) => (
              <div key={job.job_id} className="p-4 border border-gray-300 rounded-lg">
                <h3 className="text-xl font-semibold">{job.job_title}</h3>
                <p>{job.employer_name}</p>
                <p>{job.job_description.slice(0, 150)}...</p>
                <button
                  onClick={() => router.push(`/job-details/${job.job_id}`)}
                  className="mt-2 text-blue-500"
                >
                  Details
                </button>
              </div>
            ))}
          )}
        </div>
      ) : (
        <p>No profile found, create one <a href="/create-profile">here</a></p>
      )}
    </div>
  );
};

export default Jobs;
