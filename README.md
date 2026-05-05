# ✅ Todo App

A clean, feature-rich cross-platform Todo application built with **React Native** and **Expo**. Manage your tasks efficiently with filtering, sorting, persistent storage, and a polished mobile UI.

---

## 📱 Preview

![Todo App Screenshot](assets/screenshot.png)

---

## ✨ Features

- **Add tasks** with a date picker
- **Edit tasks** inline without leaving the screen
- **Mark tasks** as completed / pending
- **Delete tasks** individually or clear all completed at once
- **Filter tasks** — All / Completed / Pending
- **Sort tasks** — Oldest or Newest first
- **Highlight** overdue and today's tasks automatically
- **Task statistics** — Total count and completion progress
- **Persistent storage** — All tasks saved locally with AsyncStorage

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile framework |
| Expo | Build tooling & dev experience |
| TypeScript | Type-safe development |
| AsyncStorage | Local persistent storage |
| Expo EAS | APK/IPA build & distribution |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo CLI
- Expo Go app (for device preview)

### Installation

```bash
git clone https://github.com/Mahiisss/Todo-App.git
cd Todo-App
npm install
npx expo start
```

### Running on Device (Expo Go)

1. Install **Expo Go** on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/app/expo-go/id982107779)
2. Run `npx expo start`
3. Scan the QR code shown in the terminal

### Building an Android APK

```bash
eas build -p android --profile preview
```

After the build completes, download the APK from your [Expo dashboard](https://expo.dev) and install it directly on your Android device.

---

## 📁 Project Structure

```
Todo-App/
├── app/          # Screens and navigation
├── components/   # Reusable UI components
├── assets/       # Images and fonts
├── constants/    # App-wide constants
├── hooks/        # Custom React hooks
└── scripts/      # Build and utility scripts
```

---

## 🧠 Key Concepts

- `useState` & `useEffect` for state management and lifecycle
- Conditional rendering and dynamic styling
- Array operations — map, filter, sort
- AsyncStorage for data persistence across sessions
- Cross-platform mobile UI design

---

## 🔮 Planned Improvements

- [ ] Search / filter by keyword
- [ ] Priority levels (High / Medium / Low)
- [ ] Cloud sync with Firebase
- [ ] Push notifications and reminders

---

## 👤 Author

**Mahi** — [@Mahiisss](https://github.com/Mahiisss)

---


