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
function Moneyownertransactions() {



    const columns = [
        {
            name: 'م',
            selector: row => row.id,
            sortable: true,
            width : '100px'
        },
        {
            name: 'فاتوره؟',
            selector: row => row.refid,
            sortable: true,
        },
        {
            name: 'وارد/منصرف',
            selector: row => row.way == 'in' ? 'وارد' : "منصرف",
            sortable: true,
        },
        {
            name: 'الشريك',
            selector: row => row.fromname,
            sortable: true,
            size: 20
        },
        {
            name: 'الخزينه',
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



    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);



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
    const [newsel, setnewsel] = useState('in')
    const [newname, setnewname] = useState('')
    const [newexpenses, setnewexpenses] = useState('0')
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
        axios.post('http://localhost:1024/searchmoneyowner', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setfirstvaultdata(resp.data.foundproduts)
            }
        })
    }
    useEffect(() => {
        axios.get('http://localhost:1024/Vault').then((resp) => {
            setnewcode(resp.data.Vault.length + 1);
        })
        axios.get('http://localhost:1024/Moneyownertransactions').then((resp) => {
            setrows(resp.data.transaction);
        })
    }, [])
    const getcode = () => {
        axios.get('http://localhost:1024/Vault').then((resp) => {
            setnewcode(resp.data.Vault.length + 1);
        })
    }
    const search2 = (text) => {
        axios.post('http://localhost:1024/searchVault', { searchtext: text }).then((resp) => {
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
        axios.post('http://localhost:1024/addVault', { value: payments, name: name, code: newcode }).then((resp) => {
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
    const mesures = [
        {
            value: 'out',
            label: 'منصرف',
        },
        {
            value: 'in',
            label: 'وارد',
        },
    ];

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
        axios.post('http://localhost:1024/addVault', { value: payments, name: name, code: newcode }).then((resp) => {
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
    const [transdate, settransdate] = useState(new Date().toISOString().split('T')[0])
    const [edittransdate, setedittransdate] = useState()

    const createnewtransaction = () => {
        if (refiderr == 'error' | refiderr == 'warning') {
            alert('refid is used')
            setrefiderr('error')
            return
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
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addMoneyownertransactions', { amount: expenses, fromname: firstvaultname, toname: secondvaultname, refid, time: transdate, way: newsel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setfirstvaultname('')
                setsecondvaultname('')
                setexpenses(0)
                setloadrn(false)
                setrefid(Number(refid) + 1)
                axios.get('http://localhost:1024/Moneyownertransactions').then((resp) => { setrows(resp.data.transaction); setrefreshloading(false); console.log(resp.data) })
            } else if (resp.data.status == 400) {
                setloadrn(false)
                setrefiderr('error')
                axios.get('http://localhost:1024/cvtransaction').then((resp) => {
                    setrows(resp.data.transaction);
                })
            } else {
                setloadrn(false)
                alert('failed')
            }
        }).catch(e => alert(e.message))
    }

    const [edittrans, setedittrans] = useState(false)
    const [prt, setprt] = useState(false)


    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => {

                axios.post('http://localhost:1024/deleteMoneyownertransactions', { selectedRows }).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data)
                        setfirstvaultname('')
                        setsecondvaultname('')
                        setexpenses(0)
                        axios.get('http://localhost:1024/Moneyownertransactions').then((resp) => { setrows(resp.data.transaction); setrefreshloading(false); console.log(resp.data) })
                    } else {
                        setloadrn(false)
                        alert('failed')
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



        </div>
    );
    const [selectedRows, setselectedRows] = useState([])
    const [data, setdata] = useState('')
    const [newdata, setnewdata] = useState({})

    const [refreshloading, setrefreshloading] = useState(false)
    const [editway, seteditway] = useState('in')
    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [transfromname, settransfromname] = useState('')
    const [transfromdata, settransfromdata] = useState([])

    const [transtoname, settranstoname] = useState('')
    const [transtodata, settranstodata] = useState([])
    const [editloading, seteditloading] = useState(false)
    const [transval, settransval] = useState(0)
    const [refid, setrefid] = useState(Math.floor(Math.random() * 1000000))
    const [editrefid, seteditrefid] = useState('')
    const [refiderr, setrefiderr] = useState('primary')
    const [editrefiderr, seteditrefiderr] = useState('primary')


    const searchrefid = (refid) => {
        axios.post('http://localhost:1024/searchrefidmownertransaction', { refid: refid.toString() }).then((resp) => {
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
            <Modal open={prt} onClose={() => { setprt(false) }}>
                <div style={{ height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: '100%' }}>
                        <div className='NavContainer' style={{ position: 'sticky', top: 0, backgroundColor: '#eee' }}>
                            <div>
                                <img onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'http://localhost:3000/';
                                }} src={logo} width={65.61} height={40} style={{ marginLeft: 5 }} />
                            </div>
                            <div style={{ marginRight: 20 }}>
                                <h4>فاتوره تحويلات الخزنه</h4>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <DataTable
                                dense
                                direction="rtl"
                                columns={columns}
                                data={selectedRows}
                            />
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'start' }}>
                                <Typography color={'#000'} style={{ margin: 50 }}>
                                    اجمالي المبلغ : {totalamount}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div style={{ width: '100%' }}>




                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <TextField
                        margin="dense"
                        label="فاتوره"
                        type="number"
                        value={refid}
                        style={{ margin: 10, width: 150 }}
                        size='small'
                        onChange={(e) => {
                            setrefid(e.currentTarget.value)
                            searchrefid(e.currentTarget.value)
                        }}
                        variant="outlined"
                        color={refiderr}
                        focused={refiderr !== 'primary'}
                    />
                    <Select
                        variant='outlined'
                        value={newsel}
                        size='small'
                        style={{ margin: 10, width: 300 }}
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
                        style={{ marginRight: 20, width: 200 }}
                        value={firstvaultname}
                        onInputChange={(event, newInputValue) => {
                            setfirstvaultname(newInputValue);
                            search1(newInputValue)
                        }}
                        onFocus={() => {
                            axios.get('http://localhost:1024/moneyowner').then((resp) => {
                                if (resp.data.status == 200) {
                                    setfirstvaultdata(resp.data.vault)
                                }
                            })
                        }}
                        onDoubleClick={() => { seteditrn(true); getcode() }}
                        options={firstvaultdata.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="الشريك" />}
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
                            axios.get('http://localhost:1024/Vault').then((resp) => {
                                if (resp.data.status == 200) {
                                    setsecondvaultdata(resp.data.vault)
                                }
                            })
                        }}
                        options={secondvaultdata.map((option) => option.name)}
                        size='small'

                        renderInput={(params) => <TextField {...params} label="الخزينه" />}
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
                        style={{ marginRight: 20, width: 200 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="التاريخ"
                        type="date"
                        value={transdate}
                        onChange={(e) => { settransdate(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <Button disabled={false} variant='contained' onClick={() => { createnewtransaction() }}>تأكيد</Button>

                    <Button style={{ marginLeft: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrefreshloading(true);
                        axios.get('http://localhost:1024/Moneyownertransactions').then((resp) => { setrows(resp.data.transaction); setrefreshloading(false); console.log(resp.data) })
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
                    fixedHeaderScrollHeight='450px'
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
                    selectableRowsComponent={Checkbox}
                    columns={columns}
                    selectableRows
                    data={rows}
                    onRowDoubleClicked={(data) => {
                        setnewdata(data);
                        settransfromname(data.fromname);
                        settranstoname(data.toname);
                        settransval(data.amount);
                        setedittransdate(data.time.split('T')[0]);
                        seteditrefid(data.refid)
                        seteditway(data.way)
                        setedittrans(true);
                    }}
                />
            </div>
            {/* <Dialog open={editrn}>
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
            </Dialog> */}
            <Dialog open={edittrans} onClose={() => { setedittrans(false) }}>
                <DialogTitle>تعديل التحويل</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            margin="dense"
                            label="فاتوره"
                            type="number"
                            value={editrefid}
                            style={{ margin: 10, width: 300 }}
                            size='small'
                            onChange={(e) => { seteditrefid(e.currentTarget.value) }}
                            variant="outlined"
                            focused={editrefiderr !== 'primary'}
                            color={editrefiderr}
                        />
                        <Select
                            variant='outlined'
                            value={editway}
                            size='small'
                            style={{ margin: 10, width: 300 }}
                            onChange={(e) => { seteditway(e.target.value) }}
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
                            style={{ margin: 10, width: 300 }}
                            value={transfromname}
                            onInputChange={(event, newInputValue) => {
                                settransfromname(newInputValue);
                                axios.post('http://localhost:1024/searchmoneyowner', { searchtext: newInputValue }).then((resp) => {
                                    if (resp.data.status == 200) {
                                        settransfromdata(resp.data.foundproduts)
                                    }
                                })
                            }}
                            onFocus={() => {
                                axios.get('http://localhost:1024/moneyowner').then((resp) => {
                                    if (resp.data.status == 200) {
                                        settransfromdata(resp.data.vault)
                                    }
                                })
                            }}
                            disabled={editloading}
                            fullWidth
                            onDoubleClick={() => { seteditrn(true); getcode() }}
                            options={transfromdata.map((option) => option.name)}
                            renderInput={(params) => <TextField {...params} label="الشريك" />}
                            size='small'
                        />
                        <Autocomplete
                            fullWidth
                            id="free-solo-demo"
                            label='d'
                            style={{ margin: 10, width: 300 }}
                            freeSolo
                            value={transtoname}

                            onInputChange={(event, newInputValue) => {
                                settranstoname(newInputValue);
                                axios.post('http://localhost:1024/searchVault', { searchtext: newInputValue }).then((resp) => {
                                    if (resp.data.status == 200) {
                                        settranstodata(resp.data.foundproduts)
                                    }
                                })
                            }}
                            onFocus={() => {
                                axios.get('http://localhost:1024/Vault').then((resp) => {
                                    if (resp.data.status == 200) {
                                        settranstodata(resp.data.vault)
                                    }
                                })
                            }}
                            options={transtodata.map((option) => option.name)}
                            size='small'
                            disabled={editloading}

                            renderInput={(params) => <TextField {...params} label="الخزنه" />}
                            onDoubleClick={() => { seteditrn2(true); getcode() }}
                        />
                        <TextField
                            margin="dense"
                            id="payments"
                            label="المبلغ"
                            type="number"
                            value={transval}
                            onChange={(e) => { settransval(e.currentTarget.value) }}
                            style={{ margin: 10, width: 300 }}
                            disabled={editloading}
                            size={'small'}
                            variant="outlined"
                        />
                        <TextField
                        style={{ margin: 10, width: 300 }}
                        autoFocus
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="التاريخ"
                            type="date"
                            value={edittransdate}
                            disabled={editloading}
                            onChange={(e) => { setedittransdate(e.currentTarget.value) }}
                            variant="outlined"
                        />
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setedittrans(false) }} >الغاء</Button>
                    <Button variant='contained' onClick={async () => {
                        seteditloading(true)
                        axios.post('http://localhost:1024/editMoneyownertransactions', { newdata, transfromname, transtoname, transval, editrefid, edittransdate, way: editway }).then(resp => {
                            if (resp.data.status == 200) {
                                setedittrans(false);
                                axios.get('http://localhost:1024/Moneyownertransactions').then((resp) => {
                                    seteditloading(false)
                                    setrows(resp.data.transaction);
                                })
                                seteditloading(false)
                            } else if (resp.data.status == 400) {
                                seteditloading(false)
                                seteditrefiderr('error')
                                axios.get('http://localhost:1024/Moneyownertransactions').then((resp) => {
                                    setrows(resp.data.transaction);
                                })
                            } else {
                                seteditloading(false)
                                alert('failed')
                            }
                        }).catch(e => { alert(e.message) })
                    }}>حفظ</Button>
                    <Button variant='contained' onClick={async () => {
                        seteditloading(true)
                        axios.post('http://localhost:1024/deleteMoneyownertransaction', { id: newdata.id }).then(resp => {
                            setedittrans(false); axios.get('http://localhost:1024/Moneyownertransactions').then((resp) => {
                                seteditloading(false)
                                setrows(resp.data.transaction);
                            })
                        })
                    }}
                        color='error'
                    >حذف</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Moneyownertransactions