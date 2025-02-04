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
            localStorage.setItem('Theme','light')
        }
}

updatetheme(localStorage.getItem('Theme'))

function Workertransaction() {



    const columns = [
        {
            name: 'م',
            selector: row => row.id,
            sortable: true,
            width: '60px'
        },
        {
            name: 'فاتوره',
            selector: row => row.refid,
            sortable: true,
            width: '100px'
        },
        {
            name: 'الخزينه',
            selector: row => row.fromname,
            sortable: true,
            size: 20
        },
        {
            name: 'المقاول',
            selector: row => row.toname,
            sortable: true,

        },
        {
            name: 'المبلغ',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'التاريخ',
            selector: row => row.time.split('T')[0],
            sortable: true,
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
    const [newexpenses, setnewexpenses] = useState(new Date().toISOString().split('T')[0])
    const [newpayments, setnewpayments] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')
    const [rows, setrows] = useState([
    ]);

    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);

    
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
        axios.get('http://localhost:1024/wtransaction').then((resp) => {
            setrows(resp.data.transaction);
        })
    }, [])
    const getcode = () => {
        axios.get('http://localhost:1024/vault').then((resp) => {
            setnewcode(resp.data.vault.length + 1);
        })
    }
    const search2 = (text) => {
        axios.post('http://localhost:1024/searchWorkers', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsecondvaultdata(resp.data.foundproduts)
            }
        })
    }
    const [date1, setdate1] = useState('primary')
    const [date2, setdate2] = useState('primary')
    const createnewtransaction = () => {
        if (date1 !== 'primary') {
            alert('date is invalid')
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
        if (newexpenses == '') {
            alert('select date')
            return
        }
        if (expenses == '') {
            alert('amount cannot be empty')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addwTransaction', { amount: expenses, refid: refid.toString(), fromname: firstvaultname, toname: secondvaultname, date: newexpenses }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setexpenses(0)
                setfirstvaultname('')
                setsecondvaultname('')
                setrefid('')
                axios.get('http://localhost:1024/wtransaction').then((resp) => {
                    setrows(resp.data.transaction);
                })
            } else if (resp.data.status == 400) {
                setloadrn(false)
                setrefiderr('error')
                axios.get('http://localhost:1024/wtransaction').then((resp) => {
                    setrows(resp.data.transaction);
                })
            } else {
                setloadrn(false)
                alert('failed')
            }
        }).catch((e) => {
            setloadrn(false);
            alert(e.message)
        })
    }

    const [edittrans, setedittrans] = useState(false)
    const [prt, setprt] = useState(false)
    const [refiderr, setrefiderr] = useState('primary')
    const [editrefiderr, seteditrefiderr] = useState('primary')

    const searchrefid = (refid) => {
        axios.post('http://localhost:1024/searchrefidworkertransaction', { refid: refid.toString() }).then((resp) => {
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

    const [selectedRows, setselectedRows] = useState([])
    const [data, setdata] = useState('')
    const [newdata, setnewdata] = useState({})

    const [refreshloading, setrefreshloading] = useState(false)
    const [refid, setrefid] = useState('')
    const [editrefid, seteditrefid] = useState('')
    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [transfromname, settransfromname] = useState('')
    const [transfromdata, settransfromdata] = useState([])

    const [transtoname, settranstoname] = useState('')
    const [transtodata, settranstodata] = useState([])

    const [transval, settransval] = useState(0)
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
                    <h1>{totalprice}</h1>
                </div>
            </Modal>
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
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
                                axios.get('http://localhost:1024/vault').then((resp) => {
                                    if (resp.data.status == 200) {
                                        setfirstvaultdata(resp.data.vault)
                                    }
                                })
                            }}
                            onDoubleClick={() => { seteditrn(true); getcode() }}
                            options={firstvaultdata.map((option) => option.name)}
                            renderInput={(params) => <TextField {...params} label="خزينه" />}
                            size='small'
                        />
                        <Autocomplete
                            id="free-solo-demo"
                            label='d'
                            value={secondvaultname}
                            onFocus={() => {
                                axios.get('http://localhost:1024/Workers').then((resp) => {
                                    setsecondvaultdata(resp.data.clients)
                                })
                            }}
                            freeSolo
                            style={{ margin: 10, width: 200 }}
                            onInputChange={(event, newInputValue) => {
                                setsecondvaultname(newInputValue);
                                search2(newInputValue)
                            }}
                            options={secondvaultdata.map((option) => option.name)}
                            size='small'
                            renderInput={(params) => <TextField {...params} label="مقاول" />}
                        />
                        <TextField
                            margin="dense"
                            id="expenses"
                            label="المبلغ"
                            type="number"
                            value={expenses}
                            size='small'
                            style={{ margin: 10, width: 200 }}
                            onChange={(e) => { setexpenses(e.currentTarget.value) }}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="التاريخ"
                            type="date"
                            style={{ margin: 10, width: 200 }}
                            color={date1}
                            focused={date1 !== 'primary'}
                            value={newexpenses}
                            onChange={(e) => {
                                setnewexpenses(e.currentTarget.value)
                                setdate1(isNaN(Date.parse(new Date(e.currentTarget.value))) || new Date(e.currentTarget.value).getFullYear() > 5000 ? 'error' : 'primary')
                            }}
                            variant="outlined"
                        />
                        <Button disabled={false} variant='contained' onClick={() => { createnewtransaction() }}>تأكيد</Button>

                        <Button style={{ marginLeft: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                            setrefreshloading(true);
                            axios.get('http://localhost:1024/wtransaction').then((resp) => { setrows(resp.data.transaction); setrefreshloading(false); console.log(resp.data) })
                        }} endIcon={<Refresh />}>Refresh</Button>
                    </div>


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
                    selectableRowsComponent={Checkbox}
                    columns={columns}
                    selectableRows
                    data={rows}
                    onRowDoubleClicked={(data) => {
                        setnewdata(data);
                        settransfromname(data.fromname);
                        settranstoname(data.toname);
                        settransval(data.amount);
                        seteditrefid(data.refid);
                        setedittrans(true)
                    }}
                />
            </div>
            <Dialog open={edittrans} onClose={() => { setedittrans(false) }} style={{ backgroundColor: '#00000010' }}>
                <DialogTitle>تعديل التحويل</DialogTitle>
                <DialogContent style={{ backgroundColor: '#00000010' }}>


                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            margin="dense"
                            label="فاتوره"
                            type="number"
                            value={editrefid}
                            style={{ margin: 10, width: 200 }}
                            size='small'
                            onChange={(e) => {
                                seteditrefid(e.currentTarget.value)
                                seteditrefiderr('primary')
                            }}
                            variant="outlined"
                            focused={editrefiderr !== 'primary'}
                            color={editrefiderr}
                        />
                        <Autocomplete
                            id="free-solo-demo"
                            includeInputInList
                            freeSolo
                            style={{ margin: 10, width: 200 }}
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
                            renderInput={(params) => <TextField {...params} label="خزينه" />}
                            size='small'
                        />
                        <Autocomplete
                            id="free-solo-demo"
                            label='d'
                            value={transtoname}
                            onFocus={() => {
                                axios.get('http://localhost:1024/Workers').then((resp) => {
                                    settranstodata(resp.data.clients)
                                })
                            }}
                            freeSolo
                            style={{ margin: 10, width: 200 }}
                            onInputChange={(event, newInputValue) => {
                                settranstoname(newInputValue);
                                search2(newInputValue)
                            }}
                            options={transtodata.map((option) => option.name)}
                            size='small'
                            renderInput={(params) => <TextField {...params} label="مقاول" />}
                        />
                        <TextField
                            margin="dense"
                            id="payments"
                            label="المبلغ"
                            type="number"
                            value={transval}
                            onChange={(e) => { settransval(e.currentTarget.value) }}
                            style={{ margin: 10, width: 200 }}
                            size={'small'}
                            variant="outlined"
                        />
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setedittrans(false) }} >الغاء</Button>
                    <Button variant='contained' color='error' onClick={() => {
                        axios.post('http://localhost:1024/delwtransaction', { newdata }).then(resp => {
                            if (resp.data.status == 200) {
                                setedittrans(false);
                                axios.get('http://localhost:1024/wtransaction').then((resp) => {
                                    setrows(resp.data.transaction);
                                })
                            }
                        }).catch((e) => { alert(e.message) })
                    }} >حذف</Button>
                    <Button variant='contained' onClick={async () => {
                        axios.post('http://localhost:1024/editwtransaction', { newdata, transfromname, transtoname, transval, editrefid: editrefid.toString() }).then(resp => {
                            if (resp.data.status == 200) {
                                setedittrans(false);
                                axios.get('http://localhost:1024/wtransaction').then((resp) => {
                                    setrows(resp.data.transaction);
                                })
                            } else if (resp.data.status == 400) {
                                seteditrefiderr('error')
                            }
                        }).catch((e) => { alert(e.message) })

                    }}>حفظ</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Workertransaction