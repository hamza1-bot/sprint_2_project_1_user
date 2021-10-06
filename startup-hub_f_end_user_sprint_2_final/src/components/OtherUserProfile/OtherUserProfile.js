import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import profile from "../../assets/images/profile.jpg"
import $ from 'jquery'; 

const OtherUserProfile = (props) => {

    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [mobile, setMobile] = useState('');
    const [bio, setBio] = useState('');
    const [imgData, setImgData] = useState(null);

    useEffect(() => {    // Update the document title using the browser API
      $('#idHeaderProfile').addClass('active');
      $('#idHeaderHome').removeClass('active');
      $('#idHeaderLogin').removeClass('active');
      $('#idHeaderRegister').removeClass('active');
      if(localStorage.getItem("isLoggedIn") != null && localStorage.getItem("isLoggedIn") == "true") {
          $('.classAfterLogin').show();
          $('.classBeforeLogin').hide();
          $('#idLoggedInUserName').html(JSON.parse(localStorage.getItem('user')).firstName + ' ' + JSON.parse(localStorage.getItem('user')).lastName);
          if(JSON.parse(localStorage.getItem('user')).userImage != null) {
              $("#idLoggedInUserImage").attr("src", window.$mediaURL + JSON.parse(localStorage.getItem('user')).userImage);
          }
      } else {
          $('.classBeforeLogin').show();
          $('.classAfterLogin').hide();
      }
      getOtherUserProfileData();
  }, []);

  function getOtherUserProfileData() {
    var formData = {
      "otherUserId" : localStorage.getItem("otherUserId"),
      "secretId" : localStorage.getItem('access_token')
    };
      userService.getOtherUserProfileData(formData)
      .then(res => {
           var status = res.status;
           res.json().then(
              (result) => {
              if(status == 200) {
                  setFirstName(result.otherUser.firstName != null ? result.otherUser.firstName : '');
                  setLastName(result.otherUser.lastName != null ? result.otherUser.lastName : '');
                  setEmail(result.otherUser.email != null ? result.otherUser.email : '');
                  setCity(result.otherUser.city != null ? result.otherUser.city : '');
                  setState(result.otherUser.state != null ? result.otherUser.state : '');
                  setCountry(result.otherUser.country != null ? result.otherUser.country : '');
                  setLocation(result.otherUser.location != null ? result.otherUser.location : '');
                  setMobile(result.otherUser.mobile != null ? result.otherUser.mobile : '');
                  setBio(result.otherUser.bio != null ? result.otherUser.bio : '');
                  if(result.otherUser.userImage != null) {
                      setImgData(window.$mediaURL + result.otherUser.userImage);
                  }
              } else if (status == 401) {
                 toast.error(result.error_description, {hideProgressBar: true, pauseOnHover: false});
              } else {
                 toast.error(result.message, {hideProgressBar: true, pauseOnHover: false});
              }
              }
           )
      },
      (error) => {
        toast.error(error.message, {hideProgressBar: true, pauseOnHover: false});
      }
      )
  }

  function sendResume() {
    var formData = {
      "otherUserId" : localStorage.getItem("otherUserId"),
      "secretId" : localStorage.getItem('access_token')
    };
      userService.sendResume(formData)
      .then(res => {
           var status = res.status;
           res.json().then(
              (result) => {
              if(status == 200) {
                toast.success(result.message, { hideProgressBar: true });
              } else if (status == 401) {
                 toast.error(result.error_description, {hideProgressBar: true, pauseOnHover: false});
              } else {
                 toast.error(result.message, {hideProgressBar: true, pauseOnHover: false});
              }
              }
           )
      },
      (error) => {
        toast.error(error.message, {hideProgressBar: true, pauseOnHover: false});
      }
      )
  }


    return (
      <>
        <ToastContainer />
        <section class="profile_sec">
            <div class="Profile-img-head">
                <img src={profile} alt="" />
            </div>
            <div class="container margin-top">
                <div class="row">
                        <div class="profile-img-box">
                             <img src={imgData} alt="" />
                        </div>
                        <div class="second-box">
                        <div class="white-box detail-box">
                            <h4>About</h4>
                            <h5 class="Name">{firstName + ' ' + lastName}</h5>
                            <p>{bio}</p>
                                <ul>
                                    <li>Email: <span>{email}</span></li>
                                    <li>City: <span>{city}</span></li>
                                    <li>State: <span>{state}</span></li>
                                    <li>Country: <span>{country}</span></li>
                                    <li>Address: <span>{location}</span></li>
                                    <li>Mobile: <span>{mobile}</span></li>
                                    </ul>    

                                <div class="button__box">
                                    <a href="" onClick={(event) => {event.preventDefault();}} class="btn-main">Add Friend</a>    
                                    <a href="" onClick={(event) => {event.preventDefault(); sendResume()}} class="btn-main">Send Resume</a>
                                </div>
                        </div>
                          </div>
                </div>
            </div>

        </section>

        {/* <img src={profile} alt="" /> */}
      </>
    );
  };
  
export default OtherUserProfile;
