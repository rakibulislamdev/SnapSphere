# 📸 SnapSphere – A React Social Media Platform

**SnapSphere** is a full-featured social media application built using **React.js**.

---

## 🔗 Live Site

👉 [Visit Live Site](https://photo-booth-three-omega.vercel.app/)

---

<!-- ## 📚 API Documentation

All APIs used in this project are pre-built and well-documented:

👉 [SnapSphere API Documentation](https://documenter.getpostman.com/view/9649334/2sB2x5FsPY)

--- -->

## 📦 Technologies Used

- **React.js** (with Vite)
- **Tailwind CSS**
- **React Router DOM**
- **TanStack Query**
- **JWT Authentication**
- **RESTful APIs**
- **Postman API Documentation**
- **Vercel Deployment**

---

## 🚀 Features

### 🔐 Authentication

- Fully functional Login & Register pages built with React.
- JWT-based secure login system.
- Protected routes for authenticated users only.
- After registration, users are redirected to the Edit Profile page.

### 🏠 Home Page

- Posts are loaded with infinite scrolling (10 posts per page).
- If an unauthenticated user scrolls to the bottom, a custom Login/Register popup appears.
- Each post displays:
  - Image
  - Caption (with Show More/Show Less toggle for long captions)
  - Like & comment counts
  - Time since posted

### ❤️ Post Interactions

- Authenticated users can **like**, **comment**, and **share** posts.
- Sharing a post copies its direct link to the clipboard.
- Custom UI to display the list of users who liked a post.
- "View all X comments" navigates to the full post details page.

### 📝 Post Details Page

- View the full post along with all its comments.
- Authenticated users can **add**, **edit**, or **delete** their own comments.
- "More from this user" section showcases other posts from the same user.

### 👤 Profile & Edit Profile

- View any user’s public profile with their avatar, bio, and posts.
- If viewing your own profile, an **Edit Profile** button is shown.
- Edit Profile features:
  - Avatar upload
  - Website, Bio, and Gender update
  - Change password with a **strength meter** (Red → Orange → Yellow → Green)

### 🔔 Notifications

- Displays like and comment notifications in chronological order.
- Clicking a notification takes you to the relevant post.

### ➕ Create Post

- Authenticated users can create a new post by uploading an image and adding a caption.
- Validation ensures both image and caption are required.
- Feedback dialogs show success or error messages using custom components.

### 📱 Side Navigation

- Shared navigation component used across all pages (except login & register).
- Includes links to: Home, Notifications, Create Post, and Profile
- Highlights the active page for better user experience.

---

## 🧑‍💻 Developer

Developed by [Rakibul Islam](https://rakibul-islam-v1.netlify.app/)

- 🌐 [Portfolio](https://rakibul-islam-v1.netlify.app/)
- 💻 [GitHub](https://github.com/rakibulislamdev)
- 🐦 [Twitter](https://twitter.com/rakibulislamdev)
- 📸 [Instagram](https://www.instagram.com/rakibulislamdev)
- 👤 [Facebook](https://www.facebook.com/iamrakib2/)

---

## 📢 License

This project is for educational purposes only.
