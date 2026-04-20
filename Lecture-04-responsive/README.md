# Lecture 02 – Semantic HTML & Structure

## 1. What I implemented in this lecture
- Built a semantic structure using `header`, `main`, `section`, `article`, and `footer`.
- Created a Portfolio / Works section with images, links, and an embedded video using `iframe`.
- Added accessibility features: skip link, correct heading hierarchy, and alt text for all images.

## 2. Semantic decisions I made (REQUIRED)

### Decision 1
- Element(s) used: `<header>`, `<h1>`
- Where in the page: Top of the page
- Why this element is semantically correct: The header introduces the page identity (my name) and short personal information. Using exactly one `<h1>` keeps the main topic of the page clear.

### Decision 2
- Element(s) used: `<section>`, `<article>`
- Where in the page: Portfolio area and inside it for individual projects
- Why this element is semantically correct: The portfolio is a standalone content area, so a `<section>` is appropriate. Each project is self-contained and could stand on its own, so `<article>` fits each project entry.

### Decision 3
- Element(s) used: `<figure>`, `<figcaption>`
- Where in the page: Around images and the embedded video
- Why this element is semantically correct: `figure` groups media with its description, and `figcaption` provides context so users understand what each image/video represents.

---

## 3. Accessibility considerations
- Added a skip link (`<a href="#main">Skip to content</a>`) so keyboard users can jump directly to the main content.
- Used correct heading hierarchy (h1 → h2 → h3 → h4) so screen reader users can navigate easily.
- Added meaningful alt text for all images so the content is understandable even without visuals.
- Added a descriptive title for the iframe so users know what the embedded video is.

---

## 4. What I learned
- Semantic HTML improves readability and helps assistive technologies understand the page.
- Proper headings and landmarks make navigation easier even without any styling.

## 5. What I still need to improve
- Writing more detailed alt text depending on the image's purpose.
- Creating clearer project descriptions and adding more real project links.
