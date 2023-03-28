import React, { useEffect, useState, useRef } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem'
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import { Checkbox, InputGroup, NumericInput, Overlay } from '@blueprintjs/core';
import Modal from '@mui/material/Modal'
import ReactToPrint from 'react-to-print';
import logo from './../static/b2b.png'
import Refresh from '@mui/icons-material/RefreshRounded'
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete'
import DataTable, { createTheme } from 'react-data-table-component';


const mesures = [
    {
        value: 'unit',
        label: 'Units',
    },
    {
        value: 'kg',
        label: 'Kg',
    },
    {
        value: 'M',
        label: 'Meter',
    },
    {
        value: 'm2',
        label: 'Meter Square',
    },
];
const ExpandedComponent = ({ data }) => <div>{JSON.stringify(data, null, 2)}</div>;
const updatetheme = (theme) => {
    if (theme == 'dark') {
        document.documentElement.style.setProperty('--firstcolor', '#23282e');
        document.documentElement.style.setProperty('--seconscolor', '#16161e');
        document.documentElement.style.setProperty('--headercolor', '#23282e18'); createTheme('newtheme', {

            text: {
                primary: '#fff',
                secondary: '#eee',
            },
            background: {
                default: '#000000a8',
            },
            context: {
                background: 'rgba(0,0,0,0.9)',

                text: '#FFFFFF',
            },
            divider: {
                default: '#424242',
            },
            action: {
                button: 'rgba(0,0,0,.54)',
                hover: 'rgba(0,0,0,.08)',
                disabled: 'rgba(0,0,0,.12)',
            },
        }, 'dark');
    } else
        if (theme == 'light') {
            document.documentElement.style.setProperty('--firstcolor', '#ffffff');
            document.documentElement.style.setProperty('--seconscolor', '#c1c1c1');
            document.documentElement.style.setProperty('--headercolor', '#89898918'); createTheme('newtheme', {
                text: {
                    primary: '#000',
                    secondary: '#333',
                },
                background: {
                    default: '#ffffffa8',
                },
                context: {
                    background: 'rgba(255,255,255,0.9)',

                    text: '#FFFFFF',
                },
                divider: {
                    default: '#424242',
                },
                action: {
                    button: 'rgba(255,255,255,.54)',
                    hover: 'rgba(255,255,255,.08)',
                    disabled: 'rgba(255,255,255,.12)',
                },
            }, 'light');
        }
        else {
            alert('error in theme manager')
            localStorage.setItem('Theme', 'light')
        }
}

