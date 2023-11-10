import React from 'react';
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth,db } from '@/config/firebase';
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail, signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, doc, getDocs} from 'firebase/firestore'
import Swal from 'sweetalert2';
<link rel="icon" type="image/png" href="hcdclogo.png"></link>
import { BsArrowLeftShort,BsSearch, BsCardChecklist, BsFillPersonFill} from "react-icons/bs";
import { RiDashboardFill} from "react-icons/ri";
import { SiGooglescholar} from "react-icons/si";
import { FaUsersCog, FaList} from "react-icons/fa";
import { BiLogOut,BiMenu} from "react-icons/bi";
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet"></link>
import { Helmet } from "react-helmet";


import SplashScreen from '../components/SplashScreen';


import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Attendance from '../components/Attendance';
import Scholars from '../components/Scholars';
import Users from '../components/Users';
import Not_Found from '../components/404';


function Home () {
    const [user,loading] = useAuthState(auth);
    const [users,setUsers] = useState([]);
    const [scholars,setScholars] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [meeting, setMeeting] = useState([]);
    const router = useRouter();
    const [open, setOpen] = useState(true)
    const [openButton, setOpenButton] = useState(false)
    const [accessDenied , setAccessDenied] =useState(false)
    const [Menu, setMenu] = useState('Dashboard');
    const [MenuOptions, setMenuOptions] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [modalSize, setModalSize] = useState('md');
    const [loadAdminUsers, setLoadAdminUsers] = useState(false);
    const [loadUsers, setLoadUsers] = useState(false);
    const [loadAttendance, setLoadAttendance] = useState(false);
    const [loadMeeting, setLoadMeeting] = useState(false);
    
    
  
    useEffect(() => {
      setOpen(!isMobile);
    }, [isMobile]);

    useEffect(() => {
      setModalSize(isMobile ? 'lg' : 'md');
    }, [isMobile]);
    
    useEffect(() => {
      // Ensure admin.Access is initialized to an empty string when admin is null or undefined
      const adminSuper = admin ? admin.super : undefined;
    
      // Update the adminAuthorityLevel state
      setAdminSuper(adminSuper);
    }, [admin]);
    
    const [adminSuper, setAdminSuper] = useState(false);

    useEffect(() => {
      // Set the title of the web page
      document.title = "HCDC Scholar"; // Replace "Your Page Title" with your desired title
    }, []);
    // Check admin user status
    useEffect(() => {
        if (loading) {
        // Auth state is still loading, wait for it to be ready
        return;
        }
        
        if (!user || !user.uid) {
        setAccessDenied(true);
        return; // Stop further execution if user or uid is null
    }
    
    const unsubscribe = onSnapshot(
        query(
          collection(db, "admin_users"),
          where("uid", "==", user.uid),
          where('access', '==', true)
        ),
        (querySnapshot) => {
          if (querySnapshot.size === 1) {
            querySnapshot.forEach((doc) => {
              const adminData = doc.data();
              setAdmin(adminData);
            });
          } else {
            setAdmin([]);
            setAccessDenied(true);
          }
        }
      );
    
      return () => unsubscribe(); // Unsubscribe when component unmounts or when dependencies change
    }, [user,loading]);

    // admin_users collection

    useEffect(() => {
      if (loadAdminUsers==true && users.length==0){
        const que = query(
          collection(db, "admin_users"), 
          orderBy('date_created', 'desc'));
          
        const unsubscribe = onSnapshot(que, (querySnapshot) => {
  
          querySnapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const id =change.doc.id;
  
            console.log('Admin Test read onchange')
            
            if (change.type === "added"){
              setUsers((prevUsers) => [...prevUsers, {...data, id}]);
              console.log("added");
            } else if (change.type === "modified"){
              setUsers((prevUsers) => prevUsers.map((user) => user.id===id? {...data, id} :user));
              console.log("modified");
            }
            else if (change.type === "removed"){
              setUsers((prevUsers) => prevUsers.filter((user) => user.id !==id));
              console.log("removed");
            }
          });
        });
        return () => unsubscribe();
      }
      else {
        console.log("admin_users not loaded")
      }
      
    }, [loadAdminUsers]);

    //users (scholars) collection

    useEffect(() => {
      if (loadUsers==true && scholars.length==0){
        const que = query(
          collection(db, "users"),
          where("status", "==", "CURRENTLY ENROLLED"));

          
        const unsubscribe = onSnapshot(que, (querySnapshot) => {
  
          querySnapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const id =change.doc.id;
  
            console.log('users/scholars Test read onchange')
            
            if (change.type === "added"){
              setScholars((prevUsers) => [...prevUsers, {...data, id}]);
              console.log("added");
            } else if (change.type === "modified"){
              setScholars((prevUsers) => prevUsers.map((user) => user.id===id? {...data, id} :user));
              console.log("modified");
            }
            else if (change.type === "removed"){
              setScholars((prevUsers) => prevUsers.filter((user) => user.id !==id));
              console.log("removed");
            }
          });
        });
        return () => unsubscribe();
      }
      else {
        console.log("users not loaded")
      }
      
    }, [loadUsers]);  


    // attendance collection

    useEffect(() => {
      if (loadAttendance==true && attendance.length==0){
        const que = query(
          collection(db, "attendance"), 
          orderBy('dateTime', 'desc'));
          
        const unsubscribe = onSnapshot(que, (querySnapshot) => {
  
          querySnapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const id =change.doc.id;
  
            console.log('attendance Test read onchange')
            
            if (change.type === "added"){
              setAttendance((prevAttendance) => [...prevAttendance, {...data, id}]);
              console.log("added");
            } else if (change.type === "modified"){
              setAttendance((prevAttendance) => prevAttendance.map((attend) => attend.id===id? {...data, id} :attend));
              console.log("modified");
            }
            else if (change.type === "removed"){
              setAttendance((prevAttendance) => prevAttendance.filter((attend) => attend.id !==id));
              console.log("removed");
            }
          });
        });
        return () => unsubscribe();
      }
      else {
        console.log("attendance not loaded")
      }
     
    }, [loadAttendance]);

    // meeting collection

    useEffect(() => {
      if (loadMeeting==true && meeting.length==0) {
        const que = query(
          collection(db, "meeting"), 
          orderBy('meetDate', 'desc'));
          
        const unsubscribe = onSnapshot(que, (querySnapshot) => {
  
          querySnapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const id =change.doc.id;
  
            console.log('meeting Test read onchange')
            
            if (change.type === "added"){
              setMeeting((prevMeeting) => [...prevMeeting, {...data, id}]);
              console.log("added");
            } else if (change.type === "modified"){
              setMeeting((prevMeeting) => prevMeeting.map((meet) => meet.id===id? {...data, id} :meet));
              console.log("modified");
            }
            else if (change.type === "removed"){
              setMeeting((prevMeeting) => prevMeeting.filter((meet) => meet.id !==id));
              console.log("removed");
            }
          });
        });
        return () => unsubscribe();
      }
      else {
        console.log("meeting not loaded")
      }
     
    }, [loadMeeting]);

    useEffect(() => {
      if (adminSuper) {
        setMenuOptions([
          { title: 'Dashboard' },
          { title: 'Scholars', icon:<SiGooglescholar/> },
          { title: 'Attendance', icon: <FaList/> },
          { title: 'Profile', icon: <BsFillPersonFill/> },
          { title: 'Users', icon: <FaUsersCog/> },
        ]);
      } else if(adminSuper==undefined) {
        setMenuOptions([
          { title: 'Dashboard' },
          { title: 'Scholars', icon:<SiGooglescholar/> },
          { title: 'Attendance', icon: <FaList/> },
          { title: 'Profile', icon: <BsFillPersonFill/> },
        ]);
      }
    }, [adminSuper,setMenuOptions]);

    

    function Sign_Out(){
      Swal.fire({
        title: 'Are you sure you want to Logout?',
        showCancelButton: true,
        icon: 'question',
        iconColor: '#000080',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#000080', 
        cancelButtonText: `Cancel`,
        buttonsStyling: true,
        customClass: {
          popup: `swal2-${modalSize}`,
        },
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          sessionStorage.setItem('Signout', true);
          sessionStorage.setItem('isFirstRun', 'false');
          sessionStorage.removeItem('Menu');
          router.push('/').then(() => {
            auth.signOut()
              .then(() => {
                console.log('Sign out successful');
              })
              .catch((error) => {
                console.error('Sign out error:', error);
              });
          });
          
        }
      }) 
    }

    useEffect(() => {
      if (accessDenied) {
        let timerInterval
        Swal.fire({
          title: 'Access Denied!',
          html: 'Please wait to be given access by ADMIN <br> <p> Automatic logout in <b></b> milliseconds. </p> ', 
          timer: 5000,
          allowOutsideClick:false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          setAccessDenied(false);
          sessionStorage.setItem('Signout', true);
          sessionStorage.setItem('isFirstRun', 'false');
          sessionStorage.removeItem('Menu');
          router.push('/').then(() => {
            auth.signOut()
              .then(() => {
                console.log('Sign out successful');
              })
              .catch((error) => {
                console.error('Sign out error:', error);
              });
          });
        })
      return;
      }
    },[accessDenied]);

    useEffect(() => {
      const storedMenu = sessionStorage.getItem('Menu');
      if (storedMenu) {
        setMenu(storedMenu);
      }
    }, [user]);
    

    const [load, setLoading] = useState(true);


    const changeMenu = (selectedOption) => {setMenu(selectedOption);}

    function getMenu() {
      switch (Menu) {
        // eslint-disable-next-line
        case 'Dashboard': return <Dashboard />;break;
        // eslint-disable-next-line
        case 'Scholars': return <Scholars 
                          scholars={scholars} 
                          setLoadUsers={setLoadUsers}/>;break;
        // eslint-disable-next-line
        case 'Attendance': return <Attendance 
                          attendance={attendance} 
                          meeting={meeting} 
                          scholars={scholars} 
                          setLoadUsers={setLoadUsers}
                          setLoadAttendance={setLoadAttendance}
                          setLoadMeeting={setLoadMeeting}/>;break;
        // eslint-disable-next-line
        case 'Profile': return <Profile/>;break;
        // eslint-disable-next-line
        case 'Users': return <Users 
                          users={users}
                          setLoadAdminUsers={setLoadAdminUsers}/>;break;
        default: return <Not_Found/>;break;
      }
    }

    useEffect(() => {
      sessionStorage.setItem('Menu', Menu);
      const menu = sessionStorage.getItem('Menu')
      console.log(menu)
    }, [Menu]);
    
    useEffect(() => {
      if(load){
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
    }, []);

    return(
      <div className="main h-full  md:h-screen md:w-full">
        <Helmet>
          <link rel="icon" type="image/png" href="hcdclogo.png" />
        </Helmet>
        {load ? (
          <div className="fixed inset-0 bg-opacity-90 bg-gray-100 backdrop-blur-sm z-50 w-full h-full">
            {/* Content to be displayed when load is true */}
            <SplashScreen />
          </div>
        ) : <div className={`${accessDenied? "absolute inset-0 bg-opacity-90 bg-gray-100  backdrop-blur-sm z-50 w-full h-full":""}`}></div>}
        
        <div className='flex flex-col md:flex-row relative'>
          <div className={`absolute bg-blue-950  md:h-screen ${open ? "md:w-72":"md:w-20"} duration-300 md:p-5 pt-8  relative`}>
            <BsArrowLeftShort className={`bg-white text-blue-950 text-3xl rounded-full md:absolute hidden lg:flex md:-right-3 md:top-9 border border-blue-950 cursor-pointer ${
              !open && "rotate-180"}`}  
            onClick={() => setOpen(!open)}
            />
            <BiMenu className={` text-white text-3xl absolute flex lg:hidden right-3 top-5 cursor-pointer`}  
            onClick={() => setOpen(!open)}
            />
            
            <div className='md:inline-flex -mt-5 mb-5 ml-5 md:-mt-0 md:mb-0 md:ml-0 md:pt-2 '>
              <img src='hcdclogo.png' className={` bg-red-700 rounded mr-2 cursor-pointer block float-left md:w-9 md:h-10  h-12 w-10 duration-500 ${
                !open && "rotate-[360deg]"}`}/>
              <h1 className={`text-white pt-2 origin-left text-lg  font-medium font-montserrat duration-300 ${
                !open && "md:scale-0"
                } `}
              >
                  HCDC-SCHOLAR
                  </h1>
            </div>
            {/* SEARCH BAR */}
            {/* <div className={`flex item-center  rounded-md bg-light-white mt-6 ${
              !open ? "px-2.5 mt-4":"px-4"
              } py-2`}> 
              <BsSearch className={`text-white text-lg block float-left cursor-pointer ${
                !open && 'mr-1'} `}/>

              <input 
                type={"search"} 
                placeholder='Search' 
                className={`text-base ml-2 bg-transparent w-full text-white focus:outline-none ${
                  !open && "hidden"
                }`}
              />
            </div> */}
            <div className={`${open?"":"hidden md:block"} `}>
              <ul className='md:pt-7 pt-2 px-5  md:px-0'>
                  {MenuOptions.map((menu, index) => (
                    <>
                      <li key={index} onClick={() => changeMenu(menu.title)}
                    type="button"
                    role='button' className={`${Menu === menu.title ? 'font-medium text-white bg-light-white scale-105 opacity-100' : 'font-normal text-white opacity-80'
                  }text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2  `}>
                        <span className='text-2xl block float-left'> 
                          {menu.icon? menu.icon : <RiDashboardFill/>}
                        </span>
                        <span className={`text-base  font-medium flex-1 ${!open && "hidden"} duration-200`}>{menu.title}</span>
                      </li>
                    </>
                  ))}
              </ul>
            </div> 
            <div className={`text-white md:absolute md:bottom-5 md:left-5 text-base pl-7 md:pl-0 
            ${
              !open ? "w-11 hidden md:block ":"w-56 mb-2 md:mb-0 "
              } 
              gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md `}
              onClick={Sign_Out}>
              <span className='block float-left mr-3'> 
                <BiLogOut/>
              </span>
              <span className={`font-medium flex-1 ${!open && "hidden"} duration-200`}>Logout
              </span>
            </div> 
          </div> 
          <div className={`p-7 w-full max-h-[629px]`}>
            {getMenu()}
          </div>
        </div>  
        <div className='md:hidden'>
          <div className={`fixed z-50 bottom-5 right-5 duration-300 ${openButton?"p-7 rounded-[30px] opacity-100" :"opacity-70"} bg-gradient-to-t from-[#172554] to-[#4B5B8F] p-6 rounded-3xl`}
          onClick={() => {
            setOpenButton(prevState => !prevState);
            setTimeout(() => {
              setOpenButton(false);
            }, 3000);
          }}>
          </div>
          <div className={`fixed ${Menu=="Dashboard"?"z-30":"z-20"}  bottom-8 right-14 bg-blue-950 rounded-bl-3xl rounded-tr-3xl text-white p-3 px-5 duration-300 ${openButton?'rotate-[55deg] block opacity-100':"rotate-[-160deg] scale-0 opacity-0"}  transform origin-right font-montserrat`}
          onClick={() => changeMenu("Dashboard")}>
              Dashboard
          </div>  
          <div className={`fixed ${Menu=="Profile"?"z-30":"z-20"} bottom-8 right-16 bg-blue-950 rounded-bl-3xl rounded-tr-3xl text-white p-3 px-8 duration-300 ${openButton?'rotate-[20deg] block opacity-100':"rotate-[-160deg] scale-0 opacity-0"}  transform origin-right font-montserrat`}
          onClick={() => changeMenu("Profile")}>
              Profile
          </div>
          <div className={`fixed bottom-8 right-[72px] bg-blue-950 rounded-bl-3xl rounded-tr-3xl text-white p-3 px-7 duration-300 ${openButton?'rotate-[-20deg] block opacity-100':"rotate-[-160deg] scale-0 opacity-0"} transform origin-right font-montserrat`}
          onClick={Sign_Out}>
              Logout
          </div>    
        </div>
      </div>         
    )
}

export default Home;