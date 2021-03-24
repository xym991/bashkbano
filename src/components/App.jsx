import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import List from "./List";
import List1 from "./List1";
import Search from "./Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useGlobalState } from "../StateProvider";
import ListRoom from "./ListRoom";
import ListRoommate from "./ListRoommate";
import MyListings from "./MyListings";
import Listing from "./Listing";

function App() {
  const [state, dispatch] = useGlobalState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "UPDATE_USER",
          user: user,
        });
      } else {
        dispatch({
          type: "UPDATE_USER",
          user: null,
        });
      }
      console.log(user);
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/rooms">
            <Header type="rooms" />

            <Search type="rooms" />

            <List1 type="rooms" />
          </Route>

          <Route path="/login">
            <Header type="login" />

            <Login />
          </Route>
          <Route path="/signup">
            <Header type="login" />

            <Signup />
          </Route>
          <Route path="/list-room">
            <Header />

            <ListRoom />
          </Route>
          <Route path="/list-roommate">
            <Header />

            <ListRoommate />
          </Route>
          <Route path="/my-listings">
            <Header type="my-listings" />

            <MyListings />
          </Route>
          <Route path="/listing/rooms/:id">
            <Header />

            <Listing type="room" />
          </Route>
          <Route path="/listing/roommates/:id">
            <Header />

            <Listing type="roommate" />
          </Route>
          <Route path="/">
            <Header type="roommates" />

            <Search type="roommates" />

            <List type="roommates" />
          </Route>
        </Switch>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
