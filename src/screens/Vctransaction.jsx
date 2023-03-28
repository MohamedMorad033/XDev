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
function Vctransaction() {

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
            label: 'منصرف',
        },
        {
            value: 'in',
            label: 'وارد',
        },
    ];
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
            width: '60px',
            omit: !a
        },
        {
            name: 'فاتوره',
            selector: row => row.refid ? row.refid : 'Na',
            sortable: true,
            width: '100px',
            omit: !b
        },
        {
            name: 'وارد / منصرف',
            selector: row => row.way == 'in' ? 'وارد' : 'منصرف',
            sortable: true,
            omit: !c
        },
        {
            name: 'من',
            selector: row => row.way == 'out' ? row.fromname : row.toname,
            sortable: true,
            grow: 2,
            omit: !d
        },
        {
            name: 'الي',
            selector: row => row.way == 'in' ? row.fromname : row.toname,
            sortable: true,
            grow: 3,
            omit: !e
        },

        {
            name: 'تاريخ',
            selector: row => row.time.split('T')[0],
            sortable: true,
            grow: 3,
            omit: !f
        },
        {
            name: 'المبلغ',
            selector: row => row.amount,
            sortable: true,
            omit: !g,
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
        axios.get('http://localhost:1024/cvtransaction').then((resp) => {
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
        axios.post('http://localhost:1024/deletevaultclienttransaction', { id: data.id }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/cvtransaction').then((resp) => {
                    setrows(resp.data.cvtransaction);
                })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const edittrans = () => {
        if (clientname === '') {
            alert('client cannot be empty')
            return
        }
        if (vaultname === '') {
            alert('vault cannot be ampty')
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
        setloadrn(true)
        axios.post('http://localhost:1024/editvaultclienttransaction', { id: data.id, fromname: vaultname, toname: clientname, amount: editamount, type: editsel, refid: editrefid.toString(), time: editdate }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/cvtransaction').then((resp) => {
                    setrows(resp.data.cvtransaction);
                })
            } else if (resp.data.status == 400) {
                setloadrn(false)
                seteditrefiderr('error')
                axios.get('http://localhost:1024/cvtransaction').then((resp) => {
                    setrows(resp.data.cvtransaction);
                })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const [refiderr, setrefiderr] = useState('primary')
    const [editrefiderr, seteditrefiderr] = useState('primary')
    const [selectedRows, setselectedRows] = useState([])
    const [prt, setprt] = useState(false)
    const [refid, setrefid] = useState()
    const submittrans = () => {
        setrefreshloading(true)
        axios.post('http://localhost:1024/addvaultclienttransaction', { fromname: secondvaultname, toname: firstvaultname, amount: Number(amount), type: newsel, refid: refid.toString(), time: newexpenses }).then((resp) => {
            if (resp.data.status == 200) {
                setrefreshloading(false)
                console.log(resp.data)
                seteditrn(false)
                setsecondvaultname('');
                setfirstvaultname('');
                setamount(0);
                setnewsel('in');
                setrefid(Number(refid) + 1)
                axios.get('http://localhost:1024/cvtransaction').then((resp) => {
                    setrows(resp.data.cvtransaction);
                })
            } else if (resp.data.status == 400) {
                setrefreshloading(false)
                setrefiderr('error')
                axios.get('http://localhost:1024/cvtransaction').then((resp) => {
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
            <Button color='error' variant='contained' onClick={() => { }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                setprt(true); setTimeout(() => {
                    window.print()
                }, 200);
            }}>print</Button>
        </>
    );

    const [refreshloading, setrefreshloading] = useState(false)

    const [editsel, seteditsel] = useState('in')
    const [amount, setamount] = useState(0)

    const [editamount, seteditamount] = useState(0)
    const [editrefid, seteditrefid] = useState(0)
    const [editdate, seteditdate] = useState('')
    const searchrefid = (refid) => {
        axios.post('http://localhost:1024/searchrefidvaultclienttransaction', { fromname: secondvaultname, toname: firstvaultname, amount: Number(amount), type: newsel, refid: refid.toString(), time: newexpenses }).then((resp) => {
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
    const generalsearch = (cln, prd, rfd, dat, fdt) => {
        setsearchload(true);
        axios.post('http://localhost:1024/searchcvtransgeneral', { product: prd, client: cln, refid: rfd, date: dat, fdate: fdt }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.results)
                setsearchload(false)
            }
        })
    }
    const [filter, setfilter] = useState(true)
    const [srefid, setsrefid] = useState('') 
    const [svaultdata, setsvaultdata] = useState([]) 
    const [sclientdata, setsclientdata] = useState([]) 
    const [sclient, setsclient] = useState('')
    const [svault, setsvault] = useState('')
    const [fdate, setfdate] = useState(new Date().toISOString().split('T')[0])
    const actions = [
        { icon: <FilterAltIcon onClick={() => { setfilter(!filter) }} />, name: 'Filter' },
        { icon: <SaveIcon onClick={(e) => { exportToCsv(e) }} />, name: 'Save' },
        {
            icon: <PrintIcon onClick={(e) => {
                axios.post('http://localhost:1024/print/vaultclienttransactions', { rows: rows }).then((resp) => {
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
                            axios.get('http://localhost:1024/vault').then((resp) => {
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
                        renderInput={(params) => <TextField {...params} label="الخزينه" />}
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginBottom: 10 }}
                        fullWidth
                        onFocus={() => {
                            axios.get('http://localhost:1024/clients').then((resp) => {
                                setsclientdata(resp.data.clients)
                            })
                        }}
                        freeSolo
                        value={svault}
                        onInputChange={(event, newInputValue) => {
                            setsvault(newInputValue);
                            search2(newInputValue)
                            generalsearch(sclient, newInputValue, srefid, new Date(date), new Date(fdate))
                        }}
                        options={sclientdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="العميل \ المورد" />}
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
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={f} onChange={(e) => { sf(e.target.checked); }} />} label="الكميه  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={g} onChange={(e) => { sg(e.target.checked); }} />} label="سعر القطعه  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={h} onChange={(e) => { sh(e.target.checked); }} />} label="اجمالي المبلغ  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={i} onChange={(e) => { si(e.target.checked); }} />} label="تاريخ الاستلام  ." />
                    </FormGroup>
                    <FormGroup style={{ flex: 1, alignItems: 'flex-end' }}>
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={a} onChange={(e) => { sa(e.target.checked); }} />} label="م  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={b} onChange={(e) => { sb(e.target.checked); }} />} label="فاتوره  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={c} onChange={(e) => { sc(e.target.checked); }} />} label="مرتجع؟  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={d} onChange={(e) => { sd(e.target.checked); }} />} label="المورد  ." />
                        <FormControlLabel labelPlacement='start' control={<Checkbox checked={e} onChange={(e) => { se(e.target.checked); }} />} label="الصنف  ." />
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
                            onDoubleClick={() => { seteditrn(true); getcode() }}
                            options={firstvaultdata.map((option) => option.name)}
                            renderInput={(params) => <TextField {...params} label="مورد / عميل" />}
                            size='small'
                        />
                        <Autocomplete
                            id="free-solo-demo"
                            label='d'
                            style={{ margin: 10, width: 200 }}

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

                            renderInput={(params) => <TextField {...params} label="خزينه" />}
                            onDoubleClick={() => { seteditrn2(true); getcode() }}
                        />
                        <TextField
                            margin="dense"
                            id="expenses"
                            label="المبلغ"
                            type="number"
                            value={amount}
                            style={{ margin: 10, width: 100 }}
                            size='small'
                            onChange={(e) => { setamount(e.currentTarget.value) }}
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
                    </div>
                    <DataTable
                        pagination
                        theme='newtheme'
                        dense
                        paginationPerPage={100}
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
                            setclientname(data.toname);
                            seteditamount(data.amount);
                            setvaultname(data.fromname);
                            setselid(data.id);
                            seteditsel(data.way);
                            seteditrefid(data.refid);
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
                            focused={editrefiderr !== 'primary'}
                            color={editrefiderr}
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
                        <Autocomplete
                            id="free-solo-demo"
                            label='d'
                            style={{ margin: 10, width: 200 }}

                            freeSolo
                            value={vaultname}

                            onInputChange={(event, newInputValue) => {
                                setvaultname(newInputValue);
                                search2(newInputValue)

                            }}
                            onFocus={() => {
                                axios.get('http://localhost:1024/vault').then((resp) => {
                                    if (resp.data.status == 200) {
                                        setvaultdata(resp.data.vault)
                                    }
                                })
                            }}
                            options={vaultdata.map((option) => option.name)}
                            size='small'

                            renderInput={(params) => <TextField {...params} label="خزينه" />}
                            onDoubleClick={() => { seteditrn2(true); getcode() }}
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
        </div>
    )
}

export default Vctransaction