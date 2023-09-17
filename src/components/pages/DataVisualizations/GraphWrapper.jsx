import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
// import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  
// This is a function that fetches and processes data from an API.
async function updateStateWithNewData(years, view, office, stateSettingCallback) {
  try {
    // Set the API URL we want to call.
    const URL = "https://hrf-asylum-be-b.herokuapp.com/cases";
    
    // Check if the 'office' parameter is 'all' or empty.
    if (office === 'all' || !office) {
      // Use async/await to make two API calls simultaneously and wait for their results.
      const [callA, callB] = await Promise.all([
        // Make the first API call to get fiscal summary data.
        axios.get(`${URL}/fiscalSummary`, {
          params: {
            from: years[0], // Start year
            to: years[1],   // End year
          },
        }),
        // Make the second API call to get citizenship summary data.
        axios.get(`${URL}/citizenshipSummary`, {
          params: {
            from: years[0], // Start year
            to: years[1],   // End year
            office: office, // Office filter
          },
        }),
      ]);

      // Extract data from the API responses.
      const yearResults = callA.data.yearResults;
      const citizenshipResults = callB.data;

      // Combine the data into an array.
      const combinedData = [{ yearResults, citizenshipResults }];

      // Call the provided callback function with the data.
      stateSettingCallback(view, office, combinedData[0]);
    }
  } catch (err) {
    // Handle any errors that occur during the API calls.
    console.error(err);
  }
}

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
