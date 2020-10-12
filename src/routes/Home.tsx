import { dbService } from "fBase";
import React from "react";
import Nweet from 'components/Nweet';

interface Props {
  userObj: any;
}

const Home = ({ userObj }: Props) => {
  const [nweet, setNweet] = React.useState<string>('');
  const [nweets, setNweets] = React.useState<any>([]);
  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweets").get(); // firestore의 Querysnopshot을 리턴!
  //   dbNweets.forEach(document => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     }
  //     setNweets((prev:any):any => [nweetObject, ...prev])
  //   });
  // }
  React.useEffect(() => {
    dbService.collection("nweets").onSnapshot(snapshot => { // 데이터베이스에 무슨 변경사항이 있을 때 알림을 받는다.
      // console.log(snapshot.docs);
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNweets(nweetArray); //그리고 그 변경사항을 반영해서 변수를 업데이트한다.
    })
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      text:nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onChange = React.useCallback((e: any) => {
    e.preventDefault();
    setNweet(e.target.value);
  }, []);

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
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {
          nweets.map((nweet: any) => (
            <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
          ))
        }
      </div>
    </div>
  );
};
export default Home;
