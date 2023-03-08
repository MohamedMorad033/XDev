import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem'
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import { Checkbox } from '@blueprintjs/core';
import Refresh from '@mui/icons-material/RefreshRounded'
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete'
import DataTable, { createTheme } from 'react-data-table-component';


const mesures = [
    {
        value: 'out',
        label: 'من الخزنه',
    },
    {
        value: 'in',
        label: 'الي الخزنه',
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

function Vault() {

    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);

    const [firstvaultname, setfirstvaultname] = useState('')
    const [secondvaultname, setsecondvaultname] = useState('')
    const [firstvaultdata, setfirstvaultdata] = useState([])
    const [secondvaultdata, setsecondvaultdata] = useState([])
    const [data, setdata] = useState([])
    const search1 = (text) => {
        axios.post('http://192.168.1.20:1024/searchclients', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setfirstvaultdata(resp.data.foundproduts)
            }
        })
    }

    const [rows, setrows] = useState([]);
    const [selectedRows, setselectedRows] = useState([])

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
            name: 'الاسم',
            selector: row => row.name,
            sortable: true,
            size: 20
        },
        {
            name: 'الرصيد',
            selector: row => row.value.toFixed(3),
            sortable: true,

        },
    ];


    useEffect(() => {
        axios.get('http://192.168.1.20:1024/Vault').then((resp) => {
            setrows(resp.data.vault); setnewcode(resp.data.vault.length + 1);
        })
    }, [])
    const [sel, setsel] = useState('seller')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState('')
    const [payments, setpayments] = useState('')
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)

    const [transvalue, settransvalue] = useState('')


    const [newsel, setnewsel] = useState('in')
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
        axios.post('http://192.168.1.20:1024/editVault', { name, expenses, value: payments, code, selid, sel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                axios.get('http://192.168.1.20:1024/Vault').then((resp) => { setrows(resp.data.vault) })
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
        setloadrn(true)
        axios.post('http://192.168.1.20:1024/addVault', { name: newname, value: newpayments, code: newcode }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                setnewname('')
                setnewcode(newcode + 1)
                axios.get('http://192.168.1.20:1024/Vault').then((resp) => { setrows(resp.data.vault) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }

    const [prt, setprt] = useState(false)

    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => { }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                setprt(true); setTimeout(() => {
                    window.print()
                }, 200);
            }}>print</Button>
        </>
    );
    const actions = () => (
        <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>

            <TextField
                style={{ marginRight: 20 }}
                autoFocus
                margin="dense"
                id="name"
                label="اسم الخزنه"
                type="text"
                value={newname}
                onChange={(e) => { setnewname(e.currentTarget.value) }}
                variant="standard"
            />
            <TextField
                style={{ marginRight: 20 }}
                autoFocus
                margin="dense"
                id="payments"
                label="الرصيد"
                type="number"
                value={newpayments}
                onChange={(e) => { setnewpayments(e.currentTarget.value) }}
                variant="standard"
            />
            <Button disabled={newloadrn} variant='contained' onClick={() => { createnew() }}>Create</Button>

        </div>
    );




    const submittrans = () => {
        axios.post('http://192.168.1.20:1024/addvaultclienttransaction', { fromname: data.id, toname: firstvaultdata[0].id, amount: transvalue, type: newsel }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                seteditrn(false)
                axios.get('http://192.168.1.20:1024/Vault').then((resp) => {
                    setrows(resp.data.vault); setnewcode(resp.data.vault.length + 1);
                })
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://192.168.1.20:1024/Vault').then((resp) => { setrows(resp.data.vault) })

            }
        })
    }



    const search = (text) => {
        setsearchload(true)
        axios.post('http://192.168.1.20:1024/searchVault', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://192.168.1.20:1024/Vault').then((resp) => { setrows(resp.data.vault) })

            }
        })
    }
    const [refreshloading, setrefreshloading] = useState(false)
    return (
        <div style={{ width: '100%' }}>

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
                        setsearchtext(''); axios.get('http://192.168.1.20:1024/Vault').then((resp) => { setrows(resp.data.vault) })
                    }}>Clear</Button>
                </div>
                <div>
                    <Button style={{ height: 30, marginRight: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrefreshloading(true);
                        axios.get('http://192.168.1.20:1024/Vault').then((resp) => { setrows(resp.data.vault); setrefreshloading(false) })
                    }} endIcon={<Refresh />}>Refresh</Button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <DataTable
                    contextActions={contextActions()}
                    actions={actions()}
                    pagination
                    dense
                    theme='newtheme'
                    paginationPerPage={100}
                    highlightOnHover
                    pointerOnHover
                    fixedHeader
                    fixedHeaderScrollHeight='350px'
                    direction="rtl"
                    onRowDoubleClicked={(data) => { setdata(data); seteditrn(true) }}
                    columns={columns}
                    data={rows}
                />
            </div>
            <Dialog open={editrn}>
                <DialogTitle>Edit A Product</DialogTitle>
                <DialogContent>

                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <Typography variant='h6' style={{ marginRight: 20 }}>
                                اسم الخزنه : {data.name}
                            </Typography>
                            <Typography variant='h6' style={{ marginRight: 20 }}>
                                رصيد الخزنه : {data.value}
                            </Typography>
                        </div>
                        <Autocomplete
                            id="free-solo-demo"
                            includeInputInList
                            freeSolo
                            style={{ marginBottom: 20 }}
                            fullWidth
                            value={firstvaultname}
                            onFocus={() => {
                                axios.get('http://192.168.1.20:1024/clients').then((resp) => {
                                    setfirstvaultdata(resp.data.clients)
                                })
                            }}
                            onInputChange={(event, newInputValue) => {
                                setfirstvaultname(newInputValue);
                                search1(newInputValue)
                            }}
                            onDoubleClick={() => { seteditrn(true); }}
                            options={firstvaultdata.map((option) => option.name)}
                            renderInput={(params) => <TextField {...params} label="المورد" />}
                            size='small'
                        />
                        <Select
                            variant='outlined'
                            value={newsel}
                            size='small'
                            style={{ marginBottom: 20 }}
                            fullWidth
                            onChange={(e) => { setnewsel(e.target.value) }}
                        >
                            {mesures.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            size='small'
                            margin="dense"
                            fullWidth
                            label='المبلغ'
                            type="number"
                            value={transvalue}
                            onChange={(e) => { settransvalue(e.target.value); }}
                            variant="outlined"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { submittrans() }}>حفظ</Button>
                </DialogActions>
            </Dialog>


        </div>

    )
}

export default Vault