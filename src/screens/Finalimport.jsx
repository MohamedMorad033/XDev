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
import Collapse from '@mui/material/Collapse';

import DataTable, { createTheme } from 'react-data-table-component';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, CheckBoxOutlined, ExpandLess, ExpandMore } from '@mui/icons-material';
function Finalimport() {

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
    const columns = [
        {
            name: 'النوع',
            selector: row => row.type == 0 ? 'كرتون' : 'وزن',
            sortable: true,
            grow: 1,
            conditionalCellStyles: [
                {
                    when: row => row.type == 1,
                    style: {
                        backgroundColor: 'rgba(255, 70, 70, 1)',
                        color: 'white'
                    }
                },
                {
                    when: row => row.type == 0,
                    style: {
                        backgroundColor: 'rgb(70, 255, 103)',
                        color: 'black',
                    }
                }
            ]
        },
        {
            name: 'الصنف',
            selector: row => row.to,
            sortable: true,
            grow: 3,
        },

        {
            name: 'العميل',
            selector: row => row.from,
            sortable: true,
            grow: 3,
        },
        {
            name: 'الكميه',
            selector: row => row.amount,
            sortable: true,

        },
        {
            name: 'مرتجع',
            selector: row => row.return,
            sortable: true,
        },
        {
            name: 'اجمالي الكميه',
            selector: row => row.amount - row.return,
            sortable: true,
        },
        {
            name: 'سعر القطعه',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'السعر الكلي',
            selector: row => row.totalprice,
            sortable: true,
        },
    ]




    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);

    useEffect(() => {
        const AccesToken = localStorage.getItem('AccesToken');
        if (AccesToken) {
            setAccesToken(AccesToken);
        }
        const Theme = localStorage.getItem('Theme');
        if (Theme == 'dark' || Theme == 'light') {
            updatetheme(Theme);
        } else {
            localStorage.setItem('Theme', 'light')
            updatetheme('light')
        }
    }, []);

    const updatetheme = (theme) => {
        if (theme == 'dark') {
            set_dark_theme_en('dark')
            document.documentElement.style.setProperty('--firstcolor', '#0c0c0c');
            document.documentElement.style.setProperty('--seconscolor', '#0c0c0c');
            document.documentElement.style.setProperty('--headercolor', '#23282e18');
            createTheme('newtheme', {
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
                set_dark_theme_en('light')
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
            }
    }
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
    const [newexpenses, setnewexpenses] = useState(new Date().toISOString().split('T')[0])
    const [newcamount, setnewcamount] = useState(0)
    const [newpayments, setnewpayments] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')
    const [editprice, seteditprice] = useState(0)
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

    const createnewexport = () => {
        if (date1 !== 'primary') {
            alert('date is wrong')
            return
        }
        if (!rows) {
            alert('data cannot be empty')
            return
        }
        if (newexpenses == '') {
            alert('select date')
            return
        }
        if (!firstvaultname) {
            alert('select client')
            return
        }
        setsubmit(true)
        console.log(rows)
        axios.post('http://localhost:1024/addfinalimport', { rows, refid, client: firstvaultname, time: newexpenses }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setsecondvaultname('')
                setnewamount(0)
                setloss(0)
                setlotsid('')
                setrows([])
                setrefid(Number(refid) + 1)
                setsubmit(false)
                setfirstvaultname('')
            } else if (resp.data.status == 400) {
                setsubmit(false)

                alert('more then available')
                return
            }
            else {
                setloadrn(false)
                alert('failed')
            }
        })
    }

    const [date1, setdate1] = useState('primary')

    const editsubmit = () => {
        if (date1 !== 'primary') {
            alert('date is wrong')
            return
        }
        if (!rows) {
            alert('data cannot be empty')
            return
        }
        if (newexpenses == '') {
            alert('select date')
            return
        }
        if (!firstvaultname) {
            alert('select client')
            return
        }
        setsubmit(true)
        console.log(rows)
        axios.post('http://localhost:1024/editfinalimport', { rows, refid, client: firstvaultname, time: newexpenses, type: type ? 1 : 0 }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setsecondvaultname('')
                setnewamount(0)
                setlotsid('')
                setrows([])
                setrefid(Number(refid) + 1)
                setsubmit(false)
                setfirstvaultname('')
            } else if (resp.data.status == 400) {
                setsubmit(false)

                alert('more then available')
                return
            }
            else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const confirmsel = () => {
        if (!firstvaultname) {
            alert('select client')
            return
        }
        setsubmit(true)
        axios.post('http://localhost:1024/selfinalimportclient', { clientname: firstvaultname }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setsubmit(false)
                setavalrows(resp.data.diff)
            } else if (resp.data.status == 400) {
                setsubmit(false)
                alert('more then available')
                return
            }
            else {
                setloadrn(false)
                alert('failed')
            }
        })
    }


    const [selectedRows, setselectedRows] = useState([])
    const [avalrows, setavalrows] = useState([])
    const searchprod = (data) => {
        setloadrn(true);
        axios.post('http://localhost:1024/searchproducthistoryexact', { searchtext: data }).then((resp) => {
            if (resp.data.status == 200) {
                setlots(resp.data.foundproduts)
            }
        })
    }
    // const searchrefid = () => {
    //     setloadrn(true);
    //     axios.post('http://localhost:1024/finalimportrefid', { refid: refid }).then((resp) => {
    //         if (resp.data.status == 200) {
    //             setloadrn(false);
    //             setfirstvaultname(resp.data.rows[0].from)
    //             setnewexpenses(resp.data.rows[0].time.split('T')[0])
    //             setrows(resp.data.rows.filter((el) => { return el.managed == true }))
    //         }
    //     })
    // }
    const searchrefid = (refid) => {
        setloadrn(true);
        axios.post('http://localhost:1024/fridgeimportrefid', { refid: refid }).then((resp) => {
            if (resp.data.status == 200) {
                setloadrn(false);
                console.log(resp.data)
                seteden(resp.data.editing)
                setused(resp.data.used)
                if (resp.data.count > 0) {
                    setfirstvaultname(resp.data.rows[0].from)
                    setnewexpenses(resp.data.rows[0].time.split('T')[0])
                    setrows(resp.data.rows)
                } else {
                    setfirstvaultname('')
                    setnewexpenses(new Date().toISOString().split('T')[0])
                    setrows([])
                }
            }
        })
    }
    const searchdate = () => {
        setloadrn(true);
        setselrows([])
        axios.post('http://localhost:1024/finalimportdate', { time: newexpenses }).then((resp) => {
            if (resp.data.status == 200) {
                setloadrn(false);
                setfirstvaultname(resp.data.rows[0].from)
                setnewexpenses(resp.data.rows[0].time.split('T')[0])
                setselrows(resp.data.rows.filter((el) => { return !el.managed == false }))
            }
        })
    }
    const [prt, setprt] = useState(false)


    const addtolist = () => {
        if (!secondvaultname) {
            alert('client cannot be empty')
            return
        }
        if (newamount === '') {
            alert('amount cannot be empty')
            return
        }
        if (newprice === '') {
            alert('price cannot empty')
            return
        }
        if (!firstvaultname) {
            alert('product cannot be empty')
            return
        }
        if (loss === '') {
            alert('loss cannot be empty')
            return
        }
        const name = secondvaultname
        const amount = newamount
        const price = newprice
        const client = firstvaultname
        setrows(oldArray => [...oldArray, {
            "id": Math.floor(Math.random() * 10000000000),
            "to": name,
            "amount": amount,
            "totalprice": (amount - loss) * price,
            "price": price,
            "from": client,
            "return": loss,
            "type": type ? 1 : 0
        }])
        setsecondvaultname('')
        setnewamount(0)
        setnewprice(0)
        setloss(0)
        setlotsid('')
    }


    const [loss, setloss] = useState(0)
    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [fproddata, setfproddata] = useState([])
    const [fprodname, setfprodname] = useState('')
    const [ftotalprice, setftotalprice] = useState(0)
    const [famount, setfamount] = useState(0)
    const [fprice, setfprice] = useState(0)
    const [floss, setfloss] = useState(0)
    const [lots, setlots] = useState([])
    const [lotsid, setlotsid] = useState('')
    const [selrows, setselrows] = useState([])
    const [type, settype] = useState(false);

    const contextActions = () => (
        <>
            {/* <Button color='error' variant='contained' onClick={() => {
                console.log(selectedRows)
                for (let index = 0; index < selectedRows.length; index++) {
                    setrows(rows.filter(item => item.id !== selectedRows[index].id));
                }
            }}>delete</Button> */}
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => { setprt(true) }}>print</Button>
        </>
    );
    const actions = () => (
        <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'end', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemButton style={{ marginRight: 20 }} onClick={() => {
                    settype(!type);
                    setsecondvaultdata([])
                }}>
                    {type ? <CheckBox /> : <CheckBoxOutlineBlank />}
                    <ListItemText style={{ marginLeft: 5 }} primary="وزن؟" />
                </ListItemButton>
                {type == false ?
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginRight: 20, width: 200 }}
                        onFocus={() => {
                            axios.get('http://localhost:1024/products').then((resp) => {
                                setsecondvaultdata(resp.data.products)
                            })
                        }}
                        value={secondvaultname}
                        onInputChange={(event, newInputValue) => {
                            setsecondvaultname(newInputValue);
                        }}
                        options={secondvaultdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="الصنف" />}
                    /> :
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginRight: 20, width: 200 }}
                        onFocus={() => {
                            axios.get('http://localhost:1024/producttypes').then((resp) => {
                                setsecondvaultdata(resp.data.products)
                            })
                        }}
                        value={secondvaultname}
                        onInputChange={(event, newInputValue) => {
                            setsecondvaultname(newInputValue);
                        }}
                        options={secondvaultdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="نوع الصنف" />}
                    />
                }

                <TextField
                    style={{ marginRight: 20 }}
                    autoFocus
                    margin="dense"
                    size='small'
                    id="expenses"
                    label="الكميه"
                    type="number"
                    value={newamount}
                    onChange={(e) => { setnewamount(e.currentTarget.value) }}
                    variant="outlined"
                />

                <TextField
                    style={{ marginRight: 20 }}
                    autoFocus
                    margin="dense"
                    size='small'
                    id="expenses"
                    label="السعر"
                    type="number"
                    value={newprice}
                    onChange={(e) => { setnewprice(e.currentTarget.value) }}
                    variant="outlined"
                />
                <TextField
                    style={{ marginRight: 20 }}
                    autoFocus
                    margin="dense"
                    size='small'
                    id="expenses"
                    label="المرتجع"
                    type="number"
                    value={loss}
                    onChange={(e) => { setloss(e.currentTarget.value) }}
                    variant="outlined"
                />
                <TextField
                    style={{ marginRight: 20 }}
                    autoFocus
                    margin="dense"
                    size='small'
                    id="expenses"
                    label="الاجمالي"
                    type="number"
                    value={(newamount - loss) * newprice}
                    disabled
                    variant="outlined"
                />
                <Button disabled={false} variant='contained' onClick={() => { addtolist() }}>اضافه</Button>
                <Button style={{ marginLeft: 20 }} disabled={refreshloading} variant='contained' color='warning'
                    onClick={() => {
                        setsecondvaultname('')
                        setnewamount(0)
                        setlotsid('')
                        setrows([])
                    }}
                    endIcon={<Refresh />}>Reset
                </Button>


            </div>
        </div>
    );

    const [eden, seteden] = useState(false);
    const [used, setused] = useState(false)
    const [refreshloading, setrefreshloading] = useState(false)
    const [editloss, seteditloss] = useState(0)
    const [newdata, setnewdata] = useState({})
    const [selindex, setselindex] = useState(undefined)
    const [refid, setrefid] = useState(Math.floor(Math.random(1) * 1000000))
    const [submit, setsubmit] = useState(false)
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
                                data={selectedRows}
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
                <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'start', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <TextField
                            style={{ marginRight: 20, marginLeft: 20 }}
                            autoFocus
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="كود"
                            type="number"
                            value={refid}
                            onChange={(e) => {
                                setrefid(e.currentTarget.value)
                                searchrefid(e.currentTarget.value);
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <Autocomplete
                            id="free-solo-demo"
                            label='d'
                            style={{ marginRight: 20, width: 200 }}
                            onFocus={() => {
                                axios.get('http://localhost:1024/clients').then((resp) => {
                                    setfirstvaultdata(resp.data.clients)
                                })
                            }}

                            value={firstvaultname}
                            onInputChange={(event, newInputValue) => {
                                setfirstvaultname(newInputValue);
                                search1(newInputValue)
                            }}
                            options={firstvaultdata.map((option) => option.name)}
                            size='small'
                            renderInput={(params) => <TextField {...params} label="العميل" />}
                        />
                        <Button disabled={submit} style={{ marginRight: 20 }} variant='contained' onClick={() => { confirmsel() }} color='secondary'>بحث</Button>

                        <TextField
                            style={{ marginRight: 20 }}
                            autoFocus
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
                        <Button disabled={submit} style={{ marginRight: 20 }} variant='contained' onClick={() => { editsubmit() }} color='success'>تأكيد</Button>
                        <Button disabled={submit} style={{ marginRight: 20 }} variant='contained' onClick={() => {
                            setsubmit(true)
                            axios.post('http://localhost:1024/deletefinalimport', { refid: refid }).then((resp) => {
                                if (resp.data.status == 200) {
                                    setrows([])
                                    setsecondvaultname('')
                                    setnewamount(0)
                                    setlotsid('')
                                    setrows([])
                                    setrefid(Math.floor(Math.random(1) * 1000000))
                                    setnewexpenses(new Date().toISOString().split('T')[0])
                                    setsubmit(false)
                                    setfirstvaultname('')
                                }
                            })
                        }} color='error'>حذف</Button>
                    </div>



                </div>

                <DataTable
                    pagination
                    dense
                    theme='newtheme'
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
                    data={rows}
                    onRowDoubleClicked={(data) => {
                        const index = rows.findIndex(x => x.id == data.id)
                        setselindex(index)
                        setnewdata(data)
                        setnewcamount(data.amount)
                        seteditprice(data.price)
                        seteditloss(data.return)
                        seteditrn(true)
                    }}
                />
                <div style={{ marginTop: 20 }}>
                    <DataTable
                        pagination
                        dense
                        theme='newtheme'
                        paginationPerPage={100}
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight='400px'
                        selectableRowsHighlight
                        direction="rtl"
                        columns={[
                            {
                                name: 'العميل',
                                selector: row => row.clientname,
                                sortable: true,
                                grow: 3,
                            },
                            {
                                name: 'الصنف',
                                selector: row => row.productname,
                                sortable: true,
                                grow: 3,
                            },
                            {
                                name: 'الكميه',
                                selector: row => row.amount,
                                sortable: true,

                            },
                            {
                                name: 'مرتجع',
                                selector: row => row.return,
                                sortable: true,
                            },
                            {
                                name: 'اجمالي الكميه',
                                selector: row => row.amount - row.return,
                                sortable: true,
                            }]}
                        data={avalrows}
                    />
                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'start', alignItems: 'center' }}>
                    <Typography color={'#fff'} style={{ marginLeft: 50 }}>
                        اجمالي المبلغ : {totalprice}
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
                <DialogTitle>تعديل</DialogTitle>
                <DialogContent>
                    <ListItemButton disabled style={{ marginRight: 20 }}>
                        {newdata.type == 1 ? <CheckBox /> : <CheckBoxOutlineBlank />}
                        <ListItemText style={{ marginLeft: 5 }} primary="وزن؟" />
                    </ListItemButton>
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
                        value={newcamount}
                        onChange={(e) => { setnewcamount(e.currentTarget.value) }}
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
                        value={editprice}
                        onChange={(e) => { seteditprice(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="المرتجع"
                        type="number"
                        value={editloss}
                        onChange={(e) => { seteditloss(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        size='small'
                        label="الاجمالى"
                        type="number"
                        disabled
                        value={(newcamount - editloss) * editprice}
                        onChange={(e) => { seteditprice(e.currentTarget.value) }}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button color='error' variant='contained' onClick={() => {
                        setrows(rows.filter(item => item.id !== newdata.id));
                        seteditrn(false)
                    }}>حذف</Button>
                    <Button variant='contained' onClick={() => {
                        var arr = rows
                        arr[selindex].amount = newcamount
                        arr[selindex].price = editprice
                        arr[selindex].return = editloss
                        arr[selindex].totalprice = (newcamount - editloss) * editprice
                        setrows(arr)
                        seteditrn(false)
                    }
                    }>حفظ</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editrn2} fullWidth onClose={() => { seteditrn2(false) }}>
                <DialogTitle>الفواتير</DialogTitle>
                <DialogContent>
                    <DataTable
                        dense
                        theme='newtheme'
                        highlightOnHover
                        pointerOnHover
                        fixedHeader
                        fixedHeaderScrollHeight='350px'
                        direction="rtl"
                        columns={[
                            {
                                name: 'كود',
                                selector: row => row.refid,
                                sortable: true,
                                grow: 3,
                            },
                            {
                                name: 'العميل',
                                selector: row => row.from,
                                sortable: true,
                                grow: 3,
                            },
                            {
                                name: 'السعر الكلي',
                                selector: row => row.totalprice,
                                sortable: true,
                            }]}
                        data={selrows}
                        onRowDoubleClicked={(data) => {
                            setrefid(data.refid)
                            searchrefid()
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn2(false) }} >الغاء</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default Finalimport