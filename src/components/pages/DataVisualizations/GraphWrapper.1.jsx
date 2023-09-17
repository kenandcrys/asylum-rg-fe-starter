import React from 'react';
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
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

export function GraphWrapper(props) {
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

  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    const URL = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    const loadingContainer = document.getElementById('loading-container');

    if (office === 'all' || !office) {
      // Show the loading indicator
      loadingContainer.style.display = 'block';

      try {
        const [callA, callB] = await Promise.all([
          axios.get(`${URL}/fiscalSummary`, {
            params: {
              from: years[0],
              to: years[1],
            },
          }),
          axios.get(`${URL}/citizenshipSummary`, {
            params: {
              from: years[0],
              to: years[1],
              office: office,
            },
          }),
        ]);

        const yearResults = callA.data.yearResults;
        const citizenshipResults = callB.data;
        const combinedData = [{ yearResults, citizenshipResults }];

        // Calling the "stateSettingCallback" function with the specified parameters.
        stateSettingCallback(view, office, [combinedData][0]);
      } catch (err) {
        console.error(err);
      } finally {
        // Hide the loading indicator after the Axios calls complete (whether successful or with an error).
        loadingContainer.style.display = 'none';
      }
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
      <div
        id="loading-container"
        style={{
          display: 'none',
        }}
      >
        <h1 />
      </div>
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
