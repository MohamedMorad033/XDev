import { useEffect, useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Products from "./screens/products"
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import logo from './static/b2b.png'
import backdrop from './static/backdrop.jpeg'
import Clients from './screens/Clients';
import Vault from './screens/vault';
import Transactions from './screens/Transactions';
import Expenses from './screens/Expenses';
import Expensescategory from './screens/Expensescategory';
import Expensescategory2 from './screens/Expensescategory2';
import Pincome from './screens/Pincome';
import Vctransaction from './screens/Vctransaction';
import ProductHistory from './screens/ProductHistory';
import Poutcome from './screens/poutcome';
import Workers from './screens/Workers';
import WorkerPayout from './screens/WorkerPayout';
import Fridge from './screens/Fridge';
import FridgeIncome from './screens/FridgeIncome';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, ConfigProvider, theme } from 'antd';

import {
  Alignment,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
} from "@blueprintjs/core";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Workertransaction from './screens/Workertransaction';
import Moneyowners from './screens/Moneyowners';
import Moneyownertransactions from './screens/Moneyownertransactions';
import Productexport from './screens/Productexport';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Productimport from './screens/Productimport';
import Plink from './screens/Plink';
import Finalimport from './screens/Finalimport';
import Summery from './screens/Summery';
import Productexportreturn from './screens/Productexportreturn';
import Productexportauto from './screens/Productexportauto';
import ProductReturn from './screens/ProductReturn';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, TextField, Tooltip } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Star, InsertDriveFile, Print, PersonAdd, Settings, Logout, LightMode, DarkMode, Widgets } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ClientM from './screens/ClientM';
import VaultSummery from './screens/VaultSummery';
import ClientAdvance from './screens/ClientAdvance';
import Productincomereturn from './screens/Productincomereturn';
import Productsmerge from './screens/Productsmerge';
import WorkerAdvance from './screens/WorkerAdvance';
import FrigeItems from './screens/FrigeItems';
import ProductIncomeReturnHistory from './screens/ProductIncomeReturnHistory';
import ProductTypes from './screens/ProductTypes';
import FinalExport from './screens/FinalExport';
import FinalExportHistory from './screens/FinalExportHistory';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  }
});



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value == index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ width: '100%' }}>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [connected, setconnected] = useState(true);
  const ping = () => {
    axios.get('http://localhost:1024/ping').then((resp) => {
      setconnected(true);
      setTimeout(() => {
        ping()
      }, 3000);
    }).catch((e) => {
      console.log(e)
      setconnected(false)
      setTimeout(() => {
        ping()
      }, 3000);
    })
  }

  const [AccesToken, setAccesToken] = useState('');
  useEffect(() => {
    ping()
    const AccesToken = localStorage.getItem('AccesToken');
    if (AccesToken) {
      setAccesToken(localStorage.getItem('AccesToken'));
    } else {
      localStorage.setItem('AccesToken', '')
      setAccesToken(localStorage.getItem('AccesToken'))
    }
  }, []);
  return (
    <>
      <div style={{
        position: 'absolute',
        width: '100%',
        backgroundColor: '#00000055',
        backdropFilter: 'blur(13px)',
        display: connected ? 'none' : 'flex',
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <div>
          <Typography color={'#ff2424'} variant='h6'>
            Couldn't Connect to Server!
          </Typography>
          <Typography color={'#fff'} marginTop={2} variant='h6'>
            Trying To Reconnect...
          </Typography>
        </div>
      </div>
      {
        AccesToken !== '' ? <Home /> : <LoginScreen />
      }
    </>
  )
}



const LoginScreen = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const login = (email, password) => {
    if (!email | !password) {
      alert('invalid credentials')
      return
    }
    axios.post('http://localhost:1024/login', { email, password }).then((resp) => {
      console.log(resp.data)
      if (resp.data.status == 400) {
        alert('invalid credentials')
        return
      }
      if (resp.data.status == 200) {
        localStorage.setItem('AccesToken', resp.data.logindetails.accesstoken);
        localStorage.setItem('UserName', resp.data.logindetails.username);
        window.location.reload()
      }
    })
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${backdrop})`,
          backgroundColor: '#232325'
        }}>
          <div style={{
            display: 'flex',
            backgroundColor: '#000',
            width: '90%',
            height: '90%',
            flexDirection: 'row',
            borderRadius: 10
          }}>
            <div style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ width: '100%' }}>
                <img src={logo} width={157.43119266055} height={60} style={{ margin: 10 }}></img>
              </div>
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ width: '50%' }}>
                  <Typography style={{ marginBottom: 15 }} color={'#5c83dc'} variant='h4' >
                    Welcome Back
                  </Typography>
                  <Typography style={{ marginBottom: 15 }} color={'#5c83dcc4'} variant='body2' >
                    Welcome Back Please Enter Your credentials
                  </Typography>
                </div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  size='small'
                  style={{ width: '50%', marginBottom: 15 }}
                  label="Email Adress"
                  type="text"
                  value={email}
                  onChange={(e) => { setemail(e.target.value) }}
                  variant="outlined"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  size='small'
                  style={{ width: '50%', marginBottom: 30 }}
                  label="Password"
                  type="text"
                  value={password}
                  onChange={(e) => { setpassword(e.target.value) }}
                  variant="outlined"
                />
                <Button
                  type='primary'
                  style={{ width: '50%' }}
                  onClick={() => {
                    login(email, password);

                  }}
                >Login</Button>
              </div>
              <div style={{ width: '100%' }}>
                <Typography style={{ margin: 5 }} color={'#777777'} variant='subtitle2' >
                  © Mohamed Aymen 2023
                </Typography>
              </div>
            </div>
            <div className='logindiv' style={{ width: '50%', borderRadius: 10, backgroundColor: '#00000017', height: '100%', justifyContent: 'center', display: 'flex' }}>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </ThemeProvider>
  )
}
function Home() {
  const [value, setValue] = useState(0);
  const [AccesToken, setAccesToken] = useState('');
  const [UserName, setUserName] = useState(localStorage.getItem('UserName'));
  const inittheme = localStorage.getItem('Theme');
  const [dark_theme_en, set_dark_theme_en] = useState(inittheme);
  const [title, settitle] = useState('اكواد الاصناف')
  const pinga = () => {
    axios.post('http://localhost:1024/pinga', { AccesToken: localStorage.getItem('AccesToken') }).then((resp) => {
      if (resp.data.status == 200) {
        setTimeout(() => {
          pinga()
        }, 3000);
      } else {
        localStorage.setItem('AccesToken', '')
        window.location.reload()
      }
    }).catch((e) => {
      console.log(e)
      setTimeout(() => {
        pinga()
      }, 3000);
    })
  }
  useEffect(() => {
    const AccesToken = localStorage.getItem('AccesToken');
    if (AccesToken) {
      setAccesToken(AccesToken);
    }
    const Theme = localStorage.getItem('Theme');
    if (!Theme) {
      localStorage.setItem('Theme', 'light')
    }
    if (Theme == 'dark' || Theme == 'light') {
      updatetheme(Theme);
    } else {
      localStorage.setItem('Theme', 'light')
      updatetheme('light')
    }
    pinga()

  }, []);

  const updatetheme = (theme) => {
    if (theme == 'dark') {
      set_dark_theme_en('dark')
      document.documentElement.style.setProperty('--firstcolor', '#0c0c0c');
      document.documentElement.style.setProperty('--seconscolor', '#0c0c0c');
      document.documentElement.style.setProperty('--headercolor', '#23282e18');
    } else
      if (theme == 'light') {
        set_dark_theme_en('light')
        document.documentElement.style.setProperty('--firstcolor', '#ffffff');
        document.documentElement.style.setProperty('--seconscolor', '#c1c1c1');
        document.documentElement.style.setProperty('--headercolor', '#89898918');
      }
      else {
        alert('error in theme manager')
      }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [naven, setnaven] = useState(false)
  const [codesen, setcodesen] = useState(false);
  const [transen, settransen] = useState(false);
  const [histren, sethistren] = useState(false);
  const [operaen, setoperaen] = useState(false);
  const [reprten, setreprten] = useState(false);
  const [settgen, setsettgen] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    updatetheme(dark_theme_en);
  }, [dark_theme_en])
  return (
    <ThemeProvider theme={dark_theme_en == 'light' ? lightTheme : darkTheme}>
      <ConfigProvider
        theme={{
          algorithm: dark_theme_en == 'light' ?
            theme.defaultAlgorithm
            :
            theme.darkAlgorithm
        }}
      >
        <header className="App-header">
          <div style={{ width: '100%' }}>
            <Drawer open={naven} anchor='left' onClose={() => { setnaven(false) }}>
              <List
                sx={{ width: 400, maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Navigation
                  </ListSubheader>
                }
              >
                <ListItemButton onClick={() => {
                  setcodesen(!codesen)
                }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="الاكواد" />
                  {codesen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={codesen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>


                    <ListItemButton onClick={() => {
                      settitle("اكواد الاصناف")
                      setValue(0)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 0 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الاصناف" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("اكواد الاوزان")
                      setValue(33)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 33 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الاوزان" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("اكواد العملاء والموردين")
                      setValue(1)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {value == 1 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="العملاء والموردين" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("اكواد الشركاء")
                      setValue(2)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {value == 2 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الشركاء" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("اكواد الخزن")
                      setValue(4)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {value == 4 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الخزن" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("اكواد المقاولين")
                      setValue(17)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {value == 17 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="المقاولين" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("اكواد اصناف المصروفات")
                      setValue(6)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {value == 6 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="اصناف المصروفات" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("اكواد اصناف اصناف المصروفات")
                      setValue(7)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {value == 7 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="اصناف اصناف المصروفات" />
                    </ListItemButton>

                  </List>
                </Collapse>








                <ListItemButton onClick={() => {
                  settransen(!transen)
                }}>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="التحويلات" />
                  {transen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={transen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>


                    <ListItemButton onClick={() => {
                      settitle("تحويلات الخزن")
                      setValue(5)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 5 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="تحويلات الخزن" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("تحويلات العملاء والموردين")
                      setValue(10)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 10 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="تحويلات العملاء والموردين" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("مستحقات العملاء والموردين")
                      setValue(27)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 27 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="مستحقات العملاء والموردين" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("تحويلات الشركاء")
                      setValue(3)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 3 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="تحويلات الشركاء" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("تحويلات المصروفات")
                      setValue(8)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 8 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="تحويلات المصروفات" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("تحويلات المقاولين")
                      setValue(19)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 19 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="تحويلات المقاولين" />
                    </ListItemButton>
                  </List>
                </Collapse>






                <ListItemButton onClick={() => {
                  sethistren(!histren)
                }}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary="الجرد" />
                  {histren ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={histren} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>


                    <ListItemButton onClick={() => {
                      settitle("جرد الاستلامات")
                      setValue(11)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 11 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الاستلامات" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("جرد الصرف")
                      setValue(16)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 16 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الصرف" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("جرد الثلاجه")
                      setValue(21)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 21 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الثلاجه" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("جرد الصادرات")
                      setValue(36)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 36 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الصادرات" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("جرد مرتجع المشتريات")
                      setValue(34)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 34 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="مرتجع المشتريات" />
                    </ListItemButton>
                  </List>
                </Collapse>




                <ListItemButton onClick={() => {
                  setoperaen(!operaen)
                }}>
                  <ListItemIcon>
                    <PlaylistAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="العمليات" />
                  {operaen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={operaen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>


                    <ListItemButton onClick={() => {
                      settitle("اضافة مخزن")
                      setValue(13)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 13 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="اضافة مخزن" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("صرف مخزن")
                      setValue(25)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 25 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="صرف مخزن" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("استلام خام")
                      setValue(23)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 23 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="استلام خام" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("تصدير")
                      setValue(35)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 35 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="تصدير" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("اليوميات")
                      setValue(18)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 18 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="اليوميات" />
                    </ListItemButton>

                    <ListItemButton disabled onClick={() => {
                      settitle("صرف يدوى")
                      setValue(12)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 12 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="صرف يدوى" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("ربط الاصناف")
                      setValue(20)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 20 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="ربط الاصناف" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("مرتجع مبيعات")
                      setValue(26)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 26 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="مرتجع مبيعات" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("مرتجع مشتريات")
                      setValue(30)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 30 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="مرتجع مشتريات" />
                    </ListItemButton>
                  </List>
                </Collapse>





                <ListItemButton onClick={() => {
                  setreprten(!reprten)
                }}>
                  <ListItemIcon>
                    <Print />
                  </ListItemIcon>
                  <ListItemText primary="التقارير" />
                  {reprten ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={reprten} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>


                    <ListItemButton onClick={() => {
                      settitle("تقرير العملاء والاصناف")
                      setValue(24)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 24 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="العملاء والاصناف" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("تقرير الخزن")
                      setValue(28)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 28 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="الخزن" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("تقرير العملاء")
                      setValue(29)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 29 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="العملاء" />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                      settitle("تقرير المقاولين")
                      setValue(32)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 32 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="المقاولين" />
                    </ListItemButton>

                  </List>


                </Collapse>






                <ListItemButton onClick={() => {
                  setsettgen(!settgen)
                }}>
                  <ListItemIcon>
                    <Widgets />
                  </ListItemIcon>
                  <ListItemText primary="تعديلات" />
                  {settgen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={settgen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>


                    <ListItemButton disabled onClick={() => {
                      settitle("دمج الاصناف")
                      setValue(31)
                    }} sx={{ pl: 4 }}>
                      <ListItemIcon color='#aaaaaa'>
                        {value == 31 ? <Star color='primary' /> : <StarBorder />}
                      </ListItemIcon>
                      <ListItemText primary="دمج الاصناف" />
                    </ListItemButton>



                  </List>
                </Collapse>
              </List>
              <Divider />
            </Drawer>
            <div style={{ backgroundColor: 'var(--headercolor)', width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <img onClick={(e) => {
                setnaven(true)
              }} src={logo} width={157.43119266055} height={60} style={{ margin: -7, marginLeft: 5 }}></img>
              <div onClick={() => { }}>
                <Typography color={dark_theme_en == 'dark' ? '#fff' : '#000'}
                  style={{ cursor: 'pointer', marginRight: 20 }} variant='body1'>
                  {title}
                </Typography>
              </div>
              <Tooltip title="Account settings" style={{ marginRight: 10 }}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>{UserName[0]}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> {UserName}
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                  const c = localStorage.getItem('Theme')
                  localStorage.setItem('Theme', c == 'dark' ? 'light' : 'dark')
                  set_dark_theme_en(dark_theme_en == 'light' ? 'dark' : 'light')
                  // window.location.reload()
                }}>
                  <ListItemIcon>
                    {localStorage.getItem('Theme') == 'dark' ?
                      <LightMode fontSize="small" /> :
                      <DarkMode fontSize="small" />
                    }
                  </ListItemIcon>
                  {localStorage.getItem('Theme') == 'dark' ? 'Light Theme' : 'Dark Theme'}
                </MenuItem>
                <MenuItem onClick={() => {
                  localStorage.setItem('AccesToken', '')
                  window.location.reload()
                }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
            {value == 0 ?
              <Products />
              : null}
            {value == 1 ?
              <Clients />
              : null}
            {value == 2 ?
              <Moneyowners />
              : null}
            {value == 3 ?
              <Moneyownertransactions />
              : null}
            {value == 4 ?
              <Vault />
              : null}
            {value == 5 ?
              <Transactions />
              : null}
            {value == 6 ?
              <Expensescategory />
              : null}
            {value == 7 ?
              <Expensescategory2 />
              : null}
            {value == 8 ?
              <Expenses />
              : null}
            {value == 9 ?
              <Pincome />
              : null}
            {value == 10 ?
              <Vctransaction />
              : null}
            {value == 11 ?
              <ProductHistory />
              : null}
            {value == 12 ?
              <Productexport />
              : null}
            {value == 13 ?
              <Productimport />
              : null}
            {value == 14 ?
              <Productexportreturn />
              : null}
            {value == 15 ?
              <Productimport />
              : null}
            {value == 16 ?
              <Poutcome />
              : null}
            {value == 17 ?
              <Workers />
              : null}
            {value == 18 ?
              <WorkerPayout />
              : null}
            {value == 19 ?
              <Workertransaction />
              : null}
            {value == 20 ?
              <Plink />
              : null}
            {value == 21 ?
              <Fridge />
              : null}
            {value == 22 ?
              <FridgeIncome />
              : null}
            {value == 23 ?
              <Finalimport />
              : null}
            {value == 24 ?
              <Summery />
              : null}
            {value == 25 ?
              <Productexportauto />
              : null}
            {value == 26 ?
              <ProductReturn />
              : null}
            {value == 27 ?
              <ClientM />
              : null}
            {value == 28 ?
              <VaultSummery />
              : null}
            {value == 29 ?
              <ClientAdvance />
              : null}
            {value == 30 ?
              <Productincomereturn />
              : null}
            {value == 31 ?
              <Productsmerge />
              : null}
            {value == 32 ?
              <WorkerAdvance />
              : null}
            {value == 33 ?
              <ProductTypes />
              : null}
            {value == 34 ?
              <ProductIncomeReturnHistory />
              : null}
            {value == 35 ?
              <FinalExport />
              : null}
            {value == 36 ?
              <FinalExportHistory />
              : null}

          </div>
        </header>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;




