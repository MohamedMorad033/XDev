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
function VaultSummery() {

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
            name: 'id',
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
            selector: row => row.vaultName,
            sortable: true,
            grow: 2,
        },
        {
            name: 'العمليه',
            selector: row => row.Category,
            sortable: true,
            grow: 3,
        },
        {
            name: 'المعامل',
            selector: row => row.OperatorName,
            sortable: true,
            grow: 3,
        },
        {
            name: 'وارد',
            selector: row => Number(row.Income) == '' ? '' : Number(row.Income).toFixed(2).toString().split('.')[1] == '00' ? Number(row.Income) : Number(row.Income).toFixed(2),
            sortable: true,
        },
        {
            name: 'منصرف',
            selector: row => Number(row.Outcome) == '' ? '' : Number(row.Outcome).toFixed(2).toString().split('.')[1] == '00' ? Number(row.Outcome) : Number(row.Outcome).toFixed(2),
            sortable: true,
        },
        {
            name: 'الرصيد',
            selector: row => Number(row.Value) == '' ? '' : Number(row.Value).toFixed(2).toString().split('.')[1] == '00' ? Number(row.Value) : Number(row.Value).toFixed(2),
            sortable: true,
        },
        {
            name: 'تاريخ العمليه',
            selector: row => row.Date,
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
                setloadrn3(false)
                seteditrn(false)
            } else {
                setloadrn(false)
                alert('failed')
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
    const searchvault = () => {
        setloadrn(true);
        axios.post('http://localhost:1024/vaultsummery', { vaultname: secondvaultname }).then((resp) => {
            if (resp.data.status == 200) {
                setrows(resp.data.summeryarray)
                setvaultname(resp.data.summeryarray[0].vaultname)
                setamount(resp.data.summeryarray[resp.data.summeryarray.length - 1].value)
                setloadrn(false);
            }
        })
    }
    const [amount, setamount] = useState('')
    const [vaultname, setvaultname] = useState('')

    const [prt, setprt] = useState(false)





    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)

    const [selectableRows, setselectedRows] = useState()

    const contextActions = () => (
        <>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                axios.post('http://localhost:1024/print/vaultsummery', { vaultname : rows[0].vaultName }).then((resp) => {
                    setTimeout(() => {
                        window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                    }, 500);
                })
            }}>print</Button>
        </>
    );
    const [refid, setrefid] = useState()
    const actions = () => (
        <>
        </>
    );


    const [refreshloading, setrefreshloading] = useState(false)



    const [newdata, setnewdata] = useState({})





    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flexDirection: 'row-reverse', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '100%', alignItems: 'flex-end', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
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
                    <Button style={{ margin: 10 }} disabled={loadrn} variant='contained' onClick={() => { searchvault() }}>تأكيد</Button>
                </div>
                <div>
                    <Button color='success' style={{ margin: 10 }} variant='contained' onClick={() => {
                        axios.post('http://localhost:1024/print/vaultsummery', { vaultname: rows[0].vaultName }).then((resp) => {
                            setTimeout(() => {
                                window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                            }, 500);
                        })
                    }}>print</Button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <DataTable
                    dense
                    theme='newtheme'
                    highlightOnHover
                    pagination
                    paginationPerPage={1000000}
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
                // onRowDoubleClicked={(data) => {
                //     setnewdata(data);
                //     seteditrn(true);
                //     setnewexpenses(data.amount);
                //     setnewpayments(data.price)
                // }}
                />
                {/* <div style={{ display: 'flex', width: '100%', justifyContent: 'start', alignItems: 'center' }}>
                    <Typography color={'#fff'} style={{ marginLeft: 50 }}>
                        اسم الخزينه : {vaultname}
                    </Typography>
                    <Typography color={'#fff'} style={{ marginLeft: 50 }}>
                        رصيد الخزينه الحالي : {amount}
                    </Typography>
                </div> */}
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
    )
}

export default VaultSummery