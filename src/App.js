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
import Button from '@mui/material/Button';
import Finalimport from './screens/Finalimport';
import Summery from './screens/Summery';
import Productexportreturn from './screens/Productexportreturn';
import Productexportauto from './screens/Productexportauto';
import ProductReturn from './screens/ProductReturn';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Star, InsertDriveFile, Print } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ClientM from './screens/ClientM';
import VaultSummery from './screens/VaultSummery';
import ClientAdvance from './screens/ClientAdvance';
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
  const [value, setValue] = useState(0);
  const [AccesToken, setAccesToken] = useState([]);
  const [dark_theme_en, set_dark_theme_en] = useState('light')
  const [title, settitle] = useState('اكواد الاصناف')
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
  }, []);

  const updatetheme = (theme) => {
    if (theme == 'dark') {
      set_dark_theme_en('dark')
      document.documentElement.style.setProperty('--firstcolor', '#000000');
      document.documentElement.style.setProperty('--seconscolor', '#1f1f1f');
      document.documentElement.style.setProperty('--headercolor', '#00000018');
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
  return (
    <ThemeProvider theme={dark_theme_en == 'light' ? lightTheme : darkTheme}>
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
              <ListItemButton onClick={() => { setcodesen(!codesen) }}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="الاكواد" />
                {codesen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={codesen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>


                  <ListItemButton onClick={() => { setValue(0) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 0 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="الاصناف" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(1) }} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {value == 1 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="العملاء والموردين" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(2) }} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {value == 2 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="الشركاء" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(4) }} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {value == 4 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="الخزن" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(17) }} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {value == 17 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="المقاولين" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(6) }} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {value == 6 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="اصناف المصروفات" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(7) }} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      {value == 7 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="اصناف اصناف المصروفات" />
                  </ListItemButton>

                </List>
              </Collapse>








              <ListItemButton onClick={() => { settransen(!transen) }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="التحويلات" />
                {transen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={transen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>


                  <ListItemButton onClick={() => { setValue(5) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 5 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="تحويلات الخزن" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(10) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 10 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="تحويلات العملاء والموردين" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(27) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 27 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="مستحقات العملاء والموردين" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(3) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 3 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="تحويلات الشركاء" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(8) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 8 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="تحويلات المصروفات" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(19) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 19 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="تحويلات المقاولين" />
                  </ListItemButton>
                </List>
              </Collapse>






              <ListItemButton onClick={() => { sethistren(!histren) }}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText primary="الجرد" />
                {histren ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={histren} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>


                  <ListItemButton onClick={() => { setValue(11) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 11 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="الاستلامات" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(16) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 16 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="الصرف" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(21) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 21 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="الثلاجه" />
                  </ListItemButton>
                </List>
              </Collapse>




              <ListItemButton onClick={() => { setoperaen(!operaen) }}>
                <ListItemIcon>
                  <PlaylistAddIcon />
                </ListItemIcon>
                <ListItemText primary="العمليات" />
                {operaen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={operaen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>


                  <ListItemButton onClick={() => { setValue(13) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 13 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="اضافة مخزن" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(25) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 25 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="صرف مخزن" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(23) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 23 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="استلام خام" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(18) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 18 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="اليوميات" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(12) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 12 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="صرف يدوى" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(20) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 20 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="ربط الاصناف" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(26) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 26 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="مرتجع مبيعات" />
                  </ListItemButton>
                </List>
              </Collapse>





              <ListItemButton onClick={() => { setreprten(!reprten) }}>
                <ListItemIcon>
                  <Print />
                </ListItemIcon>
                <ListItemText primary="التقارير" />
                {reprten ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={reprten} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>


                  <ListItemButton onClick={() => { setValue(24) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 24 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="العملاء والاصناف" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(28) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 28 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="الخزن" />
                  </ListItemButton>

                  <ListItemButton onClick={() => { setValue(29) }} sx={{ pl: 4 }}>
                    <ListItemIcon color='#aaaaaa'>
                      {value == 29 ? <Star color='primary' /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemText primary="العملاء" />
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
              <Typography color={localStorage.getItem('Theme') == 'dark' ? '#fff' : '#000'}
                style={{ cursor: 'pointer', marginRight: 20 }} variant='body1'>
                {title}
              </Typography>
            </div>
            <div onClick={() => {
              const c = localStorage.getItem('Theme')
              localStorage.setItem('Theme', c == 'dark' ? 'light' : 'dark')
              window.location.reload()
            }}>
              <Typography color={localStorage.getItem('Theme') == 'dark' ? '#fff' : '#000'}
                style={{ cursor: 'pointer', marginRight: 20 }} variant='body1'>
                {localStorage.getItem('Theme') == 'dark' ? 'Dark Theme 🌚' : 'Light Theme 🌞'}
              </Typography>
            </div>
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

        </div>
      </header>
    </ThemeProvider>
  );
}

export default App;




