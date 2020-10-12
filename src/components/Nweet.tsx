import { dbService } from "fBase";
import React from "react";

const Nweet = ({ nweetObj, isOwner }: any) => {
  const [editing, setEditing] = React.useState(false);
  const [newNweet, setNewNweet] = React.useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    console.log(ok);
    if (ok) {
      //delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete(); // 우리가 가지고 있는 doc(document를 뜻함) 중에 하나를 찾아서 지움
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(nweetObj, newNweet);
    await dbService.doc(`nweets/${nweetObj.id}`).update({text : newNweet})
    setEditing(false);
  };
  const onChange = React.useCallback((e: any) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  }, []);

  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <div>
      {editing ? (
        <>
        {isOwner &&
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button></>}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner ? (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Nweet;
