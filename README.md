# JobSearch Web Application

This repository contains the **JobSearch** web application, which helps users find jobs, create a profile, and view detailed job listings. The app supports profile creation, stores data in **localStorage**, and offers a clean user interface built using **React**, **TailwindCSS**, and **Next.js**.

## Features

-   **Profile Creation**: Users can create and store their profile information (Name, Desired Job Title, and About Me) in **localStorage**.
-   **Job Search**: Users can search for jobs based on the desired job title, with the option to save the search query and show previously saved profile information.
-   **Responsive Design**: The application is designed to be mobile-responsive using **TailwindCSS** for styling.

### Pages

1.  **`index.tsx`**: This is the main page of the application where users can search for jobs. The input field is populated by the saved job title from **localStorage** if a profile exists.
2.  **`create-profile.tsx`**: A form to allow users to create their profile, consisting of fields for Name, Desired Job Title, and About Me. The profile data is saved to **localStorage**.

### Components

-   **SearchBar**: A reusable component for job title search. It uses an input field and handles state updates to query job data.
-   **ProfileForm**: Handles form inputs for creating a profile and storing them in **localStorage**.

### Styles

-   **TailwindCSS** is used for rapid styling and responsive design.
-   The form is designed to look clean and minimalistic, with inputs and buttons styled for a modern feel.

## Setup

### Prerequisites

Before running this project, make sure you have the following installed:

-   **Node.js** (v14.x or higher)
-   **npm** or **yarn**

### Install Dependencies

Run the following commands to install the project dependencies:

`npm install` or `yarn install` 

### Run the Application

To start the development server:

`npm run dev` or `yarn dev` 

The app will be available at `http://localhost:3000`.

### Build for Production

To build the application for production:

`npm run build` or `yarn build` 

### Linting and Formatting

This project uses **Prettier** for code formatting. You can run the following command to format the code:

`npm run format` or `yarn format` 

## LocalStorage

The app uses **localStorage** to save the user's profile (Name, Desired Job Title, and About Me). The saved data is used to pre-fill the profile creation form and set the job search query. If no profile is set, the user can input new data.

### Profile Structure: json

`{
  "name": "John Doe",
  "desiredJobTitle": "Frontend Developer",
  "aboutMe": "Passionate about building great user interfaces."
}` 

### Example Profile Display

When the profile is created and saved, the user will see a "View my profile" button that will be shown if the profile exists in **localStorage**.

## Known Issues

-   The application currently stores the profile data in **localStorage**, which is not persistent across different browsers or devices.
-   Profile data is not encrypted, so it should not be used for sensitive information.

## Contribution

If you'd like to contribute to the project, feel free to fork the repository, make changes, and open a pull request. Ensure your code is well-tested and formatted properly before submitting.
