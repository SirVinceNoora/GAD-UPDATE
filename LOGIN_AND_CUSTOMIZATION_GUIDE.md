# GAD Corner - Login & Customization Features

## ✨ New Features Implemented

### 1. **Login Button & Modal**
- Added a **Login button** next to the DV logo in the header
- Purple-themed button with white text that matches the website color scheme
- Login modal opens when clicked with smooth animations

### 2. **Admin Login System**
- **Default Credentials:**
  - Username: `admin`
  - Password: `admin`
- Demo credentials displayed in the login modal
- Loading animation during login
- Error messages for invalid credentials

### 3. **Customization Dashboard**
After successful login (with admin/admin), users can access the customization panel with two tabs:

#### **Tab 1: Photo Gallery**
- Edit existing photo carousel images
- Add new photos with image URLs from Unsplash or other sources
- Edit photo titles and captions
- Delete photos
- Real-time preview of photos

#### **Tab 2: Featured Programs**
- Edit program titles and descriptions
- Update event dates and participant counts
- Add new program entries
- Delete program entries
- Full CRUD operations on carousel data

### 4. **Color Scheme**
- **Header:** Purple gradient (from-purple-700 via-purple-600 to-purple-700)
- **Buttons:** Purple background (#7C3AED) on customization page
- **Accents:** Orange highlights (#F97316) on main page
- **Overall:** Maintains the professional DepEd GAD branding

## 🎯 How to Use

### For Regular Users:
1. Open the website - see the normal GAD Corner dashboard
2. View photo carousel, featured programs, and charts

### For Admin/Customization:
1. Click **"Login"** button next to the DV logo
2. Enter credentials: `admin` / `admin`
3. Click **"Login to Customize"**
4. Access customization panel with two tabs
5. **Photo Gallery Tab:**
   - Click "Edit" to modify existing photos
   - Paste new image URLs
   - Update titles and captions
   - Delete unwanted photos
   - Click "Add Photo" to add new entries
6. **Featured Programs Tab:**
   - Edit program details (title, description, date, participants)
   - Add new programs
   - Delete programs
7. Click **"Save All Changes"** to persist updates
8. Click **"Logout"** button to return to the main dashboard

## 📁 File Structure
```
src/
├── App.tsx (Updated with login state & customization logic)
├── components/
│   ├── LoginModal.tsx (New - Login component)
│   └── CustomizationPage.tsx (New - Customization dashboard)
└── assets/
    └── dvlogo.png
```

## 🔐 Security Notes
- This is a demo implementation using hardcoded credentials
- In production, integrate with a proper authentication backend
- Use secure password hashing and JWT tokens
- Implement proper session management

## 🎨 Design Features
- Responsive design works on mobile, tablet, and desktop
- Smooth animations and transitions
- Professional UI with consistent color theming
- User-friendly forms with validation
- Real-time visual feedback

## ⚙️ Technical Stack
- React 19 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Recharts for data visualization

