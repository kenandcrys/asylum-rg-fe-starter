import React, { useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import AllOfficesRoute from './AllOfficesRoute';
import SingleOfficeRoute from './SingleOfficeRoute';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { colors } from '../../../styles/data_vis_colors';

const { Option } = Select;
const { background_color } = colors;

function GraphsContainer() {
  const [view, set_view] = useState('time-series');
  const history = useHistory();
  const offices = [
    'All Offices',
    'Los Angeles, CA',
    'San Francisco, CA',
    'New York, NY',
    'Houston, TX',
    'Chicago, IL',
    'Newark, NJ',
    'Arlington, VA',
    'Boston, MA',
    'Miami, FL',
    'New Orleans, LA',
  ];
  function handle_office_select(value) {
    if (view === 'office-heat-map') {
      set_view('time-series');
    }
    if (value === 'All') {
      history.push(
        `/graphs/all/${view === 'office-heat-map' ? 'time-series' : view}`
      );
    }
    history.push(
      `/graphs/${value}/${view === 'office-heat-map' ? 'time-series' : view}`
    );

    switch (value) {
      case 'All Offices':
        history.push(
          `/graphs/all/${view === 'office-heat-map' ? 'time-series' : view}`
        );
        break;
      case 'Los Angeles, CA':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'San Francisco, CA':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'New York, NY':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'Houston, TX':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'Chicago, IL':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'Newark, NJ':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'Arlington, VA':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'Boston, MA':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'Miami, FL':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      case 'New Orleans, LA':
        history.push(
          `/graphs/${value}/${
            view === 'office-heat-map' ? 'time-series' : view
          }`
        );
        break;
      default:
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: background_color,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            marginRight: '17.4%',
            height: '10vh',
            alignItems: 'center',
          }}
        >
          <Select
            style={{
              marginRight: '115px',
            }}
            placeholder="Select an Asylum Office"
            onSelect={value => handle_office_select(value)}
          >
            {offices.map((office, idx) =>
              office === 'All' ? (
                <Option key={idx} value={'all'}>
                  {office}
                </Option>
              ) : (
                <Option key={idx} value={office}>
                  {office}
                </Option>
              )
            )}
          </Select>
        </div>
        <Switch>
          <Route
            exact
            path="/graphs/"
            component={() => AllOfficesRoute({ set_view })}
          />
          <Route
            path="/graphs/all/:view"
            component={() => AllOfficesRoute({ set_view })}
          />
          <Route
            path="/graphs/:office/:view"
            component={() => SingleOfficeRoute({ set_view })}
          />
        </Switch>
      </div>
    </div>
  );
}

export default GraphsContainer;
