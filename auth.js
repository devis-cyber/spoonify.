// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCGwM6yWgyEaapNN15oCGEKGhH9aLhXnmY",
  authDomain: "august-firebase-1ef81.firebaseapp.com",
  projectId: "august-firebase-1ef81",
  storageBucket: "august-firebase-1ef81.firebasestorage.app",
  messagingSenderId: "479254288279",
  appId: "1:479254288279:web:eb1537d5b0efcb91e556d2"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== SIGNUP =====
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("✅ Account created!");
        window.location.href = "login.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("✅ Login successful!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ===== LOGOUT =====
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}

// ===== USER STATE LISTENER =====
onAuthStateChanged(auth, (user) => {
  const profileMenu = document.getElementById("profileMenu");
  const userEmail = document.getElementById("userEmail");
  const profilePic = document.getElementById("profilePic");

  if (user) {
    if (userEmail) {
      userEmail.textContent = user.email.split("@")[0]; // short email
    }
    if (profilePic) {
      profilePic.src = "https://via.placeholder.com/40"; // replace with real pic if available
    }
    if (profileMenu) {
      profileMenu.style.display = "flex";
    }
  } else {
    if (profileMenu) profileMenu.style.display = "none";
  }
});



