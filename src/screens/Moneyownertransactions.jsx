import React, { useEffect, useState, useRef, useMemo } from 'react'
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
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DataTable, { createTheme } from 'react-data-table-component';
import { FormControlLabel, FormGroup } from '@mui/material';
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
function Moneyownertransactions() {


    const [date, setdate] = useState(new Date().toISOString().split('T')[0])
    const [a, sa] = useState(true)
    const [b, sb] = useState(true)
    const [c, sc] = useState(true)
    const [d, sd] = useState(true)
    const [e, se] = useState(true)
    const [f, sf] = useState(true)
    const [g, sg] = useState(true)
    const [h, sh] = useState(true)
    const [i, si] = useState(true)
    const columns = [
        {
            name: 'م',
            selector: row => row.id,
            sortable: true,
            width: '100px',
            omit: !a
        },
        {
            name: 'فاتوره؟',
            selector: row => row.refid,
            sortable: true,
            omit: !b
        },
        {
            name: 'وارد/منصرف',
            selector: row => row.way == 'in' ? 'وارد' : "منصرف",
            sortable: true,
            omit: !c
        },
        {
            name: 'الشريك',
            selector: row => row.fromname,
            sortable: true,
            size: 20,
            omit: !d
        },
        {
            name: 'الخزينه',
            selector: row => row.toname,
            sortable: true,
            omit: !e
        },
        {
            name: 'المبلغ',
            selector: row => row.amount,
            sortable: true,
            omit: !f
        },
        {
            name: 'تاريخ',
            selector: row => row.time.split('T')[0],
            sortable: true,
            omit: !g
        }
    ];

    const [vaultname, setvaultname] = useState('')
    const [clientname, setclientname] = useState('')
    const [vaultdata, setvaultdata] = useState([])
    const [clientdata, setclientdata] = useState([])

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })

        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const exportToCsv = e => {
        var data = []
        // Headers for each column
        let headers = ["id", "refid", "from", "fromid", "toid", "to", "remainigtotal", "amount", "remaining", "totalprice", "price", "type", "time"]

        // Convert users data to a csv
        let usersCsv = rows.reduce((acc, row) => {
            const { id, refid, from, fromid, toid, to, remainigtotal, amount, remaining, totalprice, price, type, time } = row
            acc.push([id, refid, from, fromid, toid, to, remainigtotal, amount, remaining, totalprice, price, type, time.split("T")[0]].join(','))
            return acc
        }, [])
        data.push(headers.join(','))
        data.push(...usersCsv)
        var BOM = "\uFEFF";
        var csvContent = BOM + data.join('\n');
        downloadFile({
            data: csvContent,
            fileName: 'Product_Imports.csv',
            fileType: 'text/csv;charset=utf-8',
        })
    }

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
    const [newprice, setnewprice] = useState('0')
    const [newamount, setnewamount] = useState('0')
    const [data, setdata] = useState(new Date().toISOString().split('T')[0])

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
        if (date1 !== 'primary') {
            alert('date is wrong')
            return
        }
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


    const [selectedRows, setselectedRows] = useState([])
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
    const generalsearch = (vlt, cln, rfd, dat, fdt) => {
        setsearchload(true);
        axios.post('http://localhost:1024/searchmtransgeneral', { vault: cln, client: vlt, refid: rfd, date: dat, fdate: fdt }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.results)
                setsearchload(false)
            }
        })
    }

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
    const [filter, setfilter] = useState(false)
    const [srefid, setsrefid] = useState('')
    const [svaultdata, setsvaultdata] = useState([])
    const [sclientdata, setsclientdata] = useState([])
    const [sclient, setsclient] = useState('')
    const [svault, setsvault] = useState('')
    const [date1, setdate1] = useState('primary')
    const [date2, setdate2] = useState('primary')
    const [fdate, setfdate] = useState(new Date().toISOString().split('T')[0])
    const actions = [
        { icon: <FilterAltIcon onClick={() => { setfilter(!filter) }} />, name: 'Filter' },
        { icon: <SaveIcon onClick={(e) => { exportToCsv(e) }} />, name: 'Save' },
        {
            icon: <PrintIcon onClick={(e) => {
                axios.post('http://localhost:1024/print/moneyownertransactions', { rows: rows }).then((resp) => {
                    setTimeout(() => {
                        window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                    }, 500);
                })
            }} />, name: 'Print'
        },
        { icon: <ShareIcon />, name: 'Share' },
    ];
    return (
        <div style={{ width: '100%', flexDirection: 'row', display: 'flex', alignItems: 'flex-start' }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
            <div hidden={filter} style={{
                width: '30%',
                height: window.innerHeight - 46,
                borderRightColor: '#000',
                borderRightWidth: 1,
                borderRightStyle: 'solid',
                backgroundColor: '#8888882b',
                padding: 10,
                transition: "all .2s",
                opacity: filter ? "0" : "1",
                transition: "all .2s",
                visibility: filter ? "hidden" : "visible",
            }}>
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="code"
                        size='small'
                        type="number"
                        value={srefid}
                        style={{ marginBottom: 10 }}
                        fullWidth
                        onChange={(e) => {
                            setsrefid(e.currentTarget.value)
                            generalsearch(sclient, svault, e.currentTarget.value, new Date(date), new Date(fdate))
                        }}
                        variant="outlined"
                        label='الرقم المرجعى'
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginBottom: 10 }}
                        fullWidth
                        onFocus={() => {
                            axios.get('http://localhost:1024/moneyowner').then((resp) => {
                                setsvaultdata(resp.data.vault)
                            })
                        }}
                        freeSolo
                        value={sclient}
                        onInputChange={(event, newInputValue) => {
                            setsclient(newInputValue);
                            generalsearch(newInputValue, svault, srefid, new Date(date), new Date(fdate))
                        }}
                        options={svaultdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="الشريك" />}
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginBottom: 10 }}
                        fullWidth
                        onFocus={() => {
                            axios.get('http://localhost:1024/vault').then((resp) => {
                                setsclientdata(resp.data.vault)
                            })
                        }}
                        freeSolo
                        value={svault}
                        onInputChange={(event, newInputValue) => {
                            setsvault(newInputValue);
                            generalsearch(sclient, newInputValue, srefid, new Date(date), new Date(fdate))
                        }}
                        options={sclientdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="الخزينه" />}
                    />
                    <TextField
                        style={{ marginBottom: 10 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        fullWidth
                        id="date"
                        label="من تاريخ"
                        type="date"
                        value={fdate}
                        onChange={(e) => {
                            setfdate(e.currentTarget.value)
                            if (new Date(date)) {
                                console.log({ date, datee: new Date(date) })
                                generalsearch(sclient, svault, srefid, new Date(date), new Date(e.currentTarget.value),)

                            }
                        }}
                        onBlur={() => {
                            if (!new Date(date)) {
                                setfdate(new Date().toISOString().split('T')[0])
                            }
                        }}
                        variant="outlined"
                        onDoubleClick={() => { }}
                    />
                    <TextField
                        style={{ marginBottom: 10 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        fullWidth
                        id="date"
                        label="حتي تاريخ"
                        type="date"
                        value={date}
                        onChange={(e) => {
                            setdate(e.currentTarget.value)
                            if (new Date(date)) {
                                console.log({ date, datee: new Date(date) })
                                generalsearch(sclient, svault, srefid, new Date(e.currentTarget.value), new Date(fdate))

                            }
                        }}
                        onBlur={() => {
                            if (!new Date(date)) {
                                setdate(new Date().toISOString().split('T')[0])
                            }
                        }}
                        variant="outlined"
                        onDoubleClick={() => { }}
                    />
                </div>
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                    <Button disabled={searchload} style={{ flex: 1, marginRight: 5 }} variant='outlined' color='warning'
                        onClick={() => {
                            generalsearch(sclient, svault, srefid, new Date(date), new Date(fdate))
                        }}>
                        Search
                    </Button>
                    <Button disabled={searchload} style={{ flex: 1, marginLeft: 5, marginRight: 5 }} variant='outlined' color='primary'
                        onClick={() => {
                            setsclient('')
                            setsvault('')
                            setsrefid('')
                            setdate(new Date().toISOString().split('T')[0])
                            generalsearch('', '', '', new Date(), new Date('01-01-2000'))
                        }}>
                        All
                    </Button>
                    <Button disabled={searchload} style={{ flex: 1, marginLeft: 5 }} variant='outlined' color='error'
                        onClick={() => {
                            setsclient('')
                            setsvault('')
                            setsrefid('')
                            setdate(new Date().toISOString().split('T')[0])
                            setfdate(new Date().toISOString().split('T')[0])
                            setrows([])
                        }}>
                        Reset
                    </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                    <FormGroup style={{ flex: 1, alignItems: 'flex-end' }}>
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={e} onChange={(e) => { se(e.target.checked); }} />} label="الخزينه  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={f} onChange={(e) => { sf(e.target.checked); }} />} label="المبلغ  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={g} onChange={(e) => { sg(e.target.checked); }} />} label="التاريخ  ." />
                    </FormGroup>
                    <FormGroup style={{ flex: 1, alignItems: 'flex-end' }}>
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={a} onChange={(e) => { sa(e.target.checked); }} />} label="م  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={b} onChange={(e) => { sb(e.target.checked); }} />} label="فاتوره  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={c} onChange={(e) => { sc(e.target.checked); }} />} label="وارد\منصرف ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={d} onChange={(e) => { sd(e.target.checked); }} />} label="الشريك  ." />
                    </FormGroup>
                </div>
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                    <Button style={{ flex: 1, marginRight: 5 }} variant='outlined' color='success'
                        onClick={() => {
                            sf(true);
                            sg(true);
                            sh(true);
                            si(true);
                            sa(true);
                            sb(true);
                            sc(true);
                            sd(true);
                            se(true);
                        }}>
                        Select All
                    </Button>
                    <Button style={{ flex: 1, marginLeft: 5 }} variant='outlined' color='error'
                        onClick={() => {
                            sf(false);
                            sg(false);
                            sh(false);
                            si(false);
                            sa(false);
                            sb(false);
                            sc(false);
                            sd(false);
                            se(false);
                        }}>
                        Unselect All
                    </Button>
                </div>
            </div>
            <div style={{ width: filter ? '100%' : '80%', minHeight: window.innerHeight - 46, display: 'flex', flexDirection: 'column' }} onClick={() => { setfilter(true) }}>
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
                            color={date1}
                            focused={date1 !== 'primary'}
                            value={transdate}
                            onChange={(e) => {
                                settransdate(e.currentTarget.value)
                                setdate1(isNaN(Date.parse(new Date(e.currentTarget.value))) || new Date(e.currentTarget.value).getFullYear() > 5000 ? 'error' : 'primary')
                            }}
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
                                color={date2}
                                focused={date2 !== 'primary'}
                                onChange={(e) => {
                                    setedittransdate(e.currentTarget.value)
                                    setdate2(isNaN(Date.parse(new Date(e.currentTarget.value))) || new Date(e.currentTarget.value).getFullYear() > 5000 ? 'error' : 'primary')
                                }} variant="outlined"
                            />
                        </div>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setedittrans(false) }} >الغاء</Button>
                        <Button variant='contained' onClick={async () => {
                            if (date2 !== 'primary') {
                                alert('date is invalid')
                                return
                            }
                            if (transfromname === '') {
                                alert('client cannot be empty')
                                return
                            }
                            if (transtoname === '') {
                                alert('vault cannot be empty')
                                return
                            }
                            if (editrefid === '') {
                                alert('refid cannot be empty')
                                return
                            }
                            if (transval === '') {
                                alert('please enter an amount')
                                return
                            }
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
        </div>
    )
}

export default Moneyownertransactions