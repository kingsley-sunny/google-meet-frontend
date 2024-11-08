import MeetingPage from "../../components/Pages/MeetingPage/MeetingPage";

const Index = () => {
  // render a loading page, 
  // send a webosocket event with the meeting token, peerId and the userId, to check if the user has been accepted or is the owner of the meeting token ==> THis is return the users in the room
  // call those users
  // answer the users
  return <MeetingPage />;
};

export default Index;
