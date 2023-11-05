# PDF FORGE

PDF Forge is a web application that enables users to extract and manipulate PDF files seamlessly.

# Table of Contents

- [PDF Forge](#pdf-forge)
  - [Features](#features)
  - [How to Use](#how-to-use)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Development](#development)  
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Upload PDFs:**

  - Easily upload PDF files for processing.

- **Page Preview:**

  - Visualize each page through an intuitive interface.

- **Selective Extraction:**

  - Choose specific pages for extraction using checkboxes.

- **Page Inspection:**

  - View detailed, full-page content through a modal interface.

- **Individual Page Downloads:**

  - Download individual pages as high-quality PNG images.

- **Effortless Extraction:**

  - Seamlessly extract selected pages by triggering the "Extract" button.

- **PDF Generation:**

  - Process chosen pages, creating a new PDF file with precision.

- **Seamless PDF Viewing:**
  - Redirect users to a sophisticated PDF viewer for comprehensive viewing.

## How to Use

1. **Upload PDF:**

   - Access the application and drag or drop the PDF FILE.

2. **Navigate Page Preview:**

   - Scroll through the page previews to inspect each page visually.

3. **Selective Extraction:**

   - Utilize the checkboxes to select specific pages for extraction.

4. **Detailed Page View:**

   - Click on a page to open a modal interface for a detailed, full-page view.

5. **Download Pages:**

   - Download individual pages seamlessly as high-quality PNG images.

6. **Initiate Extraction:**

   - Confirm your selection and trigger the extraction process with the "Extract" button.

7. **Explore PDF Viewer:**
   - Seamlessly redirect to a sophisticated PDF viewer for comprehensive viewing and downloading.
8. **PDF Generation:**
   - Witness the creation of a new, precisely extracted PDF file.

## Installation

1.Clone the repository and install dependencies.

    git clone https://github.com/yourusername/pdf-forge.git

2.Navigate to the project directory.
    
    cd pdf-forge
    npm install

3.Install the dependencies using your preferred package manager in both the server and client directorie
    
    cd api &&  npm install
    cd client && npm install
4.Set up the required environment variables by renaming the .env.example file to .env and providing the necessary values for your environment.

## Usage

   ### Developement

   1. Start the development server
        
           cd api  && npm start
  
   2.Access the server at http://localhost:3000.

   (Repeat the same process for access the UI , instead  cd api && npm start use cd clien && npm run dev.
   Access dev server at http://localhost:5173)
