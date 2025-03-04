import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

const CreateProfile = () => {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const [desiredJobTitle, setDesiredJobTitle] = useState<string>("");
  const [aboutMe, setAboutMe] = useState<string>("");

  // Fetch existing profile data from localStorage (if available)
  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");

    if (storedProfile) {
      const { name, desiredJobTitle, aboutMe } = JSON.parse(storedProfile);
      setName(name || "");
      setDesiredJobTitle(desiredJobTitle || "");
      setAboutMe(aboutMe || "");
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !desiredJobTitle.trim() || !aboutMe.trim()) {
      alert("Please fill all fields below");
      return;
    }

    const profile = {
      name,
      desiredJobTitle,
      aboutMe,
    };

    // Save profile data to localStorage
    localStorage.setItem("profile", JSON.stringify(profile));

    alert("Profile was successfully saved!");
  };


  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBackClick}
        className="back-button mb-6 px-4 py-2 rounded-md text-white font-semibold bg-gray-500 hover:bg-gray-700 focus:outline-none"
      >
        <FaArrowLeft className="mr-2" style={{ width: '15px', height: '12px' }} />
        <span className="back-text">&nbsp;Back</span>
      </button>
      <div className="max-w-md mx-auto p-6 form-element margin-top">
      <h1 className="text-2xl font-bold mb-6">Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4 margin-top">
          <label className="block text-sm font-semibold mb-2" htmlFor="desiredJobTitle">
            Desired Job Title
          </label>
          <input
            type="text"
            id="desiredJobTitle"
            value={desiredJobTitle}
            onChange={(e) => setDesiredJobTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter desired job title"
          />
        </div>

        <div className="mb-6 margin-top">
          <label className="block text-sm font-semibold mb-2 aboutMe margin-top" htmlFor="aboutMe">
            About Me
          </label>
          <textarea
            id="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Write a little about yourself"
            rows={4}
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Save Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateProfile;
