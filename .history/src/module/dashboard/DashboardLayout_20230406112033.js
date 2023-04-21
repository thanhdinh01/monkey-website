import React from "react";
import { Button } from "../../components/button";

const DashboardLayout = () => {
  return (
    <div>
      <div className="dashboard-header">
        <Button type="button" height="100%" width="200px" kind="primary" to="/">
          Write new post
        </Button>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-sidebar"></div>
        <div className="dashboard-children"></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
