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
createTheme('solarized', {
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
function Summery() {

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
            name: 'العميل',
            selector: row => row.clientname,
            sortable: true,
            grow: 2,
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
            name: 'المرتجع',
            selector: row => row.return,
            sortable: true,
        },
        {
            name: 'اجمالي الكميه',
            selector: row => row.amount - row.return,
            sortable: true,
        },

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
    const [rows2, setrows2] = useState([]);
    const [rows3, setrows3] = useState([]);
    const [rows4, setrows4] = useState([]);
    const [rows5, setrows5] = useState([]);
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
        axios.get('http://localhost:1024/Vault').then((resp) => {
            setnewcode(resp.data.Vault.length + 1);
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

    var arr = []
    var stop = { "id": "Stop" }
    var hed = { "id": "hed" }
    var header = { id: 'مم', refid: 'فاتوره', productid: 4, clientid: 26, productname: 'الصنف', clientname: "اسم العميل", amount: 'الكميه', return: "المرتجع" }
    var headernoreturn = { id: 'م', refid: 'فاتوره', productid: 4, clientid: 26, productname: 'الصنف', clientname: "اسم العميل", amount: 'الكميه', return: "المرتجع" }
    const searchclient = () => {
        setloadrn(true);
        axios.post('http://localhost:1024/clientsummery', { clientname: firstvaultname, date }).then((resp) => {
            if (resp.data.status == 200) {
                arr = []
                arr = [...arr, stop, hed, ...resp.data.exportsum]
                arr = [...arr, stop, hed, ...resp.data.importsum]
                arr = [...arr, stop, hed, ...resp.data.retsum]
                arr = [...arr, stop, hed, ...resp.data.diff]
                console.log(arr)
                setsumarr(arr)
                setrows(resp.data.exportsum)
                var sum = 0
                var asum = 0
                resp.data.exportsum.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.exportsum.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount(asum)
                settotalprice(sum)

                setrows2(resp.data.importsum)
                var sum = 0
                var asum = 0
                resp.data.importsum.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.importsum.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount2(asum)
                settotalprice2(sum)


                setrows3(resp.data.diff)
                var sum = 0
                var asum = 0
                resp.data.diff.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.diff.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount3(asum)
                settotalprice3(sum)



                setrows4(resp.data.retsum)
                setrows5(resp.data.sumarray)
                var sum = 0
                var asum = 0
                resp.data.diff.forEach(function (value, index, arry) {
                    sum += value.totalprice;
                });
                resp.data.diff.forEach(function (value, index, arry) {
                    asum += value.amount;
                });
                settotalamount4(asum)
                settotalprice4(sum)
            }
        })
    }
    const [prt, setprt] = useState(false)





    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [totalprice2, settotalprice2] = useState(0)
    const [totalprice3, settotalprice3] = useState(0)
    const [totalprice4, settotalprice4] = useState(0)
    const [totalamount2, settotalamount2] = useState(0)
    const [totalamount3, settotalamount3] = useState(0)
    const [totalamount4, settotalamount4] = useState(0)



    const [refreshloading, setrefreshloading] = useState(false)

    const [sumarr, setsumarr] = useState([])

    const [newdata, setnewdata] = useState({})
    const [date, setdate] = useState(new Date().toISOString().split('T')[0])

    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);


    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                <div>
                    {/* <Button disabled={false} variant='contained' color='success' onClick={() => { setprt(true) }}>print</Button> */}
                    <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                        axios.post('http://localhost:1024/print/clientsummery', { rows: sumarr, name: rows[0].clientname }).then((resp) => {
                            setTimeout(() => {
                                window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                            }, 500);
                        })
                    }}>print</Button>
                </div>
                <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginRight: 20, width: 200 }}
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
                        }}
                        options={firstvaultdata.map((option) => option.name)}
                        size='small'
                        renderInput={(params) => <TextField {...params} label="عميل/مورد" />}
                    />
                    <TextField
                        style={{ marginRight: 20, width: 200 }}
                        margin="dense"
                        size='small'
                        fullWidth
                        id="date"
                        label="حتي تاريخ"
                        type="date"
                        value={date}
                        onChange={(e) => {
                            setdate(e.currentTarget.value)
                        }}
                        onBlur={() => {
                            if (!new Date(date)) {
                                setdate(new Date().toISOString().split('T')[0])
                            }
                        }}
                        variant="outlined"
                        onDoubleClick={() => { }}
                    />
                    <Button style={{ marginRight: 20 }} disabled={false} variant='contained' onClick={() => { searchclient() }}>تأكيد</Button>
                    <Button style={{ marginLeft: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrows([])
                        setrows2([])
                        setrows3([])
                        setrows4([])
                        setfirstvaultname('')
                        setsecondvaultname('')
                    }} endIcon={<Refresh />}>Reset</Button>
                </div>


            </div>

            <div style={{ width: '100%' }}>
                <div style={{ height: 50, backgroundColor: '#ffffff20', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h6>مواد التعبأه المستحقه</h6>
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
                    direction="rtl"
                    columns={
                        [
                            {
                                name: 'العميل',
                                selector: row => row.clientname,
                                sortable: true,
                                grow: 2,
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
                            }
                        ]
                    }
                    data={rows}
                />


                <div style={{ height: 50, backgroundColor: '#ffffff20', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h6>مواد التعبأه المرتجعه</h6>
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
                    direction="rtl"
                    columns={
                        [
                            {
                                name: 'العميل',
                                selector: row => row.clientname,
                                sortable: true,
                                grow: 2,
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
                        ]
                    }
                    data={rows4}
                />



                <div style={{ height: 50, backgroundColor: '#ffffff20', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h6>المنتج النهائى</h6>
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
                    direction="rtl"
                    columns={
                        [
                            {
                                name: 'العميل',
                                selector: row => row.clientname,
                                sortable: true,
                                grow: 2,
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
                                name: 'المرتجع',
                                selector: row => row.return,
                                sortable: true,
                            },
                            {
                                name: 'اجمالي الكميه',
                                selector: row => row.amount - row.return,
                                sortable: true,
                            },

                        ]
                    }
                    data={rows2}
                />
                <div style={{ height: 50, backgroundColor: '#ffffff20', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h6>الفرق</h6>
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
                    direction="rtl"
                    columns={
                        [
                            {
                                name: 'العميل',
                                selector: row => row.clientname,
                                sortable: true,
                                grow: 2,
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
                        ]
                    }
                    data={rows3}
                />
                <div style={{ height: 50, backgroundColor: '#ffffff20', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h6>رصيد العميل</h6>
                </div>
                <DataTable
                    dense
                    theme='newtheme'
                    highlightOnHover
                    pagination
                    paginationPerPage={100}
                    pointerOnHover
                    fixedHeader
                    fixedHeaderScrollHeight='450px'
                    selectableRowsHighlight
                    direction="rtl"
                    selectableRowsComponent={Checkbox}
                    columns={[
                        {
                            name: 'id',
                            selector: row => row.id,
                            sortable: true,
                            width: '60px'
                        },
                        {
                            name: 'العمليه',
                            selector: row => row.product,
                            sortable: true,
                            grow: 2,
                        },
                        {
                            name: 'منصرف',
                            selector: row => row.vmoney,
                            sortable: true,
                        },
                        {
                            name: 'وارد',
                            selector: row => row.cmoney,
                            sortable: true,
                        },
                        {
                            name: 'مستحقات له',
                            selector: row => row.clientm,
                            sortable: true,
                        },
                        {
                            name: 'مستحقات عليه',
                            selector: row => row.vaultm,
                            sortable: true,
                        },
                        {
                            name: 'اجمالي ما له',
                            selector: row => row.totalc,
                            sortable: true,
                        },
                        {
                            name: 'اجمالي ما عليه',
                            selector: row => row.totalv,
                            sortable: true,
                        },
                        {
                            name: 'الرصيد',
                            selector: row => !isNaN(row.balance) ? Number(row.balance).toFixed(2) : row.balance,
                            sortable: true,
                        },
                    ]}
                    onRowDoubleClicked={(e) => { console.log({ e }) }}
                    data={rows5}
                />
            </div>
            <Dialog open={editrn} onClose={() => { seteditrn(false) }}>
                <DialogTitle>صرف صنف من المخزن</DialogTitle>
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
                        value={newdata.to}
                        variant="outlined"
                        disabled
                    />
                    <Autocomplete
                        id="free-solo-demo"
                        label='d'
                        style={{ marginRight: 20, width: 200 }}
                        fullWidth
                        onFocus={() => {
                            axios.get('http://localhost:1024/clients').then((resp) => {
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
                        renderInput={(params) => <TextField {...params} label="العميل" />}
                    />
                    <TextField
                        style={{ marginRight: 20 }}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn3} variant='contained' onClick={() => { createnewexport() }}>اضافه</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default Summery