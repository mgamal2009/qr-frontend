
# QR Frontend

This is the mobile app frontend for the QR project.  
Built with React Native and Expo, it communicates with the backend API for authentication and task management.

---

## 🚀 Tech Stack
- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/) for API requests
- [React Navigation](https://reactnavigation.org/) / Expo Router
- [React Query](https://tanstack.com/query) for server state
- [JWT Authentication](https://jwt.io/)

---


---

## ⚙️ Setup

### 1. Clone repository
```bash
    git clone https://github.com/yourusername/qr-frontend.git
    cd qr-frontend
```
### 2. Install dependencies
```bash
    pnpm install
```
### 3. Setup environment variables
Create .env (or use expo-constants):
```bash
    API_URL=http://localhost:4000/
```
### 4. Run app
start the Metro bundler:
```bash
    pnpm start
```` 
then run on your device/emulator:
```bash
    pnpm android
    pnpm ios
```

📦 Dependencies

```bash
    expo ~54.0.9
    react 19.1.0
    react-native 0.81.4
    axios ^1.12.2
    jwt-decode ^4.0.0
    react-native-qrcode-svg ^6.3.15
    @react-navigation/native ^7.1.17
    @react-navigation/native-stack ^7.3.26
    expo-secure-store ^15.0.7
    @react-native-async-storage/async-storage ^2.2.0  
```
