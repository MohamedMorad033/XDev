import React, { useEffect, useState } from 'react'
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
import Refresh from '@mui/icons-material/RefreshRounded'

import DataTable, { createTheme } from 'react-data-table-component';


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
function Workers() {

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
            selector: row => row.payment,
            sortable: true,

        },
        {
            name: 'واصل',
            selector: row => row.payed,
            sortable: true,

        },
        {
            name: 'باقي',
            selector: row => row.payment - row.payed,
            sortable: true,

        },
    ];




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
        axios.get('http://192.168.1.20:1024/Workers').then((resp) => {
            setrows(resp.data.clients); setnewcode(resp.data.clients.length + 1);
        })
    }, [])
    const [sel, setsel] = useState('seller')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState('')
    const [payments, setpayments] = useState('')
    const [code, setcode] = useState()
    const [selid, setselid] = useState('')
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
    const [data, setdata] = useState({})

    const editsubmit = () => {
        setloadrn(true)
        axios.post('http://192.168.1.20:1024/editWorkers', { name, payments, selid: data.id }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                axios.get('http://192.168.1.20:1024/Workers').then((resp) => { setrows(resp.data.clients) })
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
        setloadrn(true)
        axios.post('http://192.168.1.20:1024/addWorkers', { name: newname }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                setnewcode(newcode + 1)
                axios.get('http://192.168.1.20:1024/Workers').then((resp) => { setrows(resp.data.clients) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }



    const search = (text) => {
        setsearchload(true)
        axios.post('http://192.168.1.20:1024/searchWorkers', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://192.168.1.20:1024/Workers').then((resp) => { setrows(resp.data.clients) })

            }
        })
    }

    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => {
                axios.post('http://192.168.1.20:1024/deleteWorkers', { deleteproduct: selectedRows }).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data)
                        setrows([])
                        setrows(resp.data.Workers)
                    } else {
                        alert('failed')
                        axios.get('http://192.168.1.20:1024/products').then((resp) => { setrows(resp.data.products) })

                    }
                })
            }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                setprt(true); setTimeout(() => {
                    window.print()
                }, 200);
            }}>print</Button>
        </>
    );
    const actions = () => (
        <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>

            <TextField
                style={{ marginRight: 20, marginLeft: 20 }}
                autoFocus
                margin="dense"
                id="name"
                size='small'

                label="اسم المقاول"
                type="text"
                value={newname}
                onChange={(e) => { setnewname(e.currentTarget.value) }}
                variant="outlined"
            />
            <Button size='medium'
                disabled={newloadrn} variant='contained' onClick={() => { createnew() }}>Create</Button>
        </div>
    );
    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [selectedRows, setselectedRows] = useState([])

    const [newdata, setnewdata] = useState({})
    const [newloss, setnewloss] = useState(0)

    const [prt, setprt] = useState(false)
    const [refreshloading, setrefreshloading] = useState(false)
    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'start', flexDirection: 'row' }}>

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
                    <Button style={{ height: 30, marginLeft: 20 }} disabled={searchload} variant='contained' color='error' onClick={() => {
                        setsearchtext(''); axios.get('http://192.168.1.20:1024/Workers').then((resp) => { setrows(resp.data.clients) })
                    }}>Clear</Button>
                </div>
                <div>
                    <Button style={{ height: 30, marginRight: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrefreshloading(true);
                        axios.get('http://192.168.1.20:1024/Workers').then((resp) => { setrows(resp.data.clients); setrefreshloading(false) })
                    }} endIcon={<Refresh />}>Refresh</Button>
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
                    fixedHeaderScrollHeight='350px'
                    selectableRowsHighlight
                    direction="rtl"
                    onSelectedRowsChange={(rows) => {
                        setselectedRows(rows.selectedRows);
                        setdata(rows);
                        console.log(rows.selectedRows)
                        var sum = 0

                        rows.selectedRows.forEach(function (value, index, arry) {
                            sum += value.totalprice;
                        });

                        settotalprice(sum)
                    }}
                    selectableRowsComponent={Checkbox}
                    columns={columns}
                    selectableRows
                    data={rows}
                    onRowDoubleClicked={(data) => { console.log(data); setcode(data.code); setpayments(data.payment); setname(data.name); setexpenses(data.expense); setselid(data.id); seteditrn(true) }}
                />
            </div>
            <Dialog open={editrn}>
                <DialogTitle>تعديل معلومات مقاول</DialogTitle>
                <DialogContent>
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
                        label="له"
                        type="number"
                        value={payments}
                        onChange={(e) => { setpayments(e.currentTarget.value) }}
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

export default Workers