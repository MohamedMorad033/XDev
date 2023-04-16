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

function ProductHistory() {

    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);
    const [a, sa] = useState(true)
    const [b, sb] = useState(true)
    const [c, sc] = useState(true)
    const [d, sd] = useState(true)
    const [e, se] = useState(true)
    const [f, sf] = useState(true)
    const [g, sg] = useState(true)
    const [h, sh] = useState(true)
    const [i, si] = useState(true)
    const columns = useMemo(
        () => [
            {
                name: 'id',
                selector: row => row.id,
                sortable: true,
                width: '60px',
                reorder: true,
                omit: !a
            },
            {
                name: 'فاتوره',
                selector: row => Number(row.refid),
                sortable: true,
                width: '100px',
                reorder: true,
                omit: !b
            },
            {
                name: 'مرتجع؟',
                selector: row => row.type == 1 ? '✔' : '✘',
                sortable: true,
                width: '100px',
                reorder: true,
                omit: !c
            },
            {
                name: 'المورد',
                selector: row => row.from,
                sortable: true,
                grow: 2,
                reorder: true,
                omit: !d
            },
            {
                name: 'الصنف',
                selector: row => row.to,
                sortable: true,
                grow: 3,
                reorder: true,
                omit: !e
            },
            {
                name: 'الكميه',
                selector: row => row.amount,
                sortable: true,
                reorder: true,
                omit: !f
            },
            {
                name: 'سعر القطعه',
                selector: row => row.price.toFixed(2).toString().split('.')[1] == '00' ? row.price : row.price.toFixed(2),
                sortable: true,
                reorder: true,
                omit: !g
            },

            {
                name: 'السعر الكلي',
                selector: row => row.totalprice.toFixed(2).toString().split('.')[1] == '00' ? row.totalprice : row.totalprice.toFixed(2),
                sortable: true,
                reorder: true,
                omit: !h
            },
            {
                name: 'تاريخ الاضافه',
                selector: row => row.time.split('T')[0],
                sortable: true,
                reorder: true,
                omit: !i
            },
        ], [a, b, c, d, e, f, g, h, i])
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
            value: 'unit',
            label: 'Units',
        },
        {
            value: 'kg',
            label: 'Kg',
        },
        {
            value: 'M',
            label: 'Meter',
        },
        {
            value: 'm2',
            label: 'Meter Square',
        },
    ];


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

    const exportToJson = e => {
        downloadFile({
            data: JSON.stringify(rows),
            fileName: 'Product_Imports.json',
            fileType: 'text/json',
        })
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


    const actions = [
        { icon: <FilterAltIcon onClick={() => { setfilter(!filter) }} />, name: 'Filter' },
        { icon: <SaveIcon onClick={(e) => { exportToCsv(e) }} />, name: 'Save' },
        {
            icon: <PrintIcon onClick={(e) => {
                axios.post('http://localhost:1024/print/lots', { rows: rows, rows2: rows }).then((resp) => {
                    setTimeout(() => {
                        window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                    }, 500);
                })
            }} />, name: 'Print'
        },
        { icon: <ShareIcon />, name: 'Share' },
    ];


    const [firstvaultname, setfirstvaultname] = useState('')
    const [secondvaultname, setsecondvaultname] = useState('')
    const [theirdvaultname, settheirdvaultname] = useState('')
    const [firstvaultdata, setfirstvaultdata] = useState([])
    const [secondvaultdata, setsecondvaultdata] = useState([])
    const [theirdvaultdata, settheirdvaultdata] = useState([])
    const [sel, setsel] = useState('unit')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState(0)
    const [payments, setpayments] = useState(0)
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)
    const [loadrn3, setloadrn3] = useState(false)
    const [newsel, setnewsel] = useState('seller')
    const [newname, setnewname] = useState('')
    const [newprodname, setnewprodname] = useState('')
    const [newexpenses, setnewexpenses] = useState('0')
    const [newcamount, setnewcamount] = useState(0)
    const [newpayments, setnewpayments] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')
    const [rows, setrows] = useState([]);
    const [date, setdate] = useState(new Date().toISOString().split('T')[0])
    const [editrn, seteditrn] = useState(false)
    const [editrn2, seteditrn2] = useState(false)
    const search1 = (text) => {
        axios.post('http://localhost:1024/searchclients', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setfirstvaultdata(resp.data.foundproduts)
            }
        })
    }
    const search = (text) => {
        axios.post('http://localhost:1024/searchclients', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                settheirdvaultdata(resp.data.foundproduts)
            }
        })
    }
    const getcode = () => {
        axios.get('http://localhost:1024/vault').then((resp) => {
            setnewcode(resp.data.vault.length + 1);
        })
    }
    const search2 = (text) => {
        axios.post('http://localhost:1024/searchproduct', { searchtext: text }).then((resp) => {
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
    const [data, setdata] = useState('')

    const componentRef = useRef();

    const editlot = () => {
        if (!newdata) {
            alert('data cannot be empty')
            return
        }
        if (newexpenses === '') {
            alert('please enter an amount')
            return
        }
        if (newpayments === '') {
            alert('please enter a price')
            return
        }
        console.log(newdata)
        axios.post('http://localhost:1024/editlot', { lotid: newdata.id, newprice: newpayments, newamount: newexpenses }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                const index = rows.findIndex(obj => obj.id == resp.data.newdata.id)
                var newrows = rows
                newrows[index] = resp.data.newdata
                console.log({ data: newrows[index] })
                setrows([])
                setrows([...newrows])
                setloadrn3(false)
                seteditrn(false)
            } else {
                setloadrn(false)
                alert('failed')
            }
        }).catch(e => {
            setloadrn(false)
            alert(e.message)
        })
    }
    const generalsearch = (cln, prd, rfd, dat, fdt) => {
        setsearchload(true);
        axios.post('http://localhost:1024/searchproducthistorygeneral', { product: prd, client: cln, refid: rfd, date: dat, fdate: fdt }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.results)
                setsearchload(false)
                var sum = 0
                var asum = 0
                resp.data.foundproduts.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.foundproduts.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount(asum)
                settotalprice(sum)
            }
        })
    }
    const searchprod = () => {
        setloadrn(true);
        axios.post('http://localhost:1024/searchproducthistoryexact', { searchtext: secondvaultname }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.foundproduts)
                var sum = 0
                var asum = 0
                resp.data.foundproduts.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.foundproduts.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount(asum)
                settotalprice(sum)
            }
        })
    }
    const searchrefid = () => {
        setloadrn(true);
        axios.post('http://localhost:1024/searchlotsbyrefid', { refid }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.foundproduts)
                var sum = 0
                var asum = 0
                resp.data.foundproduts.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.foundproduts.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount(asum)
                settotalprice(sum)
            }
        })
    }
    const searchclient = () => {
        setloadrn(true);
        axios.post('http://localhost:1024/searchproducthistoryexactbyclient', { searchtext: firstvaultname }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.foundproduts)
                var sum = 0
                var asum = 0
                resp.data.foundproduts.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.foundproduts.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount(asum)
                settotalprice(sum)
            }
        })
    }
    const [prt, setprt] = useState(false)





    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)

    const [selectableRows, setselectedRows] = useState()

    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => { }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                axios.post('http://localhost:1024/print/lots', { rows: selectableRows }).then((resp) => {
                    window.open('localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                })
            }}>print</Button>
        </>
    );
    const [refid, setrefid] = useState()

    const [fdate, setfdate] = useState(new Date().toISOString().split('T')[0])

    const [refreshloading, setrefreshloading] = useState(false)



    const [newdata, setnewdata] = useState({})
    const [filter, setfilter] = useState(false)

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
                        value={refid}
                        style={{ marginBottom: 10 }}
                        fullWidth
                        onChange={(e) => {
                            setrefid(e.currentTarget.value)
                            generalsearch(firstvaultname, secondvaultname, e.currentTarget.value, new Date(date), new Date(fdate))
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
                            axios.get('http://localhost:1024/clients').then((resp) => {
                                setfirstvaultdata(resp.data.clients)
                            })
                        }}
                        freeSolo
                        value={firstvaultname}
                        onInputChange={(event, newInputValue) => {
                            setfirstvaultname(newInputValue);
                            search1(newInputValue)
                            generalsearch(newInputValue, secondvaultname, refid, new Date(date), new Date(fdate))
                        }}
                        options={firstvaultdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="المورد" />}
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginBottom: 10 }}
                        fullWidth
                        onFocus={() => {
                            axios.get('http://localhost:1024/products').then((resp) => {
                                setsecondvaultdata(resp.data.products)
                            })
                        }}
                        freeSolo
                        value={secondvaultname}
                        onInputChange={(event, newInputValue) => {
                            setsecondvaultname(newInputValue);
                            search2(newInputValue)
                            generalsearch(firstvaultname, newInputValue, refid, new Date(date), new Date(fdate))
                        }}
                        options={secondvaultdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="الصنف" />}
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
                                generalsearch(firstvaultname, secondvaultname, refid, new Date(date), new Date(e.currentTarget.value),)

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
                                generalsearch(firstvaultname, secondvaultname, refid, new Date(e.currentTarget.value), new Date(fdate))

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
                            generalsearch(firstvaultname, secondvaultname, refid, new Date(date), new Date(fdate))
                        }}>
                        Search
                    </Button>
                    <Button disabled={searchload} style={{ flex: 1, marginLeft: 5, marginRight: 5 }} variant='outlined' color='primary'
                        onClick={() => {
                            setfirstvaultname('')
                            setsecondvaultname('')
                            setrefid('')
                            setdate(new Date().toISOString().split('T')[0])
                            generalsearch('', '', '', new Date(), new Date('01-01-2000'))
                        }}>
                        All
                    </Button>
                    <Button disabled={searchload} style={{ flex: 1, marginLeft: 5 }} variant='outlined' color='error'
                        onClick={() => {
                            setfirstvaultname('')
                            setsecondvaultname('')
                            setrefid('')
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
                <Modal open={prt} onFocus={() => { window.print() }} onClose={() => { setprt(false) }}>
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
                                    <h4>فاتوره ايرادات</h4>
                                </div>
                            </div>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <DataTable
                                    dense
                                    direction="rtl"
                                    columns={columns}
                                    data={selectableRows}
                                />
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'start' }}>
                                    <Typography color={'#000'} style={{ marginLeft: 50 }}>
                                        اجمالي المبلغ : {totalprice}
                                    </Typography>
                                    <Typography color={'#000'} style={{ marginLeft: 50 }}>
                                        اجمالي الكميه : {totalamount}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <h1>{totalprice}</h1>
                    </div>
                </Modal>
                <div style={{ width: '100%' }}>
                    <DataTable
                        pagination
                        dense
                        theme='newtheme'
                        paginationPerPage={100}
                        highlightOnHover
                        pointerOnHover
                        fixedHeader
                        fixedHeaderScrollHeight='400px'
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
                            seteditrn(true);
                            setnewexpenses(data.amount);
                            setnewpayments(data.price)
                        }}
                    />
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'start', alignItems: 'center' }}>
                        <Typography color={'#fff'} style={{ marginLeft: 50 }}>
                            اجمالي المبلغ : {totalprice.toFixed(3)}
                        </Typography>
                        <Typography color={'#fff'} style={{ marginLeft: 50 }}>
                            السعر : {(totalprice / totalamount).toFixed(3)}
                        </Typography>
                        <Typography color={'#fff'} style={{ marginLeft: 50 }}>
                            اجمالي الكميه : {totalamount.toFixed(3)}
                        </Typography>
                        <Button style={{ marginLeft: 50 }} variant='outlined' onClick={() => {
                            var sum = 0
                            var asum = 0
                            rows.forEach(function (value, index, arry) {
                                sum += value.totalprice;
                            });
                            rows.forEach(function (value, index, arry) {
                                asum += value.amount;
                            });
                            settotalamount(asum)
                            settotalprice(sum)
                        }}>total</Button>
                    </div>
                </div>
                <Dialog open={editrn} onClose={() => { seteditrn(false) }}>
                    <DialogTitle>تعديل فاتوره صنف</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            size='small'
                            fullWidth
                            label="اسم الصنف"
                            type="text"
                            value={newdata.to}
                            variant="outlined"
                            disabled
                        />
                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="الكميه"
                            type="number"
                            value={newexpenses}
                            onChange={(e) => { setnewexpenses(e.currentTarget.value) }}
                            variant="outlined"
                        />
                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="السعر"
                            type="number"
                            value={newpayments}
                            onChange={(e) => { setnewpayments(e.currentTarget.value) }}
                            variant="outlined"
                        />
                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="total"
                            type="number"
                            disabled
                            value={newpayments * newexpenses}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                        <Button disabled={loadrn3} variant='contained' onClick={() => { editlot() }}>حفظ</Button>
                    </DialogActions>
                </Dialog>
            </div >
        </div >
    )
}

export default ProductHistory