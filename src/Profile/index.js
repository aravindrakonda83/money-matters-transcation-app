import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; // Import the CSS for the profile page

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const apiEndpoint =
          "https://bursting-gelding-24.hasura.app/api/rest/profile";

        const response = await axios.get(apiEndpoint);
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profileData) {
    return <p>Failed to fetch profile data.</p>;
  }

  return (
    <div className="profile">
      <div className="profile-icon">
        <img src={profileData.profileIcon} alt="Profile Icon" />
      </div>
      <div className="profile-details">
        <p>Name: {profileData.name}</p>
        <p>Username: {profileData.username}</p>
        <p>Email: {profileData.email}</p>
        <p>Date Of Birth: {profileData.dateOfBirth}</p>
      </div>
    </div>
  );
};

export default Profile;
