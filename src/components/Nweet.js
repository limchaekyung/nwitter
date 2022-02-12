import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  //editing 모드 판별
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  //input에 입력된 text 업데이트
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      //delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
            />
            <input type="submit" value="Update Nweet" />
            <button onClick={toggleEditing}>Cancel</button>
          </form>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Nweet</button>
              <button onClick={onDeleteClick}>Delete Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
