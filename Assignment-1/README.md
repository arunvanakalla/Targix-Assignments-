# Dev Articles Explorer

A modern articles discovery platform built using **HTML, CSS, and JavaScript**, with dynamic articles fetched from the DEV.to API. This project demonstrates linked pages, responsive design, interactive articles, search functionality, and modern UX patterns.

---

## Features

- Multiple linked HTML pages: **Home, About, Contact, Explore**
- Responsive and modern design with **CSS styling**
- Dynamic articles fetched from [DEV.to API](https://dev.to/api)
- **Search functionality** - Filter articles by title, description, or tags
- **Refresh button** - Get new random articles
- **Load more button** - Fetch additional articles
- Interactive **like buttons** for each article
- Enhanced loading states and error handling
- Git version control to track changes

---

## Pages

### Home
- Welcomes users to the mini-blog
- Simple hero section with title and description

### About
- Explains the purpose of the website
- Details what the project includes
- Styled info boxes for content

### Contact
- Provides platform contact information
- Includes Email, GitHub, Twitter, and LinkedIn

### Explore (formerly Posts)
- Fetches articles dynamically from DEV.to API
- **Search functionality** to filter articles in real-time
- **Refresh button** to get new random articles
- **Load more button** to fetch additional articles
- Each article shows an **author avatar**, **title**, **description**, **tags**, and **like button**
- Enhanced loading states with retry functionality
- "No results found" message when search yields no matches

---

## Technologies Used

- **HTML5**: Structure and content of the website  
- **CSS3**: Styling, responsive design, and hover effects  
- **JavaScript (ES6)**: API calls using `fetch`, `async/await`, DOM manipulation, search functionality  
- **DEV.to API**: Real articles from the developer community  
- **Font Awesome**: Icons for UI enhancement  
- **Git**: Version control  

---

## How to Run

1. Clone the repository:  
   ```bash
   git clone https://github.com/arunvanakalla/simple-static-web-page-.git
   ```

2. Open `index.html` in your browser.
3. Navigate through pages using the header menu.
4. Go to `Explore` page to see dynamically fetched articles.
5. Use the search bar to filter articles by keywords.
6. Click "Get New Articles" to refresh with new random content.
7. Click "Load More Articles" to fetch additional articles.

---

## Project Structure

```
dev-articles-explorer/
├── index.html
├── about.html
├── contact.html
├── posts.html
├── styles.css
├── script.js
└── README.md
```

## Recent Updates

- ✅ Rebranded from "Arun's Tech Blog" to "Dev Articles Explorer"
- ✅ Added real-time search functionality
- ✅ Implemented refresh and load more buttons
- ✅ Enhanced loading states and error handling
- ✅ Changed navigation from "Posts" to "Explore"
- ✅ Updated all content to reflect articles explorer concept

## Future Improvements

* Add **category filtering** by programming languages/topics
* Implement **bookmark functionality** to save articles
* Add **dark/light mode toggle**
* Integrate **article preview** modals
* Add **trending topics** section
* Add **authentication/login system**
* Improve **mobile responsiveness**

---

## Author

**Arun Kumar Vanakalla**
Email: [contact@myblog.com](mailto:contact@myblog.com)
GitHub: [github.com/arunkumar](https://github.com/arunkumar)

---

## License

This project is **open source** and free to use.

```