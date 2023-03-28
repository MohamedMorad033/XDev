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

function WorkerPayout() {

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
            name: 'م',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'المقاول',
            selector: row => row.workername,
            sortable: true,
            grow: 2,
        },
        {
            name: 'عدد العمال',
            selector: row => row.amount,
            sortable: true,

        },
        {
            name: 'سعر اليوميه',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'السهرات',
            selector: row => row.nights,
            sortable: true,
        },
        {
            name: 'الخصم',
            selector: row => row.return,
            sortable: true,
        },

        {
            name: 'اجمالي المبلغ',
            selector: row => row.totalprice,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => !row.payed,
                    style: {
                        backgroundColor: 'rgba(255, 70, 70, 1)',
                        color: 'white'
                    }
                },
                {
                    when: row => row.payed,
                    style: {
                        backgroundColor: 'rgb(70 255 70)',
                        color: 'black'
                    }
                }
            ]
        },
        {
            name: 'تاريخ',
            selector: row => row.time.split('T')[0],
            sortable: true,
        }
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
    const [newprodname, setnewprodname] = useState('')
    const [newexpenses, setnewexpenses] = useState('0')
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
        axios.post('http://localhost:1024/searchWorkers', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setfirstvaultdata(resp.data.foundproduts)
            }
        })
    }
    const search = (text) => {
        axios.post('http://localhost:1024/searchWorkers', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                settheirdvaultdata(resp.data.foundproduts)
            }
        })
    }
    const getcode = () => {
        axios.get('http://localhost:1024/Vault').then((resp) => {
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
    const [data, setdata] = useState('')

    const componentRef = useRef();

    const createnewexport = () => {
        if (!data) {
            alert('data cannot be empty')
            return
        }
        if (theirdvaultname === '') {
            alert('please select a client')
            return
        }
        if (newexpenses === '') {
            alert('please enter an amount')
            return
        }
        console.log(newdata)
        axios.post('http://localhost:1024/addProductoutcome', { prodname: newdata.to, clientname: theirdvaultname, prodid: newdata.toid, amount: newexpenses, pricehistoryid: newdata.id }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setloadrn3(false)
                seteditrn(false)
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const [selectedRows, setselectedRows] = useState([])
    const searchprod = () => {
        setloadrn(true);
        axios.post('http://localhost:1024/searchproductoutcomeexact', { searchtext: secondvaultname }).then((resp) => {
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
        axios.post('http://localhost:1024/searchworkerspaysbynameexact', { searchtext: firstvaultname }).then((resp) => {
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

    const searchclientdata = () => {
        setloadrn(true);
        axios.post('http://localhost:1024/searchworkerspaysbydateexact', { searchtext: value }).then((resp) => {
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



    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)



    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => {
                axios.post('http://localhost:1024/deleteworkerpayment', { deleteproduct: selectedRows }).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data)
                        setrows([])
                        setrows(resp.data.workers)
                    } else {
                        alert('failed')
                        axios.get('http://localhost:1024/Workerspay').then((resp) => { setrows(resp.data.products) })

                    }
                })
            }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => { setprt(true) }}>print</Button>
        </>
    );
    const [value, setvalue] = useState(new Date().toISOString().split('T')[0])
    const [date, setdate] = useState(new Date().toISOString().split('T')[0])
    const [newdate, setnewdate] = useState(new Date().toISOString().split('T')[0])
    const actions = () => (
        <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>

                <TextField
                    id="free-solo-demo"
                    label='تاريخ'
                    type={'date'}
                    style={{ marginRight: 20, width: 200 }}
                    value={value}
                    onChange={(newInputValue) => {
                        setvalue(newInputValue.target.value);
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size='small'
                />
                <Button style={{ marginRight: 20 }} disabled={false} variant='contained' onClick={() => { searchclientdata() }}>تأكيد</Button>

                <Autocomplete
                    id="free-solo-demo"
                    label='d'
                    style={{ marginRight: 20, width: 200 }}
                    onFocus={() => {
                        axios.get('http://localhost:1024/Workers').then((resp) => {
                            setfirstvaultdata(resp.data.clients)
                        })
                    }}
                    freeSolo
                    value={firstvaultname}
                    onInputChange={(event, newInputValue) => {
                        setfirstvaultname(newInputValue);
                        search1(newInputValue)
                    }}
                    options={firstvaultdata.map((option) => option.name)}
                    size='small'
                    renderInput={(params) => <TextField {...params} label="المقاول" />}
                />
                <Button style={{ marginRight: 20 }} disabled={false} variant='contained' onClick={() => { searchclient() }}>تأكيد</Button>
            </div>
            <Button style={{ marginLeft: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                setrefreshloading(true);
                axios.get('http://localhost:1024/Workerspay').then((resp) => { setrows(resp.data.products); setrefreshloading(false) })
            }} endIcon={<Refresh />}>Refresh</Button>
        </div>
    );


    const [refreshloading, setrefreshloading] = useState(false)



    const [newdata, setnewdata] = useState({})
    const [loadrn4, setloadrn4] = useState(false)
    const [newprice, setnewprice] = useState('0')
    const [newamount, setnewamount] = useState('0')

    const createpayout = () => {
        if (!secondvaultname) {
            alert('select worker')
            return
        }
        if (!newprice === '') {
            alert('set price')
            return
        }
        if (!newamount === '') {
            alert('set count')
            return
        }
        if (!nights === '') {
            alert('set nights')
            return
        }
        if (!returns === '') {
            alert('set returns')
            return
        }
        axios.post('http://localhost:1024/createworkerinvoice', { workername: secondvaultname, amount: newamount, price: newprice, total: Number(newamount) * Number(newprice) + Number(nights) - Number(returns), returns, nights, date }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.workers)
                setreturns(0)
                setnewamount(0)
                setnewprice(0)
                setsecondvaultname('')
                setnights(0)
                var sum = 0
                var asum = 0
                resp.data.workers.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.workers.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount(asum)
                settotalprice(sum)
            }
        })
    }

    const [nights, setnights] = useState(0)
    const [returns, setreturns] = useState(0)
    const [newnights, setnewnights] = useState(0)
    const [newreturns, setnewreturns] = useState(0)

    const submitedit = () => {
        if (!theirdvaultname) {
            alert('select worker')
            return
        }
        if (!editprice === '') {
            alert('set price')
            return
        }
        if (!editamount === '') {
            alert('set count')
            return
        }
        if (!newnights === '') {
            alert('set nights')
            return
        }
        if (!newreturns === '') {
            alert('set returns')
            return
        }
        axios.post('http://localhost:1024/editworkerinvoice', { workername: theirdvaultdata, amount: editamount, price: editprice, total: Number(editprice) * Number(editamount) + Number(newnights) - Number(newreturns), selid: newdata.id, newdata, returns: newreturns, nights: newnights, date: newdate }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.workers)
                seteditrn(false)
                var sum = 0
                var asum = 0
                resp.data.workers.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.workers.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount(asum)
                settotalprice(sum)
            }
        })
    }
    const [editamount, seteditamount] = useState('')
    const [editprice, seteditprice] = useState('')
    const [edittotal, setedittotal] = useState('')
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
                                <h4>كشف حساب مقاول</h4>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <DataTable
                                dense
                                direction="rtl"
                                columns={columns}
                                data={selectedRows}
                            />
                            <div style={{ marginTop: 20, display: 'flex', width: '100%', justifyContent: 'start' }}>
                                <Typography color={'#000'} style={{ marginLeft: 50 }}>
                                    اجمالي المبلغ : {totalprice}
                                </Typography>
                                <Typography color={'#000'} style={{ marginLeft: 50 }}>
                                    اجمالي العمال : {totalamount}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <Autocomplete
                        id="free-solo-demo"
                        style={{ marginRight: 20, width: 200 }}
                        onFocus={() => {
                            axios.get('http://localhost:1024/Workers').then((resp) => {
                                setsecondvaultdata(resp.data.clients)
                            })
                        }}
                        freeSolo
                        value={secondvaultname}
                        onInputChange={(event, newInputValue) => {
                            setsecondvaultname(newInputValue);
                            search2(newInputValue)
                        }}
                        options={secondvaultdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="المقاول" />}
                    />
                    <TextField
                        style={{ marginRight: 20, width: 100 }}
                        autoFocus
                        margin="dense"
                        id="name"
                        size='small'
                        label="عدد العمال"
                        type="number"
                        value={newamount}
                        onChange={(e) => { setnewamount(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginRight: 20, width: 100 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="اليوميه الواحده"
                        type="number"
                        value={newprice}
                        onChange={(e) => { setnewprice(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginRight: 20, width: 100 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="السهرات"
                        type="number"
                        value={nights}
                        onChange={(e) => { setnights(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginRight: 20, width: 100 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="الخصم"
                        type="number"
                        value={returns}
                        onChange={(e) => { setreturns(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginRight: 20, width: 100 }}
                        autoFocus
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="الاجمالي"
                        type="number"
                        disabled
                        value={Number(newamount) * Number(newprice) + Number(nights) - Number(returns)}
                        onChange={(e) => { setnewprice(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        id="free-solo-demo"
                        label='تاريخ'
                        type={'date'}
                        style={{ marginRight: 20, width: 200, marginTop: 10 }}
                        value={date}
                        onChange={(newInputValue) => {
                            setdate(newInputValue.target.value);
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size='small'
                    />
                    <Button disabled={loadrn4} variant='contained' onClick={() => { createpayout() }}>اضافه</Button>

                </div>
                <DataTable
                    pagination
                    dense
                    theme='solarized'
                    defaultSortFieldId={1}
                    defaultSortAsc={false}
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
                        settheirdvaultname(data.workername);
                        setnewdata(data); seteditrn(true);
                        seteditamount(data.amount);
                        seteditprice(data.price);
                        setnewnights(data.nights);
                        setnewreturns(data.return)
                    }}
                />
                <div style={{ display: 'flex', width: '100%', justifyContent: 'start', alignItems: 'center' }}>
                    <Typography color={'#fff'} style={{ marginLeft: 50 }}>
                        اجمالي المبلغ : {totalprice}
                    </Typography>
                    <Typography color={'#fff'} style={{ marginLeft: 50 }}>
                        اجمالي السعر : {totalamount}
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
                <DialogTitle>تعديل اليومية</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Autocomplete
                            id="free-solo-demo"
                            label='d'
                            style={{ marginRight: 20, width: 200, marginTop: 10 }}
                            fullWidth
                            onFocus={() => {
                                axios.get('http://localhost:1024/Workers').then((resp) => {
                                    settheirdvaultdata(resp.data.clients)
                                })
                            }}
                            freeSolo
                            value={theirdvaultname}
                            onInputChange={(event, newInputValue) => {
                                settheirdvaultname(newInputValue);
                                search(newInputValue)
                            }}
                            options={theirdvaultdata.map((option) => option.name)}
                            size='small'
                            renderInput={(params) => <TextField {...params} label="المقاول" />}
                        />
                        <TextField
                            id="free-solo-demo"
                            label='تاريخ'
                            type={'date'}
                            style={{ marginRight: 20, width: 200, marginTop: 10 }}
                            value={newdate}
                            onChange={(newInputValue) => {
                                setnewdate(newInputValue.target.value);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size='small'
                        />
                        <TextField
                            style={{ marginRight: 20, width: 200 }}
                            autoFocus
                            margin="dense"
                            id="name"
                            size='small'
                            label="عدد العمال"
                            fullWidth
                            type="number"
                            value={editamount}
                            onChange={(e) => { seteditamount(e.currentTarget.value) }}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginRight: 20, width: 200 }}
                            autoFocus
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="اليوميه الواحده"
                            type="number"
                            fullWidth
                            value={editprice}
                            onChange={(e) => { seteditprice(e.currentTarget.value) }}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginRight: 20, width: 200 }}
                            autoFocus
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="السهرات"
                            type="number"
                            fullWidth
                            value={newnights}
                            onChange={(e) => { setnewnights(e.currentTarget.value) }}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginRight: 20, width: 200 }}
                            autoFocus
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="الخصم"
                            type="number"
                            fullWidth
                            value={newreturns}
                            onChange={(e) => { setnewreturns(e.currentTarget.value) }}
                            variant="outlined"
                        />
                        <TextField
                            style={{ marginRight: 20, width: 200 }}
                            autoFocus
                            fullWidth
                            margin="dense"
                            size='small'
                            id="expenses"
                            label="اجمالي المبلغ"
                            type="number"
                            value={Number(editamount) * Number(editprice) + Number(newnights) - Number(newreturns)}
                            variant="outlined"
                            disabled
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn3} variant='contained' onClick={() => { submitedit() }}>حفظ</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default WorkerPayout