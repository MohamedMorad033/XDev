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
            localStorage.setItem('Theme','light')
        }
}

updatetheme(localStorage.getItem('Theme'))
function Productexport() {

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
            name: 'فاتورة مرتجع',
            selector: row => row.returnid,
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
        }];





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
        axios.post('http://localhost:1024/addproductexport', { rows, refid, client: firstvaultname, time: newexpenses }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setsecondvaultname('')
                setnewamount(0)
                setlotsid('')
                setrows([])
                setrefid(Math.floor(Math.random(1) * 1000000))
                setnewexpenses('')
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


    const editsubmit = () => {
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
        axios.post('http://localhost:1024/editproductexport', { rows, refid, client: firstvaultname, time: newexpenses }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setsecondvaultname('')
                setnewamount(0)
                setlotsid('')
                setrows([])
                setrefid(Math.floor(Math.random(1) * 1000000))
                setnewexpenses('')
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



    const [selectedRows, setselectedRows] = useState([])
    const searchprod = (data) => {
        setloadrn(true);
        axios.post('http://localhost:1024/searchproducthistoryexact', { searchtext: data }).then((resp) => {
            if (resp.data.status == 200) {
                setlots(resp.data.foundproduts.filter(x => x.remaining !== 0))
            }
        })
    }
    const searchrefid = () => {
        setloadrn(true);
        axios.post('http://localhost:1024/productexportrefid', { refid: refid }).then((resp) => {
            if (resp.data.status == 200) {
                setloadrn(false);
                setrefid(refid + 1)
                setfirstvaultname(resp.data.rows[0].clientname)
                setnewexpenses(resp.data.rows[0].time.split('T')[0])
                setrows(resp.data.rows)
            }
        })
    }
    const [prt, setprt] = useState(false)


    const addtolist = () => {
        if (!secondvaultname) {
            return
        }
        if (!newamount) {
            return
        }
        if (!lotsid) {
            return
        }
        const lotid = lotsid.split('_____')[0]
        const name = lotsid.split('_____')[1]
        const amount = lotsid.split('_____')[2]
        const price = lotsid.split('_____')[3]
        const client = lotsid.split('_____')[4]
        console.log({ lotid, name, amount, price, client, newamount })
        setrows(oldArray => [...oldArray, {
            "id": lotid,
            "productname": name,
            "amount": newamount,
            "totalprice": newamount * price,
            "price": price,
            "return": 0,
            "returnid": 0
        }])
        setsecondvaultname('')
        setnewamount(0)
        setlotsid('')
    }



    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [lots, setlots] = useState([])
    const [lotsid, setlotsid] = useState('')


    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => {
                console.log(selectedRows)
                for (let index = 0; index < selectedRows.length; index++) {
                    setrows(rows.filter(item => item.id !== selectedRows[index].id));
                }
            }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => { setprt(true) }}>print</Button>
        </>
    );
    const actions = () => (
        <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>

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
                        search2(newInputValue)
                        searchprod(newInputValue)
                    }}
                    options={secondvaultdata.map((option) => option.name)}
                    size='small'
                    renderInput={(params) => <TextField {...params} label="الصنف" />}
                />
                <Autocomplete
                    id="free-solo-demo"
                    label='d'
                    style={{ marginRight: 20, width: 450 }}
                    value={lotsid}
                    onInputChange={(event, newInputValue) => {
                        setlotsid(newInputValue);
                        console.log(newInputValue.split('_____'))
                    }}
                    options={lots.map((option) => option.id + '_____' + option.to + '_____' + option.remaining + '_____' + option.price + '_____' + option.from)}
                    size='small'
                    renderInput={(params) => <TextField {...params} label="lot" />}
                />
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
                    label="الاجمالي"
                    type="number"
                    value={newamount * lotsid.split('_____')[3]}
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
                    endIcon={<Refresh />}>Reset</Button>
            </div>


        </div>
    );


    const [refreshloading, setrefreshloading] = useState(false)

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
                            onChange={(e) => { setrefid(e.currentTarget.value) }}
                            variant="outlined"
                            onDoubleClick={() => { setrefid(Math.floor(Math.random(1) * 1000000)) }}
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
                        <TextField
                            style={{ marginRight: 20 }}
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
                        <Button disabled={submit} style={{ marginRight: 20 }} variant='contained' onClick={() => { editsubmit() }} color='success'>تأكيد</Button>
                        <Button disabled={submit} style={{ marginRight: 20 }} variant='contained' onClick={() => { searchrefid() }} color='warning'>بحث</Button>
                        <Button disabled={submit} style={{ marginRight: 20 }} variant='contained' onClick={() => {
                            setsubmit(true)
                            axios.post('http://localhost:1024/deleteproductexport', { refid: refid }).then((resp) => {
                                if (resp.data.status == 200) {
                                    setrows([])
                                    setsecondvaultname('')
                                    setnewamount(0)
                                    setlotsid('')
                                    setrows([])
                                    setrefid(Math.floor(Math.random(1) * 1000000))
                                    setnewexpenses('')
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
                    selectableRows
                    data={rows}
                    onRowDoubleClicked={(data) => {
                        const index = rows.findIndex(x => x.id == data.id)
                        setselindex(index)
                        setnewdata(data)
                        setnewcamount(data.amount)
                        seteditrn(true)
                    }}
                />
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        size='small'
                        fullWidth
                        label="اسم الصنف"
                        type="text"
                        value={newdata.productname}
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
                        arr[selindex].totalprice = newcamount * arr[selindex].price
                        setrows(arr)
                        seteditrn(false)
                    }
                    }>حفظ</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default Productexport