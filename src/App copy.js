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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const sub = async () => {
    const resp = await axios.post('http://localhost:1024', { "ss": 123 })
    console.log(resp.data)
  }

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>

        <div className="App">
          <header className="App-header">
            <div className='NavContainer' style={{ position: 'sticky', top: 0 }}>
              <Navbar style={{ backgroundColor: '#000000a8' }}>
                <NavbarGroup  align={Alignment.LEFT} >
                  <NavbarHeading>
                    <img onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'http://localhost:3000/';
                    }} src={logo} width={65.61} height={40} style={{ marginLeft: 5 }} />
                  </NavbarHeading>
                  <NavbarDivider />
                  
                  <Button size='small' className={Classes.MINIMAL} style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/FridgeIncome';
                  }}>استلام ثلاجه</Button>
                  <Button className={Classes.MINIMAL} style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Fridge';
                  }}>التلاجة</Button>
                  <Button size='small' className={Classes.MINIMAL} style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Workertransaction';
                  }}>الراتب</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/WorkerPayout';
                  }}>اليوميات</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Workers';
                  }}>المقاولين</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Poutcome';
                  }}>صادرات المخزن</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Productexport';
                  }}>تصدير منتج</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/ProductHistory';
                  }}>جرد المخزن</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Vctransaction';
                  }}>ايرادات وصادرات الخزنه</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Pincome';
                  }}>استلام مخزن</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Expenses';
                  }}>المصروفات</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Expensescategory2';
                  }}>اصناف اصناف المصروفات</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Expensescategory';
                  }}>اصناف المصروفات</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Transactions';
                  }}>التحويلات</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/vault';
                  }}>الخزن</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Moneyownertransactions';
                  }}>ايرادات</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Moneyowners';
                  }}>الشركاء</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/Clients';
                  }}>العملاء والموردون</Button>
                  <Button className={Classes.MINIMAL} size='small' style={{ marginRight: 5, fontWeight: '600', color: '#f0f6fc' }} onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3000/products';
                  }}>الاصناف</Button>
                </NavbarGroup>
              </Navbar>
            </div>

            <Routes>
              <Route exact path='/Products' element={< Products />}></Route>
              <Route exact path='/Clients' element={< Clients />}></Route>
              <Route exact path='/Moneyowners' element={< Moneyowners />}></Route>
              <Route exact path='/vault' element={< vault />}></Route>
              <Route exact path='/Transactions' element={< Transactions />}></Route>
              <Route exact path='/Expenses' element={< Expenses />}></Route>
              <Route exact path='/Expensescategory' element={< Expensescategory />}></Route>
              <Route exact path='/Expensescategory2' element={< Expensescategory2 />}></Route>
              <Route exact path='/Pincome' element={< Pincome />}></Route>
              <Route exact path='/Vctransaction' element={< Vctransaction />}></Route>
              <Route exact path='/ProductHistory' element={< ProductHistory />}></Route>
              <Route exact path='/Poutcome' element={< Poutcome />}></Route>
              <Route exact path='/Workers' element={< Workers />}></Route>
              <Route exact path='/WorkerPayout' element={< WorkerPayout />}></Route>
              <Route exact path='/Fridge' element={< Fridge />}></Route>
              <Route exact path='/FridgeIncome' element={< FridgeIncome />}></Route>
              <Route exact path='/Workertransaction' element={< Workertransaction />}></Route>
              <Route exact path='/Moneyownertransactions' element={< Moneyownertransactions />}></Route>
              <Route exact path='/Productexport' element={< Productexport />}></Route>
            </Routes>
          </header>
        </div >
      </ThemeProvider>
    </Router >

  );
}

export default App;
