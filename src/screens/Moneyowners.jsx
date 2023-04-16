import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem'
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import { Checkbox } from '@blueprintjs/core';
import Refresh from '@mui/icons-material/RefreshRounded'
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete'
import DataTable, { createTheme } from 'react-data-table-component';


const mesures = [
    {
        value: 'out',
        label: 'من الخزنه',
    },
    {
        value: 'in',
        label: 'الي الخزنه',
    },
];
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
function Moneyowners() {

    const [firstvaultname, setfirstvaultname] = useState('')
    const [secondvaultname, setsecondvaultname] = useState('')
    const [firstvaultdata, setfirstvaultdata] = useState([])
    const [secondvaultdata, setsecondvaultdata] = useState([])
    const [data, setdata] = useState([])
    const search1 = (text) => {
        axios.post('http://localhost:1024/searchclients', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setfirstvaultdata(resp.data.foundproduts)
            }
        })
    }

    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);


    const [rows, setrows] = useState([]);
    const [selectedRows, setselectedRows] = useState([])

    const [editrn, seteditrn] = useState(false)
    const [selected, setelected] = useState(
    )
    const columns = [
        {
            name: 'م',
            selector: row => row.id,
            sortable: true,
            headerStyle: (selector, id) => {
                return { textAlign: "center" };   // removed partial line here
            },
            width: "55px"                       // another for example

        },
        {
            name: 'الاسم',
            selector: row => row.name,
            sortable: true,
            size: 20
        },
        {
            name: 'له',
            selector: row => row.payment.toFixed(2).toString().split('.')[1] == '00' ? row.payment : row.payment.toFixed(2),
            sortable: true,

        },
        {
            name: 'عليه',
            selector: row => row.payed.toFixed(2).toString().split('.')[1] == '00' ? row.payed : row.payed.toFixed(2),
            sortable: true,
        },
        {
            name: 'الفرق',
            selector: row => (row.payment - row.payed).toFixed(2).toString().split('.')[1] == '00' ? (row.payment - row.payed) : (row.payment - row.payed).toFixed(2),
            sortable: true,
            width: '130px',
            conditionalCellStyles: [
                {
                    when: row => (row.payed - row.payment) < 0,
                    style: {
                        backgroundColor: 'rgba(255, 70, 70, 1)',
                        color: 'white'
                    }
                },
                {
                    when: row => (row.payed - row.payment) > 0,
                    style: {
                        backgroundColor: 'rgb(70, 255, 103)',
                        color: 'black',
                    }
                },
                {
                    when: row => (row.payed - row.payment) == 0,
                    style: {
                        backgroundColor: 'rgb(255 246 70)',
                        color: 'black',
                    }
                }
            ]
        }
    ];


    useEffect(() => {
        axios.get('http://localhost:1024/moneyowner').then((resp) => {
            setrows(resp.data.vault);
        })
    }, [])
    const [sel, setsel] = useState('seller')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState('')
    const [payments, setpayments] = useState('')
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)

    const [transvalue, settransvalue] = useState('')


    const [newsel, setnewsel] = useState('in')
    const [newname, setnewname] = useState('')
    const [newexpenses, setnewexpenses] = useState('0')
    const [newpayments, setnewpayments] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')


    const editsubmit = () => {
        setloadrn(true)
        axios.post('http://localhost:1024/editmoneyowner', { name, expenses, value: payments, code, selid, sel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/moneyowner').then((resp) => { setrows(resp.data.vault) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const createnew = () => {
        if (!newname) {
            alert('name cannot be empty')
            return
        }
        if (newpayments === '') {
            alert('please enter an payments')
            return
        }
        if (newcode === '') {
            alert('please enter a code')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addmoneyowner', { name: newname, value: newpayments, code: newcode }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                setnewname('')
                setnewpayments(0)
                seteditrn(false)
                setnewcode(newcode + 1)
                axios.get('http://localhost:1024/moneyowner').then((resp) => { setrows(resp.data.vault) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }

    const [prt, setprt] = useState(false)

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
        <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>

            <TextField
                style={{ marginRight: 20 }}
                autoFocus
                margin="dense"
                id="name"
                label="الاسم"
                type="text"
                value={newname}
                onChange={(e) => { setnewname(e.currentTarget.value) }}
                variant="standard"
            />
            <TextField
                style={{ marginRight: 20 }}
                autoFocus
                margin="dense"
                id="payments"
                label="الرصيد"
                type="number"
                value={newpayments}
                onChange={(e) => { setnewpayments(e.currentTarget.value) }}
                variant="standard"
            />
            <Button disabled={newloadrn} variant='contained' onClick={() => { createnew() }}>Create</Button>

        </div>
    );


    const [editload, seteditload] = useState(false)

    const submitedit = () => {
        axios.post('http://localhost:1024/editmoneyowner', { name: editname, payment: editpayment, payed: editpayed, selid: data.id }).then((resp) => {
            if (resp.data.status == 200) {
                seteditload(false)
                console.log(resp.data)
                axios.get('http://localhost:1024/moneyowner').then((resp) => {
                    setrows(resp.data.vault);
                })
                seteditrn(false)
            } else if (resp.data.status == 400) {
                seteditload(false)
                alert('name must be unique')
            } else {
                alert('failed')
                seteditload(false)
                axios.get('http://localhost:1024/moneyowner').then((resp) => { setrows(resp.data.vault) })
            }
        })
    }



    const search = (text) => {
        setsearchload(true)
        axios.post('http://localhost:1024/searchmoneyowners', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.mowners)
            }
        }).catch((e) => {
            setsearchload(false)
            alert(e.message)
        })
    }
    const [refreshloading, setrefreshloading] = useState(false)
    const [editname, seteditname] = useState('')
    const [editpayment, seteditpayment] = useState('')
    const [editpayed, seteditpayed] = useState('')
    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', marginTop: 10, alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginTop: 10, alignItems: 'baseline' }}>
                    <TextField
                        style={{ marginLeft: 40 }}
                        autoFocus
                        margin="dense"
                        id="search"
                        label="search"
                        type="text"
                        value={searchtext}
                        onChange={(e) => { setsearchtext(e.target.value); search(e.target.value) }}
                        variant="standard"
                    />
                    <Button style={{ height: 30, marginLeft: 20 }} disabled={searchload} variant='contained' color='error' onClick={() => {
                        setsearchtext(''); axios.get('http://localhost:1024/moneyowner').then((resp) => { setrows(resp.data.vault) })
                    }}>Clear</Button>
                </div>
                <div>
                    <Button style={{ height: 30, marginRight: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrefreshloading(true);
                        axios.get('http://localhost:1024/moneyowner').then((resp) => { setrows(resp.data.vault); setrefreshloading(false) })
                    }} endIcon={<Refresh />}>Refresh</Button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <DataTable
                    contextActions={contextActions()}
                    actions={actions()}
                    pagination
                    dense
                    theme='newtheme'
                    paginationPerPage={100}
                    selectableRowsComponent={Checkbox}
                    highlightOnHover
                    pointerOnHover
                    fixedHeader
                    fixedHeaderScrollHeight='450px'
                    selectableRowsHighlight
                    direction="rtl"
                    onRowDoubleClicked={(data) => {
                        setdata(data);
                        seteditname(data.name)
                        seteditpayed(data.payed)
                        seteditpayment(data.payment)
                        seteditrn(true);
                    }}
                    columns={columns}
                    data={rows}
                />
            </div>
            <Dialog open={editrn} onClose={() => [seteditrn(false)]}>
                <DialogTitle>تعديل شريك</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <TextField
                            size='small'
                            margin="dense"
                            label='الاسم'
                            type="text"
                            value={editname}
                            style={{ margin: 10, width: 300 }}
                            onChange={(e) => { seteditname(e.target.value); }}
                            variant="outlined"
                        />
                        <TextField
                            size='small'
                            margin="dense"
                            label='له'
                            type="number"
                            value={editpayment}
                            style={{ margin: 10, width: 300 }}
                            onChange={(e) => { seteditpayment(e.target.value); }}
                            variant="outlined"
                        />
                        <TextField
                            size='small'
                            margin="dense"
                            label='عليه'
                            type="number"
                            value={editpayed}
                            style={{ margin: 10, width: 300 }}
                            onChange={(e) => { seteditpayed(e.target.value); }}
                            variant="outlined"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => {
                        axios.post('http://localhost:1024/delmoneyowner', { selid: data.id }).then((resp) => {
                            if (resp.data.status == 200) {
                                seteditload(false)
                                console.log(resp.data)
                                axios.get('http://localhost:1024/moneyowner').then((resp) => {
                                    setrows(resp.data.vault);
                                })
                                seteditrn(false)
                            } else if (resp.data.status == 400) {
                                seteditload(false)
                                alert('cannot delete')
                            } else {
                                alert('failed')
                                seteditload(false)
                                axios.get('http://localhost:1024/moneyowner').then((resp) => { setrows(resp.data.vault) })
                            }
                        })

                    }} color='error'>حذف</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { submitedit() }}>حفظ</Button>
                </DialogActions>
            </Dialog>


        </div>

    )
}

export default Moneyowners