updatetheme(localStorage.getItem('Theme'))
function FrigeItems() {
    const componentRef = useRef();

    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);

    const [rows, setrows] = useState([
    ]);
    const [editrn, seteditrn] = useState(false)
    const [selected, setelected] = useState(
    )
    const columns = [
        {
            name: 'م',
            selector: row => row.id,
            sortable: true,
            style: {
                backgroundColor: 'rgba(255, 70, 70, 1)',
                textAlign: 'center'
            },
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
            width: "55px"                       // another for example
        },
        {
            name: 'اسم الصنف',
            selector: row => row.to,
            sortable: true,
            size: 20
        },
        {
            name: 'الكمية',
            selector: row => row.amount,
            sortable: true,

        },
    ];


    useEffect(() => {
        axios.get('http://localhost:1024/fridge').then((resp) => {
            setrows(resp.data.products); setnewcode(resp.data.products.length + 1);
        })
    }, [])
    const [sel, setsel] = useState('unit')
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [amount, setamount] = useState('')
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)




    const [newsel, setnewsel] = useState('unit')
    const [newname, setnewname] = useState('')
    const [newprice, setnewprice] = useState('0')
    const [newamount, setnewamount] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')


    const editsubmit = () => {
        setloadrn(true)
        axios.post('http://localhost:1024/editproduct', { name, price, amount, code, selid, sel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/products').then((resp) => { setrows(resp.data.products) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const createnew = () => {
        if (!newname) {
            alert('name cannot be empty')
            return
        }
        if (newamount === '') {
            alert('please enter an amount')
            return
        }
        if (newcode === '') {
            alert('please enter a code')
            return
        }
        if (newprice === '') {
            alert('please enter a price')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addproduct', { name: newname, price: newprice, amount: newamount, code: newcode, selectmode: newsel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                setnewcode(newcode + 1)
                setnewamount(0)
                setnewname('')
                setnewprice(0)
                axios.get('http://localhost:1024/products').then((resp) => { setrows(resp.data.products) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }



    const search = (text) => {
        setsearchload(true)
        axios.post('http://localhost:1024/searchfridge', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://localhost:1024/fridge').then((resp) => { setrows(resp.data.products) })

            }
        })
    }


    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => {
                axios.post('http://localhost:1024/deleteproduct', { deleteproduct: selectedRows }).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data)
                        setrows([])
                        setrows(resp.data.products)
                    } else {
                        alert('failed')
                        axios.get('http://localhost:1024/fridge').then((resp) => { setrows(resp.data.products) })

                    }
                })
            }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                axios.post('http://localhost:1024/print/lots', { rows: rows }).then((resp) => {
                    setTimeout(() => {
                        window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                    }, 500);
                })
            }}>print</Button>
        </>
    );

    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [selectedRows, setselectedRows] = useState([])
    const [data, setdata] = useState('')

    const [newdata, setnewdata] = useState({})
    const [newloss, setnewloss] = useState(0)

    const [prt, setprt] = useState(false)
    const [refreshloading, setrefreshloading] = useState(false)
    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginTop: 10, alignItems: 'baseline', width: '100%', justifyContent: 'end' }}>
                    <TextField
                        style={{ marginLeft: 20 }}
                        vault
                        margin="dense"
                        id="search"
                        label="search"
                        type="text"
                        value={searchtext}
                        size='small'
                        onChange={(e) => { setsearchtext(e.target.value); search(e.target.value) }}
                        variant="outlined"
                    />
                    <Button style={{ marginLeft: 20 }} disabled={searchload} variant='contained' color='error' onClick={() => {
                        setsearchtext(''); axios.get('http://localhost:1024/fridge').then((resp) => { setrows(resp.data.products) })
                    }}>Clear</Button>
                    <Button style={{ marginLeft: 20 }} variant='contained' color='success' onClick={() => {
                        axios.post('http://localhost:1024/print/fridgesum', {}).then((resp) => {
                            setTimeout(() => {
                                window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                            }, 500);
                        })
                    }}>Print</Button>

                </div>
            </div>
            <div style={{ width: '100%' }}>
                <DataTable
                    pagination
                    dense
                    paginationPerPage={100}
                    highlightOnHover
                    pointerOnHover
                    fixedHeader
                    fixedHeaderScrollHeight='350px'
                    selectableRowsHighlight
                    direction="rtl"
                    onSelectedRowsChange={(rows) => {
                        setselectedRows(rows.selectedRows);
                        setdata(rows);
                        console.log(rows.selectedRows)
                        var sum = 0
                        var asum = 0
                        rows.selectedRows.forEach(function (value, index, arry) {
                            sum += value.totalprice;
                        });
                        rows.selectedRows.forEach(function (value, index, arry) {
                            asum += value.amount;
                        });
                        settotalamount(asum)
                        settotalprice(sum)
                    }}
                    theme='newtheme'
                    selectableRowsComponent={Checkbox}
                    columns={columns}
                    data={rows}
                    onRowDoubleClicked={(data) => { seteditrn(false); setelected(data); console.log(data); setcode(data.code); setamount(data.quantity); setname(data.name); setprice(data.price); setsel(mesures[data.wayofmesure].value); setselid(data.id) }}
                />
            </div>
            <Dialog open={editrn}>
                <DialogTitle>Edit A Product</DialogTitle>
                <DialogContent>

                    <TextField
                        vault
                        margin="dense"
                        id="code"
                        label="code"
                        type="number"
                        value={code}
                        onChange={(e) => { setcode(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <Select
                        label="Way of Mesure"
                        variant='standard'
                        fullWidth
                        value={sel}
                        onChange={(e) => { setsel(e.target.value) }}
                    >
                        {mesures.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        vault
                        margin="dense"
                        id="name"
                        label="product name"
                        type="text"
                        value={name}
                        onChange={(e) => { setname(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        vault
                        margin="dense"
                        id="Amount"
                        label="Amount"
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{sel}</InputAdornment>,
                        }}
                        value={amount}
                        onChange={(e) => { setamount(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        vault
                        margin="dense"
                        id="Price"
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => { setprice(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >Cancel</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { editsubmit() }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default FrigeItems