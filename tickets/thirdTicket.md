# Build Sprint 3

To begin work on this ticket, make sure you have finished:

1. Getting locally setup.
2. Completed the `Onboarding Module` in your course.
3. Completed Build Sprint 1 and 2.

### Objective

Deliver the following:

- Integrate the Auth0 microservice into the project.
- Establish a `Profile Page` that only appears on the navigation menu if a user is logged in.
- The `Profile Page` should display some basic info on the logged in user.
- There should be a Login/Logout button in the navigation menu that redirects you to Auth0 to login.

### Relevant Guides

The following guide from Auth0 will show you how to proceed from start to finish: `https://auth0.com/blog/complete-guide-to-react-user-authentication/`.

### Guidance

Many companies use third-party microservices to establish auth in their application. Your job is establish authentication for this application using the popular auth service: Auth0. You can create a free account with Auth0 for this task. After ensuring the login/logout flow works, you will create a profile page that displays user info using the `useAuth0()` hook and dynamically displays based on the logged in user.

You must:

1. Ensure everything is working properly after the Auth0 integration. Components should render correctly and show the data the same way they did before.

2. Do not use a Node version higher than 16.16.0. If you are, you can use `nvm` (for Mac) or `nvm-windows` to easily toggle your node versions in directories.

3. Make this project your own, but keep the integrity of the main files so that the app can render and work when you wish to present it.

## Deliverables

Submit the following in your course:

- Link to your forked repo with the code for the new profile page and auth integration
- Link to a Loom video answering the prompt in the `Submit Your Deliverables` assignment in your course
