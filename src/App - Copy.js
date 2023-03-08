import { useState } from 'react';
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
import vault from './screens/vault';
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
import {
  Alignment,
  Button,
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
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [naven, setnaven] = useState(false)
  return (
    <ThemeProvider theme={darkTheme}>
      <header className="App-header">
        <div style={{ width: '100%' }}>
          <Drawer open={naven} anchor='left' onClose={() => { setnaven(false) }}>
            <Tab wrapped label="الاصناف" onClick={() => { setValue(0) }} />
            <Tab wrapped label="العملاء والموردين" onClick={() => { setValue(1) }} />
            <Tab wrapped label="الشركاء" onClick={() => { setValue(2) }} />
            <Tab wrapped label="ايرادات الشركاء" onClick={() => { setValue(3) }} />
            <Tab wrapped label="الخزن" onClick={() => { setValue(4) }} />
            <Tab wrapped label="التحويلات" onClick={() => { setValue(5) }} />
            <Tab wrapped label="اصناف المصروفات" onClick={() => { setValue(6) }} />
            <Tab wrapped label="اصناف اصناف المصروفات" onClick={() => { setValue(7) }} />
            <Tab wrapped label="المصروفات" onClick={() => { setValue(8) }} />
            <Tab wrapped label="استلام المخزن" onClick={() => { setValue(9) }} />
            <Tab wrapped label="ايرادات وصادرات الخزنه" onClick={() => { setValue(10) }} />
            <Tab wrapped label="جرد المخزن" onClick={() => { setValue(11) }} />
            <Tab wrapped label="تصدير منتج" onClick={() => { setValue(12) }} />
            <Tab wrapped label="استلام منتج" onClick={() => { setValue(13) }} />
            <Tab wrapped label="مرتجع مبيعات" onClick={() => { setValue(14) }} />
            <Tab wrapped label="مرتجع مشتريات" onClick={() => { setValue(15) }} />
            <Tab wrapped label="صادرات المخزن" onClick={() => { setValue(16) }} />
            <Tab wrapped label="المقاولين" onClick={() => { setValue(17) }} />
            <Tab wrapped label="اليوميات" onClick={() => { setValue(18) }} />
            <Tab wrapped label="الراتب" onClick={() => { setValue(19) }} />
            <Tab wrapped label="ربط الاصناف" onClick={() => { setValue(20) }} />
            <Tab wrapped label="الثلاجه" onClick={() => { setValue(21) }} />
            <Tab wrapped label="استلام الثلاجه" onClick={() => { setValue(22) }} />
            <Tab wrapped label="استلام منتج نهائي" onClick={() => { setValue(23) }} />
            <Tab wrapped label="تقارير العملاء والاصناف" onClick={() => { setValue(24) }} />
            <Tab wrapped label="تصدير اوتوماتيك" onClick={() => { setValue(25) }} />
            <Tab wrapped label="مرتجع مبيعات" onClick={() => { setValue(26) }} />
          </Drawer>
          <img onClick={(e) => {
            setnaven(true)
          }} src={logo} width={65.61} height={40} style={{ margin: 5 }} />





          {/* <Tabs variant="scrollable" scrollButtons='auto' allowScrollButtonsMobile value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab wrapped label="الاصناف" {...a11yProps(0)} />
                <Tab wrapped label="العملاء والموردين" {...a11yProps(1)} />
                <Tab wrapped label="الشركاء" {...a11yProps(2)} />
                <Tab wrapped label="ايرادات الشركاء" {...a11yProps(3)} />
                <Tab wrapped label="الخزن" {...a11yProps(4)} />
                <Tab wrapped label="التحويلات" {...a11yProps(5)} />
                <Tab wrapped label="اصناف المصروفات" {...a11yProps(6)} />
                <Tab wrapped label="اصناف اصناف المصروفات" {...a11yProps(7)} />
                <Tab wrapped label="المصروفات" {...a11yProps(8)} />
                <Tab wrapped label="استلام المخزن" {...a11yProps(9)} />
                <Tab wrapped label="ايرادات وصادرات الخزنه" {...a11yProps(10)} />
                <Tab wrapped label="جرد المخزن" {...a11yProps(11)} />
                <Tab wrapped label="تصدير منتج" {...a11yProps(12)} />
                <Tab wrapped label="استلام منتج" {...a11yProps(13)} />
                <Tab wrapped label="مرتجع مبيعات" {...a11yProps(14)} />
                <Tab wrapped label="مرتجع مشتريات" {...a11yProps(15)} />
                <Tab wrapped label="صادرات المخزن" {...a11yProps(16)} />
                <Tab wrapped label="المقاولين" {...a11yProps(17)} />
                <Tab wrapped label="اليوميات" {...a11yProps(18)} />
                <Tab wrapped label="الراتب" {...a11yProps(19)} />
                <Tab wrapped label="ربط الاصناف" {...a11yProps(20)} />
                <Tab wrapped label="الثلاجه" {...a11yProps(21)} />
                <Tab wrapped label="استلام الثلاجه" {...a11yProps(22)} />
                <Tab wrapped label="استلام منتج نهائي" {...a11yProps(23)} />
                <Tab wrapped label="تقارير العملاء والاصناف" {...a11yProps(24)} />
                <Tab wrapped label="تصدير اوتوماتيك" {...a11yProps(25)} />
                <Tab wrapped label="مرتجع مبيعات" {...a11yProps(26)} />
              </Tabs> */}
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
            <vault />
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

        </div>
      </header>
    </ThemeProvider>
  );
}

export default App;
