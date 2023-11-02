import { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import userContext from '../context/userContext';
import {useNavigate } from 'react-router-dom';

export default function Adduser(props) {
  const showModal=props.showModal
  const handleClose=props.handleClose;
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [user, setUser] = useState({
    email: '',
    roomType: 'null',
    roomNumber: '',
    startTime: '',
    endTime: '',
  });
  const context = useContext(userContext);
  let navigate = useNavigate();
  const { addUser } = context;

  const callback = (flag) => {
    if (!flag) {
      props.showAlert("This room is already booked for the given slot.", "danger");
    }
    else {
      let startTime = Date.parse(user.startTime);
      let endTime = Date.parse(user.endTime);
      let timeDiff = endTime - startTime; // difference between current time and start time in milliseconds
      let hoursDiff = timeDiff / (1000 * 60 * 60); // difference in hours
      let price;
      if (user.roomType === "A") {
        price = hoursDiff * 100;
      } else if (user.roomType === "B") {
        price = hoursDiff * 80;
      } else {
        price = hoursDiff * 50;
      }
      price = Math.round(price);
      props.showAlert(`Successfully booked. Bill is ₹ ${price}`, "success");
      navigate('/');
    }
    setUser({ email: '', roomType: '',roomNumber: '', startTime: '', endTime: '' });
  }
  const onClickHandler = async (e) => {
    addUser(user.email, user.roomType, user.roomNumber, user.startTime, user.endTime, callback);
    handleClose();
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const [room, setRoom] = useState('A');
  const data = {
    'null':[],
    'A':[1,2,3,4],
    'B':[1,2,3,4,5],
    'C':[1,2,3],
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
    <Modal.Title>Room Booking</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="container d-flex justify-content-center">
        <div style={{ width: '50vw', minWidth: '300px' }}>
          
      <div className="row">
      <div className="col">
        <label className="form-label">Email:</label>
        <input type="email" className="form-control" name="email" placeholder="Email" value={user.email} onChange={onChange} />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label className="form-label">Room Type:</label>
        <select className="form-select" name="roomType" value={user.roomType} onChange={onChange}>
          <option value="">Select Room Type</option>
          <option value="A">A: 100 Rs/hr</option>
          <option value="B">B: 80 Rs/hr</option>
          <option value="C">C: 50 Rs/hr</option>
        </select>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label className="form-label">Room Number:</label>
        <select className="form-select" name="roomNumber" value={user.roomNumber} onChange={onChange}>
          <option value="">Select Room Number</option>
          {data[user.roomType].map((roomNumber)=>
            <option key={roomNumber} value={roomNumber}>{roomNumber}</option> 
            )}
        </select>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <label className="form-label">Start Time:</label>
        <input type="datetime-local" className="form-control" name="startTime" placeholder="Start Time" value={user.startTime} onChange={onChange} />
      </div>
      <div className="col">
        <label className="form-label">End Time:</label>
        <input type="datetime-local" className="form-control" name="endTime" placeholder="End Time" value={user.endTime} onChange={onChange} />
      </div>
    </div>
          
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" disabled={user.email.length === 0 || user.roomNumber.length === 0 || user.roomType.length === 0 || user.startTime.length === 0 || user.endTime.length === 0 || Date.parse(user.startTime) > Date.parse(user.endTime)} onClick={onClickHandler}>
        Save
      </Button>
      <Button variant="danger" onClick={handleClose}>
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
  );
}





