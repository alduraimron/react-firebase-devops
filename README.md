# React Notes App

## 📥 Installation
### **1. Clone Repository**
```sh
git clone https://github.com/alduraimron/react-firebase-devops.git
cd react-firebase-devops
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Run Development Server**
```sh
npm start
```
Aplikasi akan berjalan di `http://localhost:3000`

---



## 🚀 Deployment
### **1. Install Firebase CLI**
```sh
npm install -g firebase-tools
firebase login
```

### **2. Konfigurasi Firebase**
```sh
firebase init
```
- Pilih **Hosting**
- Pilih proyek Firebase yang sudah dibuat
- Set **public directory** ke `build`
- Pilih **Yes** untuk single-page app

### **3. Build & Deploy Manual**
```sh
npm run build
firebase deploy
```

---

## 🔄 CI/CD dengan GitHub Actions
Proyek ini menggunakan **GitHub Actions** untuk otomatisasi deployment ke Firebase saat ada push ke `main`.

### **.github/workflows/firebase-deploy.yml**
```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main 

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Build project
        env:
          NODE_OPTIONS: --openssl-legacy-provider
        run: npm run build

      - name: Deploy to Firebase Hosting
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
          channelId: live
```

### **4. Konfigurasi GitHub Secrets**
1. **Buka repository di GitHub**
2. **Masuk ke** `Settings > Secrets and variables > Actions`
3. **Tambahkan Secret Baru:**
   - `FIREBASE_TOKEN`: (Token dari Firebase)

### **5. Push ke Main untuk Deployment Otomatis**
```sh
git add .
git commit -m "Deploy update"
git push origin main
```
Aplikasi akan otomatis **build & deploy** ke Firebase!