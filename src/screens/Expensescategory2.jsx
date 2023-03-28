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
            localStorage.setItem('Theme','light')
        }
}

updatetheme(localStorage.getItem('Theme'))
  
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

function Expensescategory2() {

    const [mesures, setmesures] = useState([
        {
            id: 1,
            name: 'loading'
        },
    ])


    const [rows, setrows] = useState([
    ]);
    const [editrn, seteditrn] = useState(false)
    const [selected, setelected] = useState(
    )
    const columns = [
        {
            name: 'كود',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'النوع',
            selector: row => row.name,
            sortable: true,
            size: 20
        },
        {
            name: 'القسم',
            selector: row => row.linkname,
            sortable: true,
            size: 20
        }
    ];

    useEffect(() => {
        axios.get('http://localhost:1024/expensescategory2').then((resp) => {
            setrows(resp.data.expensescategorys);
        })
        axios.get('http://localhost:1024/expensescategory').then((resp) => {
            setmesures(resp.data.expensescategorys);
        })
    }, [])
    const [sel, setsel] = useState('seller')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState('')
    const [payments, setpayments] = useState('')
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)




    const [newsel, setnewsel] = useState('loading')
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
        axios.post('http://localhost:1024/editexpensescategory2', { name, newselid, sel: selid }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/expensescategory2').then((resp) => { setrows(resp.data.expensescategorys) })
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
        axios.post('http://localhost:1024/addexpensescategory2', { name: newname, newsel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setexpenses('')
                setnewsel('')
                setname('')
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/expensescategory2').then((resp) => { setrows(resp.data.expensescategorys) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }



    const search = (text) => {
        setsearchload(true)
        axios.post('http://localhost:1024/searchexpensescategory2', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://localhost:1024/expensescategory2').then((resp) => { setrows(resp.data.expensescategorys) })

            }
        })
    }
    const [refreshloading, setrefreshloading] = useState(false)
    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'start', flexDirection: 'row' }}>

                <TextField
                    style={{ marginRight: 20, marginLeft: 20 }}
                    autoFocus
                    margin="dense"
                    id="name"
                    size='small'

                    label="اسم الصنف"
                    type="text"
                    value={newname}
                    onChange={(e) => { setnewname(e.currentTarget.value) }}
                    variant="outlined"
                />
                <Select
                    style={{ marginRight: 20 }}
                    variant='outlined'
                    size='small'

                    label="Age"
                    value={newsel}
                    onChange={(e) => { setnewsel(e.target.value) }}
                >
                    {mesures.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button size='medium'
                    disabled={newloadrn} variant='contained' onClick={() => { createnew() }}>Create</Button>

            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <TextField
                        style={{ marginLeft: 20 }}
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
                        setsearchtext(''); axios.get('http://localhost:1024/expensescategory2').then((resp) => { setrows(resp.data.expensescategorys) })
                    }}>Clear</Button>
                </div>
                <div>
                    <Button style={{ height: 30, marginRight: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrefreshloading(true);
                        axios.get('http://localhost:1024/expensescategory2').then((resp) => { setrows(resp.data.expensescategorys); setrefreshloading(false) })
                    }} endIcon={<Refresh />}>Refresh</Button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <DataTable
                    theme='newtheme'
                    pagination
                    selectableRowsComponent={Checkbox}
                    columns={columns}
                    data={rows}
                    onRowDoubleClicked={(data) => { seteditrn(true); setname(data.name); setnewselid(data.linkname); setselid(data.id) }}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>
            <Dialog open={editrn}>
                <DialogTitle>Edit A Client</DialogTitle>
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
                    <Select
                        style={{ marginRight: 20 }}
                        variant='outlined'
                        size='small'
                        label="Age"
                        value={newselid}
                        onChange={(e) => { setnewselid(e.target.value) }}
                    >
                        {mesures.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { editsubmit() }}>حفظ</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default Expensescategory2