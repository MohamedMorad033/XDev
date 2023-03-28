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
function FridgeIncome() {

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
            name: 'المورد',
            selector: row => row.from,
            sortable: true,
            grow: 2
        },
        {
            name: 'الصنف',
            selector: row => row.to,
            sortable: true,
            grow: 3,
        },
        {
            name: 'الكميه',
            selector: row => row.amount,
            sortable: true,

        },
        {
            name: 'المرتجع',
            selector: row => row.loss,
            sortable: true,

        },
        {
            name: 'اجمالي الكميه',
            selector: row => row.amount - row.loss,
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




        const [dark_theme_en, set_dark_theme_en] = useState('light')
        const [AccesToken, setAccesToken] = useState([]);

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
        axios.get('http://localhost:1024/vault').then((resp) => {
            setnewcode(resp.data.vault.length + 1);
        })
        axios.get('http://localhost:1024/fridgeincome').then((resp) => {
            setrows(resp.data.Productincome);
        })
    }, [])
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
    const [selectedRows, setselectedRows] = useState([])
    const createnewtransaction = () => {
        if (!firstvaultname) {
            alert('name cannot be empty')
            return
        }
        if (!secondvaultname) {
            alert('name cannot be empty')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addProductincome', { amount: newcamount, price: expenses, fromname: firstvaultdata[0].id, toname: secondvaultdata[0].id }).then((resp) => {
            if (resp.data.status == 200) {
                setrows([])
                console.log(resp.data)
                axios.get('http://localhost:1024/Productincome').then((resp) => { setrows(resp.data.Productincome); setrefreshloading(false) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const [prt, setprt] = useState(false)





    const [totalprice, settotalprice] = useState(0)



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
    const actions = () => (
        <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <div>
                    <Autocomplete
                        id="free-solo-demo"
                        includeInputInList
                        freeSolo
                        style={{ margin: 20, width: 200 }}
                        value={firstvaultname}
                        onFocus={() => {
                            axios.get('http://localhost:1024/clients').then((resp) => {
                                setfirstvaultdata(resp.data.clients)
                            })
                        }}
                        onInputChange={(event, newInputValue) => {
                            setfirstvaultname(newInputValue);
                            search1(newInputValue)
                        }}
                        onDoubleClick={() => { seteditrn(true); getcode() }}
                        options={firstvaultdata.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="المورد" />}
                        size='small'
                    />
                </div>
                <Autocomplete
                    id="free-solo-demo"
                    label='d'
                    style={{ marginRight: 20, width: 200 }}
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
                    }}
                    options={secondvaultdata.map((option) => option.name)}
                    size='small'
                    renderInput={(params) => <TextField {...params} label="الصنف" />}
                    onDoubleClick={() => { seteditrn2(true); getcode() }}
                />
                <TextField
                    margin="dense"
                    id="expenses"
                    label="الكميه"
                    type="number"

                    value={newcamount}
                    style={{ marginRight: 20, width: 200 }}
                    size='small'
                    onChange={(e) => { setnewcamount(e.currentTarget.value) }}
                    variant="outlined"
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
                    margin="dense"
                    id="expenses"
                    label="الاجمالي"
                    type="number"
                    disabled
                    value={expenses * newcamount}
                    style={{ marginRight: 20, width: 200 }}
                    size='small'
                    variant="outlined"
                />
                <Button disabled={false} variant='contained' onClick={() => { createnewtransaction() }}>تأكيد</Button>

            </div>
            <Button style={{ marginLeft: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                setrefreshloading(true);
                axios.get('http://localhost:1024/Productincome').then((resp) => { setrows(resp.data.Productincome); setrefreshloading(false) })
            }} endIcon={<Refresh />}>Refresh</Button>
        </div>
    );


    const [refreshloading, setrefreshloading] = useState(false)







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
                                <h4>ايراد زرع</h4>
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
                    selectableRowsHighlight
                    direction="rtl"
                    onSelectedRowsChange={(rows) => {
                        setselectedRows(rows.selectedRows);
                        setdata(rows);
                        console.log(rows.selectedRows)
                        var sum = 0

                        rows.selectedRows.forEach(function (value, index, arry) {
                            sum += value.totalprice;
                        });

                        settotalprice(sum)
                    }}
                    selectableRowsComponent={Checkbox}
                    columns={columns}
                    selectableRows
                    data={rows}
                    onRowDoubleClicked={(data) => { console.log(data); setcode(data.code); setpayments(data.payment); setname(data.name); setexpenses(data.expense); setselid(data.id) }}
                />
            </div>
            <Dialog open={editrn} onClose={() => { seteditrn(false) }}>
                <DialogTitle>اضافه مورد</DialogTitle>
                <DialogContent>
                    <TextField
                        style={{ marginRight: 20 }}
                        autoFocus
                        margin="dense"
                        id="name"
                        size='small'
                        fullWidth
                        label="اسم الصنف"
                        type="text"
                        value={newname}
                        onChange={(e) => { setnewname(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <Select
                        fullWidth
                        style={{ marginRight: 20 }}
                        variant='outlined'
                        value={newsel}
                        size='small'
                        onChange={(e) => { setnewsel(e.target.value) }}
                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        style={{ marginRight: 20 }}
                        autoFocus
                        fullWidth
                        margin="dense"
                        size='small'
                        id="expenses"
                        label="له"
                        type="number"
                        value={newexpenses}
                        onChange={(e) => { setnewexpenses(e.currentTarget.value) }}
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginRight: 20 }}
                        autoFocus
                        margin="dense"
                        id="payments"
                        size='small'
                        fullWidth
                        label="عليه"
                        type="number"
                        value={newpayments}
                        onChange={(e) => { setnewpayments(e.currentTarget.value) }}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { createnewproduct() }}>اضافه</Button>
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

export default FridgeIncome