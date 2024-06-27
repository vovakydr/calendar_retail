import { Outlet } from "react-router-dom";
//import CalendarNavBar from "../components/CalendarNavBar";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
//import Menu from "../components/menu/Menu";
//import MainNavComp from "../components/oldMainNav/main-nav";
//import Rating from "../components/Rating";

const SharedLayout = () => {
    const { isLoading } = useSelector((store) => store.calendar);
    const { isModalOpened } = useSelector((store) => store.eventInfo);
  
    const [showLoader, setShowLoader] = useState(false);
  
    useEffect(() => {
      let timer;
  
      if (isLoading) {
        timer = setTimeout(() => {
          setShowLoader(true);
        }, 100);
      } else {
        setShowLoader(false);
      }
  
      return () => {
        clearTimeout(timer);
      };
    }, [isLoading]);
  
    return (
      <>
        <div
          className={showLoader ? "loader-container show" : "loader-container"}
        >
          <span className="loader"></span>
        </div>
        
        {/*<div className="banner">
          <img src="banner.jpg" alt="" />
          <p>Календарь</p>
        </div>*/}
        {isModalOpened && <Modal />}
        {/*<CalendarNavBar />*/}
        <Outlet />
      </>
    );
  };
  export default SharedLayout;