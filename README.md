# Jaimin Patel's Personal Website

This is a personal website for Jaimin Patel, featuring an introduction page and a resources section with lecture notes and assignments.

## Features

- **Home Page**: Personal introduction and information about Jaimin Patel
- **Resources Page**: Access to educational materials
  - Lecture Notes: Organized by course, semester, and unit
  - Assignments: Organized by course

## Getting Started

### Prerequisites

- Node.js (recommended v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [your-repo-url]

# Navigate to the project directory
cd [project-folder]

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

This project is configured for seamless deployment on Vercel.

1. Push your code to a GitHub repository
2. Import your project on Vercel
3. Vercel will automatically detect the Next.js project and use the optimal build settings

Alternatively, you can deploy directly from the command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

## Customization

To customize the website for your needs:

1. Update personal information in the home page (`app/page.tsx`)
2. Replace the Google Drive links in the resources pages with your actual file links
3. Add or remove courses, semesters, and units as needed

## Built With

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types 