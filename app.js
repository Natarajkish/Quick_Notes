// Firebase config
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: ",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
