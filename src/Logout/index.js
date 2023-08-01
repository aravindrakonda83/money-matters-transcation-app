import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleLogout = () => {
    // Perform any logout logic or API calls here if needed
    onLogout();
    navigate("/");
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    navigate(-1); // Go back
  };

  const handleConfirmLogout = () => {
    setShowConfirmation(false);
    handleLogout();
  };

  if (showConfirmation) {
    confirmAlert({
      title: "Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: handleConfirmLogout,
        },
        {
          label: "No",
          onClick: handleCancel,
        },
      ],
    });
  }

  return null;
};

export default Logout;
