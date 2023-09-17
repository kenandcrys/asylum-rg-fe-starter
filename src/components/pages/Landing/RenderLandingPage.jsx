import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from '../Auth0/Login_Button';
import LogoutButton from '../Auth0/Logout_Button';
import React from 'react';
// ADD IMPORTS BACK FOR GRAPHS SECTION
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// for the purposes of testing PageNav
//di import PageNav from '../../common/PageNav';


const handleDownload = () => {
  // Define the URL to fetch data from
  const apiUrl = "https://hrf-asylum-be-b.herokuapp.com/cases";

  axios.get(apiUrl)
    .then((response) => {
      // Check if the response status is OK (status code 200)
      if (response.status === 200) {
        // Get the data from the response
        const data = response.data;

        // Converted the data to a JSON string
        const plainTextData = JSON.stringify(data, null, 2);

        // Create a Blob (Binary Large Object) from the JSON data
        const blob = new Blob([plainTextData], { type: "text/plain" });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element for the download link
        const downloadLink = document.createElement("a");

        // Set the href attribute to the Blob's URL
        downloadLink.href = url;

        // Set the download attribute to specify the filename
        downloadLink.download = "asylum_data.txt";

        // Simulate a click on the anchor element to trigger the download
        downloadLink.click();

        // Clean up by revoking the URL
        URL.revokeObjectURL(url);
      } else {
      
        console.error(`Error: Received status code ${response.status}`);
      }
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching data:", error);
    });
};


document.addEventListener("DOMContentLoaded", function() {
  // Add a "click" event listener to the document body
  document.body.addEventListener("click", function(event) {
    // Check if the clicked element has the class "systemBtn"
    if (event.target.classList.contains("systemBtn")) {
      // Navigate to the specified URL when the button is clicked
      window.location.href = "https://humanrightsfirst.org/about-us/";
    }
  });
});



function RenderLandingPage(props) {
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const history = useHistory();

  const style = { backgroundColor: '#404C4A', color: '#FFFFFF' };

  return (
    
    <div className="main">
    
      <div className="header">
        <div className="header-text-container">
            <LoginButton /> 
            <LogoutButton />
        <h1>Asylum Office Grant Rate Tracker</h1>
        <h3>
          The Asylum Office Grant Rate Tracker provides asylum seekers,
          researchers, policymakers, and the public an interactive tool to
          explore USCIS data on Asylum Office decisions
        </h3>
      </div>
    </div>

      {/* Graphs Section: Add code here for the graphs section for your first ticket */}

      <div className="graphs-section">
        <div className="row">
          <div className="col-md-3 img-1">
            <a href="http://localhost:3000/graphs/all/office-heat-map">
              <img src={GrantRatesByOfficeImg} alt="graph-by-office" />
            </a>
            <p>Grant Rates By Office</p>
          </div>

          <div className="col-md-3 img-2">
            <a href='http://localhost:3000/graphs/all/citizenship'>
            <img src={GrantRatesByNationalityImg} alt="graph-by-nationality" /></a>
            <p>Grant Rates By Nationality</p>
          </div>

          <div className="col-md-3 img-3">
            <a href='http://localhost:3000/graphs/all/time-series'>
            <img src={GrantRatesOverTimeImg} alt="graph-over-time" /></a>
            <p>Grant Rates Over Time</p>
          </div>
        </div>
      </div>

      {/*  View More and Download Buttons */}

      <div className="view-more-data-btn-container">
        <Button
          className="BtnViewMoreData"
          type="default"
          style={style}
          onClick={() => history.push('/graphs')}
        >
          View the Data
        </Button>

        <Button
          id='download-button'
          className="BtnDownloadData"
          type="default"
          style={style}
          onClick={handleDownload}
        >
          Download the Data
        </Button>
      </div>

      <div className="middle-section">
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set
          </h3>
        </div>
      </div>
     
        {/* <div className="bottom-section">*/} 
      <div>
        <div className="bottom-section-container">
          <h1 className="system-text">Systemic Disparity Insights</h1>

          <div className="system-text-container">
            <div>
              <h2>36%</h2>
              <p className="text">
                By the end of the Trump administration, the average
                <br />
                asylum office grant rate had fallen 36 percent from an
                <br />
                average of 44 percent in fiscal year 2016 to 28 percent
                <br /> in fiscal year 2020.
              </p>
            </div>

            <div>
              <h2>5%</h2>
              <p className="text">
                The New Yor asylum office grant rate dropped to 5<br />
                percent in fiscal year 2020.
              </p>
            </div>

            <div>
              <h2>6x Lower</h2>
              <p className="text">
                Between fiscal year 2017 and 2020, the New York
                <br />
                asylum office's average grant was six times lower
                <br />
                than the San Francisco asylum office.
              </p>
            </div>
          </div>
          <div>
            <button
              className="systemBtn"
              type="default"
              style={style}
            >
              Read More
            </button>
          </div>
        </div>

        <p onClick={() => scrollToTop()} className="back-to-top">
          Back To Top ^
        </p>
      </div>
    </div>
  );
}
export default RenderLandingPage;
