import {useEffect, useState} from 'react'
import Filter from './Filter';
import Table from './Table';
import BookingTime from './BookingTime';
import TimeFilter from './TimeFilter';
import { Button } from 'react-bootstrap';
import Adduser from './Adduser';

export default function Home(props) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  useEffect(() => {
    console.log(showModal)
  },[showModal])
  
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [booking,setBooking]=useState("upcoming");
  const [filterStartTime,setFilterStartTime]=useState("");
  const [filterEndTime,setFilterEndTime]=useState("");
  function setFilter(option,value){
    setSelectedOption(option);
    setInputValue(value);
  }
  function setBookingTime(dropdown){
    setBooking(dropdown);
    console.log(dropdown);
  }
  function setFilterBookingTime(start,end){
    setFilterStartTime(start);
    setFilterEndTime(end);
  }
  return (
      <>
      <div className="container-fluid" style={{marginTop:"70px"}}>
      <div className="d-flex justify-content-between" >
        <div className="d-flex justify-content-start" >
            {/* <Link className="btn btn-success mb-3 my-" to="/addUser">Room Booking</Link> */}
            <Button className="btn btn-success mb-3 my-" onClick={handleShowModal} showAlert={props.showAlert} >Room Booking</Button>
            <BookingTime setBookingTime={setBookingTime}/>
        </div>
        <TimeFilter setFilterBookingTime={setFilterBookingTime}/>
        <Filter setFilter={setFilter}/>
      </div>
      </div>
      <Table selectedOption={selectedOption} inputValue={inputValue} showAlert={props.showAlert} booking={booking} filterStartTime={filterStartTime} filterEndTime={filterEndTime}/>
       {showModal? <Adduser showAlert={props.showAlert} showModal={showModal} handleClose={handleClose}/>:""}



    </>
  )
}