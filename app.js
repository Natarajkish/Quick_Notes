// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDCkOz1QMGZYs1Ul_x1YhmeN-P3MoMkix0",
  authDomain: "new-project-97cd5.firebaseapp.com",
  projectId: "new-project-97cd5",
  storageBucket: "new-project-97cd5.firebasestorage.app",
  messagingSenderId: "139312060050",
  appId: "1:139312060050:web:22a5cdcaf32a218684b84b",
  measurementId: "G-TT9E8FS2W4"
};

// Initialize
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add note
function addNote() {
  const noteText = document.getElementById("noteInput").value;
  if (noteText.trim() !== "") {
    db.collection("notes").add({ text: noteText });
    document.getElementById("noteInput").value = "";
  }
}

// Real-time fetch notes
db.collection("notes").onSnapshot((snapshot) => {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";
  snapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    li.onclick = () => db.collection("notes").doc(doc.id).delete();
    notesList.appendChild(li);
  });
});
