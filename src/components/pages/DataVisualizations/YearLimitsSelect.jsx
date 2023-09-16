import React, { useEffect } from 'react';
import { Form, Button /*Input*/ } from 'antd';
import {
  setVisualizationData,
  // setHeatMapYears,
} from '../../../state/actionCreators';
// import YearLimitsSlider from './YearLimitsSlider';
import { rawApiDataToPlotlyReadyInfo, useInterval } from '../../../utils';

import { connect } from 'react-redux';
import { colors } from '../../../styles/data_vis_colors';

const { primary_accent_color } = colors;

const mapStateToProps = (state, ownProps) => {
  const { view, office } = ownProps;
  if (office === 'all' || !office) {
    switch (view) {
      case 'time-series':
        return {
          years: state.vizReducer.timeSeriesAllYears,
        };
      case 'office-heat-map':
        return {
          years: state.vizReducer.officeHeatMapYears,
        };
      case 'citizenship':
        return {
          years: state.vizReducer.citizenshipMapAllYears,
        };
      default:
        return {
          years: ['', ''],
        };
    }
  } else {
    switch (view) {
      case 'time-series':
        return {
          years: state.vizReducer.offices[office].timeSeriesYears,
        };
      case 'citizenship':
        return {
          years: state.vizReducer.offices[office].citizenshipMapYears,
        };
      default:
        return {
          years: ['', ''],
        };
    }
  }
};

function YearLimitsSelect(props) {
  let { view, office, dispatch, clearQuery, updateStateWithNewData, years } =
    props;
  // const yearInputsOnChange = (view, office, e) => {
  //   dispatch(
  //     setHeatMapYears(
  //       view,
  //       office,
  //       e.target.id.includes('year_start') ? 0 : 1,
  //       e.target.value
  //     ));
  // };
  const stateSettingFn = (view, office, data) => {
    const plotlyReadyData = rawApiDataToPlotlyReadyInfo(view, office, data);
    dispatch(setVisualizationData(view, office, plotlyReadyData));
  };
  const [form] = Form.useForm();
  useInterval(() => {
    form.setFieldsValue({
      year_start: years[0],
      year_end: years[1],
    });
  }, 10);

  useEffect(() => {
    updateStateWithNewData(years, view, office, stateSettingFn);
  });

  return (
    <div
      className="year-limits-select-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50px',
      }}
    >
      {/* <YearLimitsSlider
        office={office}
        view={view}
        lowerLimit={2015}
        upperLimit={2022}
        step={1}
      /> */}
      <Form
        form={form}
        name="yearLimitsSelect"
        initialValues={{ year_start: years[0], year_end: years[1] }}
        onFinish={() => {
          updateStateWithNewData(years, view, office, stateSettingFn);
        }}
        autoComplete="off"
        layout="inline"
        wrapperCol={{ span: 45 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
        }}
      >
        {/* <Form.Item
          label="From:"
          name="year_start"
          rules={[
            { required: true },
            // {
            //   validator: (_, value) => {
            //     return value &&
            //       parseInt(value) === value &&
            //       value >= 2015 &&
            //       value <= 2022
            //       ? Promise.resolve()
            //       : Promise.reject(
            //           'Please enter a year between 2015 and 2022.'
            //         );
            //   },
            // },
          ]}
          onChange={e => yearInputsOnChange(view, office, e)}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="To:"
          name="year_end"
          style={{ marginLeft: '17px' }}
          rules={[
            { required: true },
            // {
            //   validator: (_, value) => {
            //     return value &&
            //       parseInt(value) === value &&
            //       value >= 2015 &&
            //       value <= 2022 &&
            //       value > form.getFieldValue('year_start')
            //       ? Promise.resolve()
            //       : Promise.reject(
            //           "Please enter a year between 2015 and 2022, and after the 'From:' year."
            //         );
            //   },
            // },
          ]}
          onChange={e => yearInputsOnChange(view, office, e)}
        >
          <Input />
        </Form.Item> */}
        <Form.Item>
          <Button
            htmlType="submit"
            data-testid="filter"
            style={{
              backgroundColor: primary_accent_color,
              color: 'white',
              marginLeft: '105px',
              marginTop: '10px',
            }}
          >
            Update Query
          </Button>
        </Form.Item>
      </Form>
      <Button
        style={{
          width: '122px', // this is to match the width of the Form.Item button
          backgroundColor: primary_accent_color,
          color: 'white',
          marginLeft: '105px',
        }}
        onClick={() => {
          clearQuery(view, office);
        }}
      >
        Clear Query
      </Button>
    </div>
  );
}

export default connect(mapStateToProps)(YearLimitsSelect);