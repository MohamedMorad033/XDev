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
const updatetheme = (theme) => {
    if (theme == 'dark') {
        document.documentElement.style.setProperty('--firstcolor', '#0c0c0c');
        document.documentElement.style.setProperty('--seconscolor', '#0c0c0c');
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
function Transactions() {


    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);



    const columns = [
        {
            name: 'فاتوره',
            selector: row => row.refid ? row.refid : 'Na.',
            sortable: true
        },
        {
            name: 'من',
            selector: row => row.fromname,
            sortable: true,
            size: 20
        },
        {
            name: 'الى',
            selector: row => row.toname,
            sortable: true,

        },
        {
            name: 'المبلغ',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'تاريخ',
            selector: row => row.time.split('T')[0],
            sortable: true
        }
    ];





    const [firstvaultname, setfirstvaultname] = useState('')
    const [secondvaultname, setsecondvaultname] = useState('')
    const [firstvaultdata, setfirstvaultdata] = useState([])
    const [secondvaultdata, setsecondvaultdata] = useState([])
    const [sel, setsel] = useState('seller')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState(0)
    const [payments, setpayments] = useState(0)
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)
    const [newsel, setnewsel] = useState('seller')
    const [newname, setnewname] = useState('')
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
        axios.post('http://localhost:1024/searchvault', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setfirstvaultdata(resp.data.foundproduts)
            }
        })
    }
    useEffect(() => {
        axios.get('http://localhost:1024/vault').then((resp) => {
            setnewcode(resp.data.vault.length + 1);
        })
        axios.get('http://localhost:1024/transaction').then((resp) => {
            setrows(resp.data.transaction);
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
    const createnew2 = () => {
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
                setsecondvaultname(resp.data.newclient.name)
                setnewcode(newcode + 1)
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const createnewtransaction = () => {
        if (refid == '') {
            alert('refid cannot be empty')
            return;
        }
        if (!firstvaultname) {
            alert('name cannot be empty')
            return
        }
        if (!secondvaultname) {
            alert('name cannot be empty')
            return
        }
        if (expenses == '') {
            alert('amount cannot be empty')
            return;
        }
        if (date1 !== 'primary') {
            alert('date is wrong')
            return
        }
        setloadrn(true);
        axios.post('http://localhost:1024/addTransaction', { amount: expenses, fromname: firstvaultdata[0].id, toname: secondvaultdata[0].id, date: newexpenses, refid }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setloadrn(false);
                setexpenses(0)
                setrefid(Number(refid) + 1)
                setfirstvaultname('')
                setsecondvaultname('')
                axios.get('http://localhost:1024/transaction').then((resp) => {
                    setrows(resp.data.transaction);
                })
            } else if (resp.data.status == 400) {
                setloadrn(false);
                setrefiderr('error')
                axios.get('http://localhost:1024/transaction').then((resp) => {
                    setrows(resp.data.transaction);
                })
            } else {
                setloadrn(false)
                alert('failed')
            }
        }).catch(e => {
            alert(e.message);
            setloadrn(false)
        })
    }
    const [refid, setrefid] = useState(undefined)
    const [editrefid, editsetrefid] = useState(undefined)
    const [edittrans, setedittrans] = useState(false)
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
    const [newexpenses, setnewexpenses] = useState(new Date().toISOString().split('T')[0])
    const [date, setdate] = useState(new Date().toISOString().split('T')[0])

    const [selectedRows, setselectedRows] = useState([])
    const [data, setdata] = useState('')
    const [newdata, setnewdata] = useState({})

    const [refreshloading, setrefreshloading] = useState(false)

    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [transfromname, settransfromname] = useState('')
    const [transfromdata, settransfromdata] = useState([])
    const [refiderr, setrefiderr] = useState('primary')
    const [editrefiderr, seteditrefiderr] = useState('primary')
    const [transtoname, settranstoname] = useState('')
    const [transtodata, settranstodata] = useState([])
    const [date1, setdate1] = useState('primary')
    const [date2, setdate2] = useState('primary')
    const [transval, settransval] = useState(0)
    const searchrefid = (refid) => {
        axios.post('http://localhost:1024/searchrefidvaulttransaction', { refid: refid.toString() }).then((resp) => {
            if (resp.data.status == 200) {
                if (resp.data.transaction.length > 0) {
                    setrefiderr('warning')
                } else {
                    setrefiderr('primary')
                }
            } else {
                alert('error while fetching refid data')
            }
        })
    }
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', alignItems: 'center', marginBottom: 10, display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
                    <TextField
                        margin="dense"
                        label="فاتوره"
                        type="number"
                        value={refid}
                        style={{ marginRight: 20, width: 200 }}
                        size='small'
                        onChange={(e) => {
                            setrefid(e.currentTarget.value)
                            searchrefid(e.currentTarget.value)
                        }}
                        variant="outlined"
                        color={refiderr}
                        focused={refiderr !== 'primary'}
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        includeInputInList
                        freeSolo
                        style={{ marginRight: 20, width: 200 }}
                        value={firstvaultname}
                        onInputChange={(event, newInputValue) => {
                            setfirstvaultname(newInputValue);
                            search1(newInputValue)
                        }}
                        onFocus={() => {
                            axios.get('http://localhost:1024/vault').then((resp) => {
                                if (resp.data.status == 200) {
                                    setfirstvaultdata(resp.data.vault)
                                }
                            })
                        }}
                        onDoubleClick={() => { seteditrn(true); getcode() }}
                        options={firstvaultdata.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="من" />}
                        size='small'
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginRight: 20, width: 200 }}

                        freeSolo
                        value={secondvaultname}

                        onInputChange={(event, newInputValue) => {
                            setsecondvaultname(newInputValue);
                            search2(newInputValue)

                        }}
                        onFocus={() => {
                            axios.get('http://localhost:1024/vault').then((resp) => {
                                if (resp.data.status == 200) {
                                    setsecondvaultdata(resp.data.vault)
                                }
                            })
                        }}
                        options={secondvaultdata.map((option) => option.name)}
                        size='small'

                        renderInput={(params) => <TextField {...params} label="الي" />}
                        onDoubleClick={() => { seteditrn2(true); getcode() }}
                    />
                    <TextField
                        margin="dense"
                        id="expenses"
                        label="المبلغ"
                        type="number"
                        value={expenses}
                        style={{ marginRight: 20, width: 200 }}
                        size='small'
                        onChange={(e) => { setexpenses(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginRight: 20 }}
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="التاريخ"
                        type="date"
                        color={date1}
                        focused={date1 !== 'primary'}
                        value={newexpenses}
                        onChange={(e) => {
                            setnewexpenses(e.currentTarget.value)
                            setdate1(isNaN(Date.parse(new Date(e.currentTarget.value))) || new Date(e.currentTarget.value).getFullYear() > 5000 ? 'error' : 'primary')
                        }}
                        variant="outlined"
                    />
                    <Button disabled={loadrn} variant='contained' onClick={() => { createnewtransaction() }}>تأكيد</Button>

                    <Button disabled={loadrn} style={{ marginLeft: 20 }} variant='contained' color='warning' onClick={() => {
                        setloadrn(true);
                        axios.get('http://localhost:1024/transaction').then((resp) => {
                            setrows(resp.data.transaction);
                            setloadrn(false);
                            console.log(resp.data)
                        })
                    }} endIcon={<Refresh />}>Refresh</Button>
                </div>
                <DataTable
                    pagination
                    dense
                    theme='newtheme'
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
                    columns={columns}
                    data={rows}
                    onRowDoubleClicked={(data) => { setnewdata(data); settransfromname(data.fromname); settranstoname(data.toname); settransval(data.amount); setedittrans(true); editsetrefid(data.refid); setdate(data.time.split('T')[0]) }}
                />
            </div>
            <Dialog open={editrn}>
                <DialogTitle>اضافه خزنه</DialogTitle>
                <DialogContent>

                    <TextField
                        margin="dense"
                        id="code"
                        label="الكود"
                        type="number"
                        value={newcode}
                        onChange={(e) => { setnewcode(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="اسم الخزنه"
                        type="text"
                        value={name}
                        onChange={(e) => { setname(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="payments"
                        label="الرصيد"
                        type="number"
                        value={payments}
                        onChange={(e) => { setpayments(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { createnew() }}>اضافه</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={editrn2}>
                <DialogTitle>اضافه خزنه</DialogTitle>
                <DialogContent>

                    <TextField
                        margin="dense"
                        id="code"
                        label="الكود"
                        type="number"
                        value={newcode}
                        onChange={(e) => { setnewcode(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="اسم الخزنه"
                        type="text"
                        value={name}
                        onChange={(e) => { setname(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="payments"
                        label="الرصيد"
                        type="number"
                        value={payments}
                        onChange={(e) => { setpayments(e.currentTarget.value) }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn2(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { createnew2() }}>اضافه</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={edittrans} onClose={() => { setedittrans(false) }}>
                <DialogTitle>تعديل التحويل</DialogTitle>
                <DialogContent>


                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            margin="dense"
                            label="فاتوره"
                            type="number"
                            value={editrefid}
                            style={{ marginTop: 10, width: 400 }}
                            size='small'
                            onChange={(e) => { editsetrefid(e.currentTarget.value) }}
                            variant="outlined"
                            focused={editrefiderr !== 'primary'}
                            color={editrefiderr}
                        />
                        <Autocomplete
                            id="free-solo-demo"
                            includeInputInList
                            freeSolo
                            style={{ marginTop: 20, width: 400 }}
                            value={transfromname}
                            onInputChange={(event, newInputValue) => {
                                settransfromname(newInputValue);
                                axios.post('http://localhost:1024/searchvault', { searchtext: newInputValue }).then((resp) => {
                                    if (resp.data.status == 200) {
                                        settransfromdata(resp.data.foundproduts)
                                    }
                                })
                            }}
                            onFocus={() => {
                                axios.get('http://localhost:1024/vault').then((resp) => {
                                    if (resp.data.status == 200) {
                                        settransfromdata(resp.data.vault)
                                    }
                                })
                            }}
                            fullWidth
                            onDoubleClick={() => { seteditrn(true); getcode() }}
                            options={transfromdata.map((option) => option.name)}
                            renderInput={(params) => <TextField {...params} label="من" />}
                            size='small'
                        />
                        <Autocomplete
                            fullWidth
                            id="free-solo-demo"
                            label='d'
                            style={{ marginTop: 20, width: 400 }}

                            freeSolo
                            value={transtoname}

                            onInputChange={(event, newInputValue) => {
                                settranstoname(newInputValue);
                                axios.post('http://localhost:1024/searchvault', { searchtext: newInputValue }).then((resp) => {
                                    if (resp.data.status == 200) {
                                        settranstodata(resp.data.foundproduts)
                                    }
                                })
                            }}
                            onFocus={() => {
                                axios.get('http://localhost:1024/vault').then((resp) => {
                                    if (resp.data.status == 200) {
                                        settranstodata(resp.data.vault)
                                    }
                                })
                            }}
                            options={transtodata.map((option) => option.name)}
                            size='small'

                            renderInput={(params) => <TextField {...params} label="الي" />}
                            onDoubleClick={() => { seteditrn2(true); getcode() }}
                        />
                        <TextField
                            margin="dense"
                            id="payments"
                            label="المبلغ"
                            type="number"
                            value={transval}
                            onChange={(e) => { settransval(e.currentTarget.value) }}
                            style={{ marginTop: 20, width: 400 }}
                            size={'small'}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginTop: 20, width: 400 }}

                            margin="dense"
                            size='small'
                            id="expenses"
                            label="التاريخ"
                            type="date"
                            value={date}
                            color={date2}
                            focused={date2 !== 'primary'}
                            onChange={(e) => {
                                setdate(e.currentTarget.value)
                                setdate2(isNaN(Date.parse(new Date(e.currentTarget.value))) || new Date(e.currentTarget.value).getFullYear() > 5000 ? 'error' : 'primary')
                            }}
                            variant="outlined"
                        />
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button disabled={loadrn} onClick={() => {
                        setedittrans(false);
                        setloadrn(false)
                    }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={async () => {
                        axios.post('http://localhost:1024/deletetransaction', { id: newdata.id }).then(resp => {
                            setedittrans(false); axios.get('http://localhost:1024/transaction').then((resp) => {
                                setrows(resp.data.transaction);
                                setloadrn(false)
                            }).catch(e => alert(e.message))
                        })
                    }}
                        color='error'
                    >حذف</Button>
                    <Button disabled={loadrn} variant='contained' onClick={async () => {
                        if (date2 !== 'primary') {
                            alert('date is wrong')
                            return
                        }
                        axios.post('http://localhost:1024/edittransaction', { newdata, transfromname, transtoname, transval, date, refid: editrefid }).then(resp => {
                            if (resp.data.status == 200) {
                                setedittrans(false);
                                setloadrn(false);
                                axios.get('http://localhost:1024/transaction').then((resp) => {
                                    setrows(resp.data.transaction);
                                })
                            } else if (resp.data.status == 400) {
                                setloadrn(false)
                                seteditrefiderr('error')
                                axios.get('http://localhost:1024/transaction').then((resp) => {
                                    setrows(resp.data.transaction);
                                })
                            } else {
                                setloadrn(false)
                                alert('failed')
                            }

                        }).catch(e => alert(e.message))
                    }}>حفظ</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Transactions