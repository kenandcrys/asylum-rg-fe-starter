# Build Sprint 2

To begin work on this ticket, make sure you have finished:

1. Getting locally setup.
2. Completed the `Onboarding Module` in your course.
3. Completed Build Sprint 1.

### Objective

Deliver the following:

- Integrate this frontend application with an API.
- Rework the `GraphWrapper.jsx` file and data visualizations to use an API instead of `test_data.json`.
- The graphs on the Graphs page should display after the integration.

### Relevant Files

You must inspect the code in `src/components/pages/DataVisualizations`, `src/data`, and `src/state` to ensure that the application is pulling data from an API and not the dummy data file. Specifically, focus on `GraphWrapper.jsx`.

### Guidance

Widely-used applications use robust APIs to get data. It is your job to integrate the provided API into this application and ensure everything works properly after integration.

> API LINK: https://hrf-asylum-be-b.herokuapp.com/cases

Endpoints:

- Fiscal Year Data: `/fiscalSummary`
- Citizenship Data: `/citizenshipSummary`

If you look at `src/data/text_data.json`, there are 2 JSON blobs, 1 for fiscal year data and the other for citizenship data. Make sure to use the correct data for each data viz.

> The graphs on the Graphs page should render correctly after a successful API integration.

You must:

1. Ensure everything is working properly after the API integration. Components should render correctly and show the data the same way they did before.

2. Do not use a Node version higher than 16.16.0. If you are, you can use `nvm` (for Mac) or `nvm-windows` to easily toggle your node versions in directories.

3. Make this project your own, but keep the integrity of the main files so that the app can render and work when you wish to present it.

## Deliverables

Submit the following in your course:

- Link to your forked repo with the fixed code for the graphs page
- Link to a Loom video answering the prompt in the `Submit Your Deliverables` assignment in your course
