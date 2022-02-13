import { dbService, storageService } from "fbase";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  // form을 위한 state
  const [nweets, setNweets] = useState([]);
  const [attachment, setattachment] = useState();
  /* 오래된 버전(forEach)
  const getNweets = async () => {
      const dbNweets = await dbService.collection("nweets").get();
      dbNweets.forEach(document => {
          const nweetObject = {
              ...document.data(),
              id: document.id,
          }
        setNweets(prev => [nweetObject, ...prev])  ;
      });
  }
  useEffect(() => {
    getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      console.log("Something happened")
    })
  }, []);
  */
  useEffect(() => {
    // Array => setNweets
    // 더 적게 리렌더링(한번 실행됨), 빠르게 실행
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if(attachment !== ""){
      const attachmentRef = storageService
      .ref()
      .child(`${userObj.uid}/${uuidv4()}`);
    const response = await attachmentRef.putString(attachment, "data_url");
    attachmentUrl = await response.ref.getDownloadURL();
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setattachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setattachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setattachment(null);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="img" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            // nweetObj: nweet의 모든 data(author, text, createdAt)
            isOwner={nweet.creatorId === userObj.uid}
            // isOwner: 다이나믹한 prop(true, false)
            // nweet.creatorId(nweet을 만든사람)와 userObj.uid가 같으면 true
            // userObj: Home의 props <- Router <- App.js
            // (로그인, 로그아웃할 때 일어나는 onAuthStateChanged & Application initialize)
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
