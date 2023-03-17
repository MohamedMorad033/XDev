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

import DataTable, { createTheme } from 'react-data-table-component';
import { Autocomplete } from '@mui/material';
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
function ClientM() {
    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);

    const types = [
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
    const mesures = [
        {
            value: 'out',
            label: 'عليه',
        },
        {
            value: 'in',
            label: 'له',
        },
    ];

    const columns = [
        {
            name: 'م',
            selector: row => row.id,
            sortable: true,
            width: '60px'
        },
        {
            name: 'له / عليه',
            selector: row => row.way == 'in' ? 'له' : 'عليه',
            sortable: true,

        },
        {
            name: 'عميل / مورد',
            selector: row => row.clientname,
            sortable: true,
            grow: 2,
        },
        {
            name: 'تاريخ',
            selector: row => row.time.split('T')[0],
            sortable: true,
            grow: 3,
        },
        {
            name: 'ملاحظات',
            selector: row => row.text,
            sortable: true,
            grow: 3,
        },
        {
            name: 'المبلغ',
            selector: row => row.amount,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.way == 'out',
                    style: {
                        backgroundColor: 'rgba(255, 70, 70, 1)',
                        color: 'white'
                    }
                },
                {
                    when: row => row.way == 'in',
                    style: {
                        backgroundColor: 'rgb(70 255 70)',
                        color: 'black'
                    }
                }
            ]
        },
    ];




    const [vaultname, setvaultname] = useState('')
    const [clientname, setclientname] = useState('')
    const [vaultdata, setvaultdata] = useState([])
    const [clientdata, setclientdata] = useState([])


    const [text, settext] = useState('')



    const [firstvaultname, setfirstvaultname] = useState('')
    const [secondvaultname, setsecondvaultname] = useState('')
    const [firstvaultdata, setfirstvaultdata] = useState([])
    const [secondvaultdata, setsecondvaultdata] = useState([])
    const [sel, setsel] = useState('unit')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState(0)
    const [payments, setpayments] = useState(0)
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)
    const [newname, setnewname] = useState('')
    const [newprodname, setnewprodname] = useState('')
    const [newexpenses, setnewexpenses] = useState(new Date().toISOString().split('T')[0])
    const [newcamount, setnewcamount] = useState(0)
    const [newpayments, setnewpayments] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')
    const [rows, setrows] = useState([
    ]);
    const [editrn, seteditrn] = useState(false)
    const [editrn2, seteditrn2] = useState(false)
    const search1 = (text) => {
        axios.post('http://localhost:1024/searchclients', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setfirstvaultdata(resp.data.foundproduts)
            }
        })
    }
    useEffect(() => {
        axios.get('http://localhost:1024/cmtransaction').then((resp) => {
            setrows(resp.data.cvtransaction);
        })
    }, [])
    const getcode = () => {
        axios.get('http://localhost:1024/vault').then((resp) => {
            setnewcode(resp.data.vault.length + 1);
        })
    }
    const search2 = (text) => {
        axios.post('http://localhost:1024/searchvault', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsecondvaultdata(resp.data.foundproduts)
            }
        })
    }
    const [newprice, setnewprice] = useState('0')
    const [newamount, setnewamount] = useState('0')

    const createnew = () => {
        if (!name) {
            alert('name cannot be empty')
            return
        }
        if (newcode === '') {
            alert('please enter a code')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addvault', { value: payments, name: name, code: newcode }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setloadrn(false)
                seteditrn(false)
                seteditrn2(false)
                setfirstvaultname(resp.data.newclient.name)
                setnewcode(newcode + 1)
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const [data, setdata] = useState(new Date().toISOString().split('T')[0])
    const createnew2 = () => {
        if (!newprodname) {
            alert('name cannot be empty')
            return
        }
        if (newamount === '') {
            alert('please enter an amount')
            return
        }
        if (sel === '') {
            alert('please enter a code')
            return
        }
        if (newprice === '') {
            alert('please enter a price')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addproduct', { name: newprodname, price: newprice, amount: newamount, code: newcode, selectmode: sel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                seteditrn2(false)
                setnewcode(newcode + 1)

                axios.get('http://localhost:1024/products').then((resp) => { setrows(resp.data.products) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const componentRef = useRef();

    const createnewproduct = () => {
        if (!newname) {
            alert('name cannot be empty')
            return
        }
        if (newpayments === '') {
            alert('please enter an payments')
            return
        }
        if (newsel === '') {
            alert('please select a type')
            return
        }
        if (newexpenses === '') {
            alert('please enter a expenses')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addclients', { name: newname, expenses: newexpenses, payments: newpayments, selectmode: newsel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setloadrn(false)
                seteditrn(false)
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const deletetrans = () => {
        setloadrn(true)
        axios.post('http://localhost:1024/deleteclientmtransaction', { id: data.id }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/cmtransaction').then((resp) => {
                    setrows(resp.data.cvtransaction);
                })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const [edittext, setedittext] = useState('')
    const edittrans = () => {
        if (clientname === '') {
            alert('client cannot be empty')
            return
        }
        if (newsel === '') {
            alert('please select a type')
            return
        }
        if (editamount === '') {
            alert('please enter a expenses')
            return
        }
        if (editdate === '') {
            alert('please enter a expenses')
            return
        }
        if (edittext == '') {
            alert('please enter a note')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/editclientmtransaction', { id: data.id, clientname, amount: editamount, type: editsel, time: editdate, text: edittext }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/cmtransaction').then((resp) => {
                    setrows(resp.data.cvtransaction);
                })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const [selectedRows, setselectedRows] = useState([])
    const [prt, setprt] = useState(false)
    const [refid, setrefid] = useState()
    const submittrans = () => {
        if (firstvaultname === '') {
            alert('client cannot be empty')
            return
        }
        if (newsel === '') {
            alert('please select a type')
            return
        }
        if (amount === '') {
            alert('please enter a expenses')
            return
        }
        if (newexpenses === '') {
            alert('please enter a expenses')
            return
        }
        if (text == '') {
            alert('please enter a note')
            return
        }
        setrefreshloading(true)
        axios.post('http://localhost:1024/addclientmtransaction', { text, fromname: secondvaultname, toname: firstvaultname, amount: Number(amount), type: newsel, time: newexpenses }).then((resp) => {
            if (resp.data.status == 200) {
                setrefreshloading(false)
                console.log(resp.data)
                seteditrn(false)
                setsecondvaultname('');
                setfirstvaultname('');
                setamount(0);
                settext('')
                setnewsel('in');
                setrefid(Number(refid) + 1)
                axios.get('http://localhost:1024/cmtransaction').then((resp) => {
                    setrows(resp.data.cvtransaction);
                })
            } else {
                setloadrn(false)
                alert('failed')
                setrefreshloading(false)
            }
        })
    }
    const [newsel, setnewsel] = useState('in')

    const contextActions = () => (
        <>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                setprt(true); setTimeout(() => {
                    window.print()
                }, 200);
            }}>print</Button>
        </>
    );
    const actions = () => (
        <div>

        </div>
    );


    const [refreshloading, setrefreshloading] = useState(false)

    const [editsel, seteditsel] = useState('in')
    const [amount, setamount] = useState(0)

    const [editamount, seteditamount] = useState(0)
    const [editrefid, seteditrefid] = useState(0)
    const [editdate, seteditdate] = useState('')

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Modal open={prt} onClose={() => { setprt(false) }}>
                <div ref={componentRef} style={{ height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: '100%' }}>
                        <div className='NavContainer' style={{ position: 'sticky', top: 0, backgroundColor: '#eee' }}>
                            <div>
                                <img onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'http://localhost:3000/';
                                }} src={logo} width={65.61} height={40} style={{ marginLeft: 5 }} />
                            </div>
                            <div style={{ marginRight: 20 }}>
                                <h4>واردات وصادرات الخزنه والعملاء</h4>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <DataTable
                                dense
                                direction="rtl"
                                columns={columns}
                                data={selectedRows}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <Select
                        variant='outlined'
                        value={newsel}
                        size='small'
                        style={{ margin: 10, width: 150 }}
                        onChange={(e) => { setnewsel(e.target.value) }}
                    >
                        {mesures.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <Autocomplete
                        id="free-solo-demo"
                        includeInputInList
                        freeSolo
                        style={{ margin: 10, width: 200 }}
                        value={firstvaultname}
                        onInputChange={(event, newInputValue) => {
                            setfirstvaultname(newInputValue);
                            search1(newInputValue)
                        }}
                        onFocus={() => {
                            axios.get('http://localhost:1024/clients').then((resp) => {
                                if (resp.data.status == 200) {
                                    setfirstvaultdata(resp.data.clients)
                                }
                            })
                        }}
                        options={firstvaultdata.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="مورد / عميل" />}
                        size='small'
                    />
                    <TextField
                        margin="dense"
                        id="expenses"
                        label="المبلغ"
                        type="number"
                        value={amount}
                        style={{ margin: 10, width: 200 }}
                        size='small'
                        onChange={(e) => { setamount(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="expenses"
                        label="ملاحظات"
                        type="text"
                        value={text}
                        style={{ margin: 10, width: 500 }}
                        size='small'
                        onChange={(e) => { settext(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ margin: 10 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="التاريخ"
                        type="date"
                        value={newexpenses}
                        onChange={(e) => { setnewexpenses(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <Button disabled={refreshloading} style={{ margin: 10 }} variant='contained' onClick={() => { submittrans() }}>تأكيد</Button>
                    <Button style={{ margin: 10 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrefreshloading(true);
                        axios.get('http://localhost:1024/cmtransaction').then((resp) => { setrows(resp.data.cvtransaction); setrefreshloading(false); console.log(resp.data) })
                    }} endIcon={<Refresh />}>Refresh</Button>
                </div>
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
                    direction="rtl"
                    columns={columns}
                    data={rows}
                    onRowDoubleClicked={(data) => {
                        console.log(data);
                        setdata(data);
                        setclientname(data.clientname);
                        seteditamount(data.amount);
                        setselid(data.id);
                        seteditsel(data.way);
                        seteditrefid(data.refid);
                        setedittext(data.text)
                        seteditrn(true);
                        seteditdate(data.time.split('T')[0]);
                    }}
                />
            </div>
            <Dialog open={editrn} onClose={() => { seteditrn(false) }}>
                <DialogTitle>تعديل التحويل</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="فاتوره"
                        type="number"
                        value={editrefid}
                        style={{ margin: 10, width: 150 }}
                        size='small'
                        onChange={(e) => { seteditrefid(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <Select
                        variant='outlined'
                        value={editsel}
                        size='small'
                        style={{ margin: 10, width: 150 }}
                        onChange={(e) => { seteditsel(e.target.value); console.log(editsel) }}
                    >
                        {mesures.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <Autocomplete
                        id="free-solo-demo"
                        includeInputInList
                        freeSolo
                        style={{ margin: 10, width: 200 }}
                        value={clientname}
                        onInputChange={(event, newInputValue) => {
                            setclientname(newInputValue);
                            search1(newInputValue)
                        }}
                        onFocus={() => {
                            axios.get('http://localhost:1024/clients').then((resp) => {
                                if (resp.data.status == 200) {
                                    setclientdata(resp.data.clients)
                                }
                            })
                        }}
                        onDoubleClick={() => { seteditrn(true); getcode() }}
                        options={clientdata.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="مورد / عميل" />}
                        size='small'
                    />
                    <TextField
                        margin="dense"
                        id="expenses"
                        label="ملاحظات"
                        type="text"
                        value={edittext}
                        style={{ margin: 10, width: 100 }}
                        size='small'
                        onChange={(e) => { setedittext(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="expenses"
                        label="المبلغ"
                        type="number"
                        value={editamount}
                        style={{ margin: 10, width: 100 }}
                        size='small'
                        onChange={(e) => { seteditamount(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ margin: 10 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="التاريخ"
                        type="date"
                        value={editdate}
                        onChange={(e) => { seteditdate(e.currentTarget.value) }}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn} color='error' variant='contained' onClick={() => { deletetrans() }}>حذف</Button>
                    <Button disabled={loadrn} color='success' variant='contained' onClick={() => { edittrans() }}>حفظ</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={editrn2} onClose={() => { seteditrn2(false) }}>
                <DialogTitle>اضافه صنف</DialogTitle>
                <DialogContent>

                    <TextField
                        style={{ marginRight: 20 }}
                        vault
                        margin="dense"
                        id="name"
                        size='small'
                        autoFocus
                        label="اسم الصنف"
                        type="text"
                        value={newprodname}
                        onChange={(e) => { setnewprodname(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <Select
                        style={{ marginRight: 20 }}
                        variant='outlined'
                        size='small'

                        label="Age"
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
                        style={{ marginRight: 20 }}
                        vault
                        size='small'

                        margin="dense"
                        id="Amount"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{sel}</InputAdornment>,
                        }}
                        label="Amount"
                        type="number"
                        value={newamount}
                        onChange={(e) => { setnewamount(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginRight: 20 }}
                        vault
                        margin="dense"
                        id="Price"
                        size='small'

                        label="Price"
                        type="number"
                        value={newprice}
                        onChange={(e) => { setnewprice(e.currentTarget.value) }}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn2(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { createnew2() }}>اضافه</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ClientM