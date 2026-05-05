# Todo App — React Native + Expo

## Preview

![Todo App Screenshot](assets/screenshots/SS.jpeg)

A cross-platform Todo mobile application built using React Native and Expo. The app allows users to manage daily tasks with editing, filtering, sorting, and persistent local storage.

---

## Features

* Add tasks with date
* Mark tasks as completed
* Edit tasks inline
* Delete tasks
* Filter tasks (All / Completed / Pending)
* Clear all completed tasks
* Date picker integration
* Sort tasks by date (Oldest / Newest)
* Highlight overdue and today’s tasks
* Task statistics (Total & Completed)
* Persistent storage using AsyncStorage
* Clean and responsive mobile UI

---

## Tech Stack

* React Native
* Expo
* TypeScript
* AsyncStorage
* Expo EAS

---

## Installation & Setup

```bash
git clone https://github.com/your-username/todo-app
cd todo-app
npm install
npx expo start
```

---

## Running the App

### Using Expo Go

1. Install Expo Go
2. Run:

```bash
npx expo start
```

3. Scan the QR code

### Android APK

To generate an APK:

```bash
eas build -p android --profile preview
```

After the build completes:

* Download APK from Expo dashboard
* Install it on your Android device

---

## Key Concepts Used

* React Hooks (useState, useEffect)
* State-driven UI updates
* Conditional rendering
* Array operations (map, filter, sort)
* Local storage handling
* Cross-platform mobile development

---

## Learning Outcome

This project demonstrates building a complete mobile application using React Native, including task management, state handling, persistent storage, and APK deployment using Expo EAS.

---

## Future Improvements

* Search functionality
* Priority-based tasks
* Cloud sync (Firebase)
* Notifications/reminders

---

## Author

Mahi
