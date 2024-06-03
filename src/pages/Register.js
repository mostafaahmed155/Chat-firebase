// import React, { useState } from "react";
// import Add from "../img/addAvatar.png";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, storage } from "../firbase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../firbase";
// const Register = () => {
//   const [Err, setErr] = useState(false);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0];
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       const storageRef = ref(storage, displayName);

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         (error) => {
//           setErr(true);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateProfile(res.user, {
//               displayName,
//               photoURL: downloadURL,
//             });
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid:res.user.uid,
//               displayName,
//               email,
//               photoURL: downloadURL,
//             });
//           });
//         }
//       );
//     } catch (err) {
//       setErr(true);
//     }
//   };
//   return (
//     <div className="formContainer">
//       <div className="formWrapper">
//         <span className="logo"> GP Chat</span>
//         <span className="title"> Register </span>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="display name" />
//           <input type="email" placeholder="email" />
//           <input type="password" placeholder="password" />
//           <input style={{ display: "none" }} type="file" id="file" />
//           <label htmlFor="file">
//             <img src={Add} alt="" />
//             <span>Add An Avatar</span>
//           </label>
//           <button>Sign Up</button>
//           {Err && <span>something went wrong</span>}
//         </form>
//         <p>you do have an account? login</p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firbase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [Err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a storage reference with the user's display name
      const storageRef = ref(storage, `avatars/${displayName}`);

      // Upload the file
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          // Handle unsuccessful uploads
          setErr(true);
        },
        async () => {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update user profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          // Create a document for the user in Firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "userChats", res.user.uid), {});

          // Navigate to the home page
          navigate("/");
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">GP Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add An Avatar</span>
          </label>
          <button>Sign Up</button>
          {Err && <span>Something went wrong</span>}
        </form>
        <p>Do you have an account? <Link to="/login">login</Link></p>
      </div>
    </div>
  );
};

export default Register;
