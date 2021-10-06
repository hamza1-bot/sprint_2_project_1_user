import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import profile from "../../assets/images/profile.jpg"
import $ from 'jquery'; 

const MyProfile = (props) => {

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
    const [picture, setPicture] = useState(null);

    const [user, setUser] = useState({});
    const [postsList, setPostsList] = useState([]);

    const [postDescription, setPostDescription] = useState('');
    const [postImage, setPostImage] = useState(null);


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
        getProfileData();
        getMyPostsList();
    }, []);

    function getProfileData() {
        userService.getProfileData()
        .then(res => {
             var status = res.status;
             res.json().then(
                (result) => {
                if(status == 200) {
                    setUser(result.user);
                    setFirstName(result.user.firstName != null ? result.user.firstName : '');
                    setLastName(result.user.lastName != null ? result.user.lastName : '');
                    setEmail(result.user.email != null ? result.user.email : '');
                    setCity(result.user.city != null ? result.user.city : '');
                    setState(result.user.state != null ? result.user.state : '');
                    setCountry(result.user.country != null ? result.user.country : '');
                    setLocation(result.user.location != null ? result.user.location : '');
                    setMobile(result.user.mobile != null ? result.user.mobile : '');
                    setBio(result.user.bio != null ? result.user.bio : '');
                    if(result.user.userImage != null) {
                        setImgData(window.$mediaURL + result.user.userImage);
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

    function getMyPostsList() {
      userService.getMyPostsList()
      .then(res => {
           var status = res.status;
           res.json().then(
              (result) => {
              if(status == 200) {
                var tempList = result.posts;
                for(var i = 0; i < tempList.length; i++) {
                  if(tempList[i].user.userImage != null) {
                    tempList[i].user.userImage = window.$mediaURL + tempList[i].user.userImage;
                  }
                  if(tempList[i].image != null) {
                    tempList[i].image = window.$mediaURL + tempList[i].image;
                  }
                }
                setPostsList(tempList);

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

  function addPost(event) {
      event.preventDefault();
    
      
      var formData = new FormData();
      var formData2 = {
        "description" : postDescription,
        "secretId" : localStorage.getItem('access_token')
      }
      if(postImage != null) {
          formData.append("image", postImage);
      }
      formData.append("data", JSON.stringify(formData2));
    
      userService.addPost(formData)
      .then(res => {
          var status = res.status;
          res.json().then(
              (result) => {
              if(status == 200) {
                  setPostDescription("");
                  setPostImage(null);
                  toast.success(result.message, { hideProgressBar: true });
                  getMyPostsList();
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

    function openEditProfilePage(event) {
      event.preventDefault();
      history.push('/edit_profile');
    }

    function openFindFriendPage(event) {
      event.preventDefault();
      history.push('/find_friend');
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
                                    <a href="" onClick={openFindFriendPage} class="btn-main">Find Friend</a>    
                                    <a href="" onClick={openEditProfilePage} class="btn-main">Edit Profile</a>    
                                </div>
                        </div>
                        <div class="post-sec">
                          <div class="white-box post-box">
                              <h4>Post here</h4>
                              <textarea value={postDescription} onChange={(event) => {setPostDescription(event.target.value);}} class="post-input" Placeholder="Write here"></textarea>
                              <input type="file" onChange={(event) => {setPostImage(event.target.files[0])}}></input>
                              <a href="" onClick={addPost} class="btn-main">Post</a>    
                          </div>
                          {postsList.map((post, index) =>
                            <div class="white-box post-box">
                              <div class="post-name">
                              <img src={post.user.userImage} alt="User Image" />
                                <h5>{post.user.firstName + ' ' + post.user.lastName}</h5>
                              </div>
                              <div class="post-content">
                              <img src={post.image} alt="Post Image" />
                                <p>{post.description}</p>
                              </div>
                                <div class="like-row">
                                  <a href="" onClick={(event) => {event.preventDefault();}}><span>0</span> Like</a>
                                  <a href="" onClick={(event) => {event.preventDefault();}}><span>0</span> Comment</a>
                                </div>
                            </div>
                          )}
                          
                        </div>
                          </div>
                </div>
            </div>

        </section>

        {/* <img src={profile} alt="" /> */}
      </>
    );
  };
  
export default MyProfile;
