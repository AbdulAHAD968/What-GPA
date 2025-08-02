# What GPA? - FAST NUCES GPA Calculator

![What GPA? Home](/github-readme-assets/home-1.png)

---

## Overview

**What GPA?** is a web-based application designed specifically for students of FAST National University of Computer and Emerging Sciences (NUCES) to calculate their semester GPA with precision. This tool supports students across all FAST campuses and departments, providing an intuitive and accurate way to track grades and compute GPAs.

![What GPA? Home-2](/github-readme-assets/home-2.png)

The application is built using modern web technologies, including **React**, **Vite**, and **Tailwind CSS**, ensuring a fast, responsive, and user-friendly experience. It is hosted on Vercel and accessible at [what-gpa.vercel.app](https://what-gpa.vercel.app/).

---

## Features

- [x] **Accurate GPA Calculation**: Computes semester GPA tailored to FAST NUCES grading policies.
- [x] **User-Friendly Interface**: Simple and intuitive design for easy grade input and result viewing.
- [x] **Responsive Design**: Optimized for both desktop and mobile devices.
- [x] **SEO Optimized**: Includes meta tags, Open Graph, and Twitter Card data for better visibility and sharing.
- [x] **No-Cost Access**: Completely free to use for all FAST students.
- [x] **Offline Support**: Displays a "No Connection" page when offline.
- [x] **Customizable**: Modular React components for easy updates and maintenance.

---
![What GPA? Logo](/github-readme-assets/working.png)
---

## Tech Stack

- [x] **Frontend**: React, JSX, Tailwind CSS
- [x] **Build Tool**: Vite
- [x] **Linting**: ESLint
- [x] **Hosting**: Vercel
- [x] **Icons**: [Flaticon](https://www.flaticon.com/free-icons/university) (University icons by Freepik)
- [x] **Images**: [Storyset](https://storyset.com/technology)

---

## Directory Structure

```
abdulahad968-what-gpa/
├── README.md                # Project documentation
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML entry point
├── LICENSE                  # Project license
├── package.json             # Project dependencies and scripts
├── vite.config.js           # Vite configuration
└── src/
    ├── App.css              # Global styles
    ├── App.jsx              # Main React component
    ├── main.jsx             # React entry point
    ├── components/          # Reusable React components
    │   ├── CourseInput.jsx
    │   ├── GradeTable.jsx
    │   ├── Header.jsx
    │   ├── ResultDisplay.jsx
    ├── pages/               # Page components
    │   ├── Calculator.jsx
    │   ├── Home.jsx
    │   ├── NoConnection.jsx
    │   ├── NotFound.jsx
    │   ├── Result.jsx
    │   ├── working.jsx
    └── styles/              # Component-specific CSS
        ├── calculator.css
        ├── gradeTable.css
        ├── header.css
        ├── home.css
        ├── noconnection.css
        ├── notfound.css
        ├── result.css
        ├── working.css
```

---

## Installation and Setup

To run the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AbdulAHAD968/What-GPA.git
   cd abdulahad968-what-gpa
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173` to view the application.

---

## Usage

1. Visit [what-gpa.vercel.app](https://what-gpa.vercel.app/).
2. Navigate to the **Calculator** page.
3. Enter your course details and grades using the **CourseInput** component.
4. View your calculated GPA in the **ResultDisplay** component.
5. Use the **GradeTable** to review your entered grades.

---
![What GPA? Logo](/github-readme-assets/calculation.png)
---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

Please ensure your code follows the ESLint rules defined in `eslint.config.js`.

---
![What GPA? Logo](/github-readme-assets/result.png)
---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Credits

- [x] **Author**: Abdul Ahad
- [x] **Icons**: [Flaticon](https://www.flaticon.com/free-icons/university) (University icons by Freepik)
- [x] **Images**: [Storyset](https://storyset.com/technology)

---

## Contact

For questions or feedback, reach out via [GitHub Issues](https://github.com/AbdulAHAD968/What-GPA/issues) or connect on [LinkedIn](https://www.linkedin.com/in/abdulahad-zarinc/).
