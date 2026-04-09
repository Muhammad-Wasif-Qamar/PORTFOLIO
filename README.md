# Wasif Qamar - AI Engineer & Full-Stack Developer Portfolio

A high-end, minimalist personal portfolio website for a professional AI Engineer and Full-Stack Developer.

## Tech Stack

- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS (v4)**
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

## Customization Guide (Adding Your Links)

To personalize this portfolio, update the links and information in the following files:

### 1. Social Media & Primary Contact
- **GitHub, LinkedIn, and Email (Hero Section)**:
  `src/components/hero/Hero.tsx`
- **GitHub, LinkedIn, and Email (Contact Section)**:
  `src/components/contact/Contact.tsx`
- **Resume File Path**:
  `src/components/hero/Hero.tsx` (Update the `href` in the "Download Resume" link)

### 2. Project Details & Links
- **Project Titles, Descriptions, GitHub Repos, and Live Demos**:
  `src/components/projects/Projects.tsx` (Update the `projects` array at the top of the file)

### 3. Technical Stats & Experience
- **Years of Experience & Project Counts**:
  `src/components/about/About.tsx`
- **Work History & Education Timeline**:
  `src/components/experience/Experience.tsx`

---

## Design Philosophy

- **Minimalist Layout**: Focus on content and technical work.
- **Strong Typography**: Confident headings and readable body text.
- **Warm Minimalist Palette**: Soft whites (`#FAFAF9`), warm greys (`#F1F1EF`), and elegant brown accents (`#C7A27C`).
- **Subtle Motion**: Purposeful animations that enhance rather than distract.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wasif-qamar-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import your project into Vercel.
3. Vercel will automatically detect Next.js and configure the build settings.
4. Click **Deploy**.

## Design Decisions

- **Color Palette**: Used `#FAFAF9` (Primary BG) and `#F1F1EF` (Secondary BG) to create a warm, sophisticated atmosphere. `#C7A27C` (Accent) provides a premium touch without being loud.
- **Typography**: Inter and Geist fonts were chosen for their modern, professional feel.
- **Animations**:
  - **Neural Network Visualization**: Custom canvas-based animation in `src/components/animations/NeuralNetwork.tsx`.
  - **3D Tilt Effect**: Applied to project and skill cards for an interactive feel.
  - **Scroll Reveals**: Sections fade and slide in sequence to guide the user's attention.
