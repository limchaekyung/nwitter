import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };
  /* const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", "userObj.uid")
      .orderBy("createdAt")
      .get();
    //where: db 데이터 필터링
    //orderby: index 필요
    console.log(nweets.docs((doc) => doc.data()));
  };
  useEffect(() => {
    getMyNweets();
  }, []); */
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      })
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};

export default Profile;
