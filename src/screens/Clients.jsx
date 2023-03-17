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
import { Checkbox, Overlay } from '@blueprintjs/core';
import Modal from '@mui/material/Modal'
import ReactToPrint from 'react-to-print';
import logo from './../static/b2b.png'
import Refresh from '@mui/icons-material/RefreshRounded'
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete'
import DataTable, { createTheme } from 'react-data-table-component';
import { Print } from '@mui/icons-material';

const mesures = [
    {
        value: 'seller',
        label: 'مورد',
    },
    {
        value: 'buyer',
        label: 'عميل',
    },
    {
        value: 'both',
        label: 'عميل و مورد',
    },
];
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
const updatetheme = (theme) => {
    if (theme == 'dark') {
        document.documentElement.style.setProperty('--firstcolor', '#000000');
        document.documentElement.style.setProperty('--seconscolor', '#1f1f1f');
        document.documentElement.style.setProperty('--headercolor', '#00000018'); createTheme('newtheme', {

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
            localStorage.setItem('Theme','light')
        }
}

updatetheme(localStorage.getItem('Theme'))
function Clients() {
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
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
            width: "55px"                       // another for example

        },
        {
            name: 'الاسم',
            selector: row => row.name,
            sortable: true,
            size: 20
        },
        {
            name: 'له',
            selector: row => row.expense.toFixed(2).toString().split('.')[1] == '00' ? row.expense : row.expense.toFixed(2),
            sortable: true,

        },
        {
            name: 'عليه',
            selector: row => row.payment.toFixed(2).toString().split('.')[1] == '00' ? row.payment : row.payment.toFixed(2),
            sortable: true,
        },
        {
            name: 'النوع',
            selector: row => mesures[row.type].label,
            sortable: true,
        },
        {
            name: 'الفرق',
            selector: row => (row.payment - row.expense).toFixed(2).toString().split('.')[1] == '00' ? (row.payment - row.expense) : (row.payment - row.expense).toFixed(2),
            sortable: true,
            width: '130px',
            conditionalCellStyles: [
                {
                    when: row => (row.payment - row.expense) < 0,
                    style: {
                        backgroundColor: 'rgba(255, 70, 70, 1)',
                        color: 'white'
                    }
                },
                {
                    when: row => (row.payment - row.expense) > 0,
                    style: {
                        backgroundColor: 'rgb(70, 255, 103)',
                        color: 'black',
                    }
                },
                {
                    when: row => (row.payment - row.expense) == 0,
                    style: {
                        backgroundColor: 'rgb(255 246 70)',
                        color: 'black',
                    }
                }
            ]
        },
    ];


    const [prt, setprt] = useState(false)





    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)



    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => { }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => { setprt(true) }}>print</Button>
        </>
    );
    const actions = () => (
        <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>

            <TextField
                style={{ marginRight: 20 }}
                autoFocus
                margin="dense"
                id="name"
                size='small'

                label="الاسم"
                type="text"
                value={newname}
                onChange={(e) => { setnewname(e.currentTarget.value) }}
                variant="outlined"
            />
            <Select
                style={{ marginRight: 20 }}
                variant='outlined'
                value={newsel}
                size='small'

                onChange={(e) => { setnewsel(e.target.value) }}
            >
                {mesures.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            <TextField
                style={{ marginRight: 20 }}
                autoFocus
                margin="dense"
                size='small'

                id="expenses"
                label="له"
                type="number"
                value={newexpenses}
                onChange={(e) => { setnewexpenses(e.currentTarget.value) }}
                variant="outlined"
            />
            <TextField
                style={{ marginRight: 20 }}
                autoFocus
                margin="dense"
                id="payments"
                size='small'

                label="عليه"
                type="number"
                value={newpayments}
                onChange={(e) => { setnewpayments(e.currentTarget.value) }}
                variant="outlined"
            />
            <Button size='medium'
                disabled={newloadrn} variant='contained' onClick={() => { createnew() }}>Create</Button>

        </div>


    );





    const [newdata, setnewdata] = useState({})
    const [newloss, setnewloss] = useState(0)



    const conditionalRowStyles = [
        {
            when: row => (row.payment - row.expense) < 0,
            style: {
                backgroundColor: 'rgba(255, 70, 70, 1)',
                color: 'white'
            }
        },
        {
            when: row => (row.payment - row.expense) > 0,
            style: {
                backgroundColor: 'rgb(70, 255, 103)',
                color: 'black',
            }
        },
        {
            when: row => (row.payment - row.expense) == 0,
            style: {
                backgroundColor: 'rgb(255 246 70)',
                color: 'black',
            }
        }
    ]








    useEffect(() => {
        axios.get('http://localhost:1024/clients').then((resp) => {
            setrows(resp.data.clients); setnewcode(resp.data.clients.length + 1);
        })
    }, [])
    const [sel, setsel] = useState('seller')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState('')
    const [payments, setpayments] = useState('')
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)




    const [newsel, setnewsel] = useState('seller')
    const [newname, setnewname] = useState('')
    const [newexpenses, setnewexpenses] = useState('0')
    const [newpayments, setnewpayments] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')


    const editsubmit = () => {
        setloadrn(true)
        axios.post('http://localhost:1024/editclients', { name, expenses, payments, selid: newdata.id, sel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/clients').then((resp) => { setrows(resp.data.clients) })
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
        if (newpayments === '') {
            alert('please enter an payments')
            return
        }
        if (newcode === '') {
            alert('please enter a code')
            return
        }
        if (newexpenses === '') {
            alert('please enter a expenses')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addclients', { name: newname, expenses: newexpenses, payments: newpayments, code: newcode, selectmode: newsel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setnewname('')
                setnewpayments(0)
                setnewexpenses(0)
                setloadrn(false)
                seteditrn(false)
                setnewcode(newcode + 1)
                axios.get('http://localhost:1024/clients').then((resp) => { setrows(resp.data.clients) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }



    const search = (text) => {
        setsearchload(true)
        axios.post('http://localhost:1024/searchclients', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://localhost:1024/clients').then((resp) => { setrows(resp.data.clients) })

            }
        })
    }
    const [selectedRows, setselectedRows] = useState([])
    const [data, setdata] = useState('')
    const [refreshloading, setrefreshloading] = useState(false)
    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'start', flexDirection: 'row' }}>
                <Modal open={prt} onClose={() => { setprt(false) }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ width: '50%' }}>
                                <img onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'http://localhost:3000/';
                                }} src={logo} width={200} height={122} style={{ marginLeft: 5 }} />
                            </div>
                            <div style={{ width: '50%', alignItems: 'center', display: 'flex', justifyContent: 'end' }}>
                                <Typography variant='h2' style={{}}>clients summery</Typography>
                            </div>
                        </div>
                        <div style={{ padding: 50 }}>
                            <Typography variant='h4'>
                                Invoice Date : {new Date().toLocaleDateString()}
                            </Typography>
                        </div>
                        <div style={{ padding: 20, width: '100%' }}>
                            <div style={{ display: 'flex', width: '100%', backgroundColor: '#666' }}>
                                <div class="view w-48 p-4-8" style={{ padding: 4, width: '10%' }}>
                                    <Typography variant='h5' color={'#fff'}>
                                        N.o
                                    </Typography>
                                </div>
                                <div class="view w-48 p-4-8" style={{ padding: 4, width: '48%' }}>
                                    <Typography variant='h5' color={'#fff'}>
                                        Client Name
                                    </Typography>
                                </div>
                                <div class="view w-48 p-4-8" style={{ padding: 4, width: '17%' }}>
                                    <Typography variant='h5' color={'#fff'}>
                                        Type
                                    </Typography>
                                </div>
                                <div class="view w-48 p-4-8" style={{ padding: 4, width: '17%' }}>
                                    <Typography variant='h5' color={'#fff'}>
                                        Differance
                                    </Typography>
                                </div>
                                <div class="view w-48 p-4-8" style={{ padding: 4, width: '18%' }}>
                                    <Typography variant='h5' color={'#fff'}>
                                        Join Date
                                    </Typography>
                                </div>
                            </div>
                            {rows.map((index, i) => {
                                return (
                                    <div style={{ display: 'flex', width: '100%', backgroundColor: '#eee' }}>
                                        <div class="view w-48 p-4-8" style={{ padding: 4, width: '10%' }}>
                                            <Typography variant='h5' color={'#000'}>
                                                {i + 1}
                                            </Typography>
                                        </div>
                                        <div class="view w-48 p-4-8" style={{ padding: 4, width: '48%' }}>
                                            <Typography variant='h5' color={'#000'}>
                                                {index.name}
                                            </Typography>
                                        </div>
                                        <div class="view w-48 p-4-8" style={{ padding: 4, width: '17%' }}>
                                            <Typography variant='h5' color={'#000'}>
                                                {mesures[index.type].label}
                                            </Typography>
                                        </div>
                                        <div class="view w-48 p-4-8" style={{ padding: 4, width: '17%' }}>
                                            <Typography variant='h5' color={'#000'}>
                                                {index.payment - index.expense}
                                            </Typography>
                                        </div>
                                        <div class="view w-48 p-4-8" style={{ padding: 4, width: '18%' }}>
                                            <Typography variant='h5' color={'#000'}>
                                                {new Date(index.time).toLocaleString()}
                                            </Typography>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Modal>
            </div>
            <div style={{ width: '100%', display: 'flex', marginTop: 10, alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginTop: 10, alignItems: 'baseline' }}>
                    <TextField
                        style={{ marginLeft: 40 }}
                        autoFocus
                        margin="dense"
                        id="search"
                        label="search"
                        type="text"
                        value={searchtext}
                        onChange={(e) => { setsearchtext(e.target.value); search(e.target.value) }}
                        variant="standard"
                    />
                    <Button style={{ marginLeft: 20 }} disabled={searchload} variant='contained' color='error' onClick={() => {
                        setsearchtext(''); axios.get('http://localhost:1024/clients').then((resp) => { setrows(resp.data.clients) })
                    }}>Clear</Button>
                </div>
                <div>
                    <Button style={{ marginRight: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrefreshloading(true);
                        axios.get('http://localhost:1024/clients').then((resp) => { setrows(resp.data.clients); setrefreshloading(false) })
                    }} endIcon={<Refresh />}>Refresh</Button>
                    <Button style={{ marginRight: 20 }} variant='contained' color='success' onClick={() => { setprt(true) }}>Print</Button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <DataTable
                    pagination
                    theme='newtheme'
                    dense
                    paginationPerPage={100}
                    contextActions={contextActions()}
                    actions={actions()}
                    highlightOnHover
                    pointerOnHover
                    fixedHeader
                    fixedHeaderScrollHeight='600px'
                    selectableRowsHighlight
                    direction="rtl"
                    onSelectedRowsChange={(rows) => {
                        setselectedRows(rows.selectedRows);
                        setdata(rows);
                        console.log(rows.selectedRows)
                        var sum = 0
                        var asum = 0
                        rows.selectedRows.forEach(function (value, index, arry) {
                            sum += (value.payment - value.expense);
                        });
                        rows.selectedRows.forEach(function (value, index, arry) {
                            sum += (value.payment - value.expense);
                        });
                        settotalamount(asum)
                        settotalprice(sum)
                    }}
                    selectableRowsComponent={Checkbox}
                    columns={columns}
                    selectableRows
                    data={rows}
                    onRowDoubleClicked={(data) => {
                        setnewdata(data);
                        seteditrn(true);
                        console.log(data);
                        setpayments(data.payment);
                        setexpenses(data.expense);
                        setsel(mesures[data.type].value);
                        setname(data.name)
                    }}
                />
            </div>
            <Dialog open={editrn}>
                <DialogTitle>Edit A Client</DialogTitle>
                <DialogContent>
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
                        autoFocus
                        margin="dense"
                        id="name"
                        label="الاسم"
                        type="text"
                        value={name}
                        onChange={(e) => { setname(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="payments"
                        label="عليه"
                        type="number"
                        value={payments}
                        onChange={(e) => { setpayments(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="expenses"
                        label="له"
                        type="number"
                        value={expenses}
                        onChange={(e) => { setexpenses(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { editsubmit() }}>حفظ</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default Clients