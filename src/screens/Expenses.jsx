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

const mesures = [
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
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
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
function Expenses() {
    const [dark_theme_en, set_dark_theme_en] = useState('light')
    const [AccesToken, setAccesToken] = useState([]);
    const [rows, setrows] = useState([]);
    const [editrn, seteditrn] = useState(false)
    const [selected, setelected] = useState(
    )
    const columns = [
        {
            name: 'م',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'كود مرجعي',
            selector: row => row.refid,
            sortable: true,
        },
        {
            name: 'الاسم',
            selector: row => row.name,
            sortable: true,
            grow: 3

        },
        {
            name: 'قسم',
            selector: row => row.categeryname,
            sortable: true,
        },
        {
            name: 'نوع',
            selector: row => row.nestedcategoryname,
            sortable: true,
        },
        {
            name: 'الخزنه',
            selector: row => row.vaultname,
            sortable: true,
        },
        {
            name: 'تاريخ',
            selector: row => row.time.split('T')[0],
            sortable: true,
        },
        {
            name: 'القيمه',
            selector: row => row.amount,
            sortable: true,
        },
    ];


    useEffect(() => {
        axios.get('http://localhost:1024/expensescategory').then((resp) => {
            setfirstcat(resp.data.expensescategorys);
            editsetfirstcat(resp.data.expensescategorys)
        })
        axios.get('http://localhost:1024/expenses').then((resp) => {
            setrows(resp.data.expenses);
        })
    }, [])
    const [sel, setsel] = useState('seller')
    const [name, setname] = useState('')
    const [expenses, setexpenses] = useState('')
    const [payments, setpayments] = useState('')
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)




    const [newsel, setnewsel] = useState('')
    const [newsel2, setnewsel2] = useState('')
    const [firstcat, setfirstcat] = useState([])
    const [seccat, setseccat] = useState([])
    const [eseccat, seteseccat] = useState([])


    const [editnewsel, editsetnewsel] = useState('')
    const [editnewsel2, editsetnewsel2] = useState('')
    const [editfirstcat, editsetfirstcat] = useState([])
    const [editseccat, editsetseccat] = useState([])

    const [searchrefid, setsearchrefid] = useState('')
    const [searchname, setsearchname] = useState('')
    const [searchcat, setsearchcat] = useState('')

    const [newname, setnewname] = useState('')
    const [newexpenses, setnewexpenses] = useState('0')
    const [newpayments, setnewpayments] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')
    const [transdate, settransdate] = useState(new Date().toISOString().split('T')[0])
    const [edittransdate, setedittransdate] = useState('')
    const [editname, seteditname] = useState()
    const editsubmit = () => {
        if (date2 !== 'primary') {
            alert('date is invalid')
            return
        }
        if (name === '') {
            alert('name cannot be empty')
            return
        }
        if (secondvaultname === '') {
            alert('vault cannot be ampty')
            return
        }
        if (selected === '') {
            alert('please select a type')
            return
        }
        if (esel1 === '') {
            alert('please select a type')
            return
        }
        if (esel2 === '') {
            alert('please select a type')
            return
        }
        if (expenses === '') {
            alert('please enter an amount')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/editexpenses', { name, expenses, code, secondvaultname, selected, esel1, esel2, edittransdate }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/expenses').then((resp) => { setrows(resp.data.expenses) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }
    const createnew = () => {
        if (date1 !== 'primary') {
            alert('date is wrong')
            return
        }
        if (!newname) {
            alert('name cannot be empty')
            return
        }
        if (newsel == '') {
            alert('please select')
            return
        }
        if (newsel2 == '') {
            alert('please select sub')
            return
        }
        if (newexpenses === '') {
            alert('please enter a expenses')
            return
        }
        if (firstvaultdata == '') {
            alert('select vault')
            return
        }
        if (!newcode) {
            alert('please enter a refid');
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addexpenses', { name: newname, value: newexpenses, refid: newcode, sel1: newsel, sel2: newsel2, vault: firstvaultdata, transdate }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setrows([])
                setloadrn(false)
                seteditrn(false)
                setnewcode(Number(newcode) + 1)
                setnewsel('')
                setnewsel2('')
                setnewexpenses(0)
                setfirstvaultname('')
                setsecondvaultname('')
                setname('')
                setnewname('')
                setnewpayments(0)
                axios.get('http://localhost:1024/expenses').then((resp) => { setrows(resp.data.expenses) })
            } else {
                setloadrn(false)
                alert('failed')
            }
        })
    }



    const search = (text) => {
        setsearchload(true)
        axios.post('http://localhost:1024/searchexpenses', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://localhost:1024/expenses').then((resp) => { setrows(resp.data.expenses) })

            }
        })
    }
    const searchnamef = (text) => {
        setsearchload(true)
        axios.post('http://localhost:1024/searchexpensesnames', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://localhost:1024/expenses').then((resp) => { setrows(resp.data.expenses) })

            }
        })
    }
    const searchcatf = (text) => {
        setsearchload(true)
        axios.post('http://localhost:1024/searchexpensescategoryes', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://localhost:1024/expenses').then((resp) => { setrows(resp.data.expenses) })

            }
        })
    }
    const [prt, setprt] = useState(false)
    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => {
                axios.post('http://localhost:1024/deleteexpenses', { data: data.selectedRows }).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data)
                        setrows([])
                        setloadrn(false)
                        seteditrn(false)
                        axios.get('http://localhost:1024/expenses').then((resp) => { setrows(resp.data.expenses) })
                    } else {
                        setloadrn(false)
                        alert('failed')
                    }
                })
            }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                setprt(true); setTimeout(() => {
                    window.print()
                }, 200);
            }}>print</Button>
        </>
    );
    const [esel1, setesel1] = useState('')
    const [esel2, setesel2] = useState('')
    const [date1, setdate1] = useState('primary')
    const [date2, setdate2] = useState('primary')
    const actions = () => (
        <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="code"
                    size='small'
                    type="number"
                    value={newcode}
                    onBlur={() => {
                        axios.post('http://localhost:1024/expensescheckrefid', { refid: newcode }).then((resp) => {
                            if (resp.data.status == 200) {
                                if (resp.data.avail) {
                                    alert('refid is in use')
                                }
                            } else {
                                alert('failed')
                            }
                        })
                    }}
                    style={{ width: 150, marginLeft: 20, marginRight: 20 }}
                    onChange={(e) => { setnewcode(e.currentTarget.value) }}
                    variant="outlined"
                    label='الرقم المرجعى'
                />
                <TextField
                    style={{ marginRight: 20 }}
                    autoFocus
                    margin="dense"
                    size='small'
                    id="expenses"
                    label="التاريخ"
                    type="date"
                    value={transdate}
                    disabled={loadrn}
                    color={date1}
                    focused={date1 !== 'primary'}
                    onChange={(e) => {
                        settransdate(e.currentTarget.value)
                        setdate1(isNaN(Date.parse(new Date(e.currentTarget.value))) || new Date(e.currentTarget.value).getFullYear() > 5000 ? 'error' : 'primary')
                    }}
                    variant="outlined"
                />

                <Select
                    style={{ marginRight: 20 }}
                    variant='outlined'
                    value={newsel}
                    size='small'

                    onChange={(e) => {
                        setnewsel(e.target.value);
                        axios.post('http://localhost:1024/searchexpensescategory2byname', { searchtext: e.target.value }).then((resp) => {
                            setseccat(resp.data.foundproduts);
                            console.log(resp.data)
                        })
                    }}
                >
                    {firstcat.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    style={{ marginRight: 20 }}
                    variant='outlined'
                    value={newsel2}
                    size='small'

                    onChange={(e) => { setnewsel2(e.target.value) }}
                >
                    {seccat.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                <Autocomplete
                    id="free-solo-demo"
                    includeInputInList
                    freeSolo
                    style={{ marginRight: 20, width: 150 }}
                    value={firstvaultname}
                    onInputChange={(event, newInputValue) => {
                        setfirstvaultname(newInputValue);
                        search1(newInputValue)
                    }}
                    onFocus={() => {
                        axios.get('http://localhost:1024/vault').then((resp) => {
                            if (resp.data.status == 200) {
                                setfirstvaultdata(resp.data.vault)
                            }
                        })
                    }}
                    onDoubleClick={() => { }}
                    options={firstvaultdata.map((option) => option.name)}
                    renderInput={(params) => <TextField {...params} label="من" />}
                    size='small'
                />
                <TextField
                    style={{ marginRight: 20 }}
                    autoFocus
                    margin="dense"
                    size='small'

                    id="expenses"
                    label="المبلغ"
                    type="number"
                    value={newexpenses}
                    onChange={(e) => { setnewexpenses(e.currentTarget.value) }}
                    variant="outlined"
                />
                <TextField
                    style={{ marginRight: 20, width: 300 }}
                    autoFocus
                    margin="dense"
                    id="name"
                    size='small'
                    multiline
                    label="اسم العمليه"
                    type="text"
                    value={newname}
                    onChange={(e) => { setnewname(e.currentTarget.value) }}
                    variant="outlined"
                />

            </div>


        </div>
    );
    const [firstvaultdata, setfirstvaultdata] = useState([])
    const [firstvaultname, setfirstvaultname] = useState('')
    const [secondvaultdata, setsecondvaultdata] = useState([])
    const [secondvaultname, setsecondvaultname] = useState('')

    const [selectedRows, setselectedRows] = useState([])
    const [data, setdata] = useState([])
    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [refreshloading, setrefreshloading] = useState(false)
    const search1 = (text) => {
        axios.post('http://localhost:1024/searchvault', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setfirstvaultdata(resp.data.foundproduts)
            }
        })
    }
    const search2 = (text) => {
        axios.post('http://localhost:1024/searchvault', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsecondvaultdata(resp.data.foundproduts)
            }
        })
    }
    return (
        <div style={{ width: '100%' }}>
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
                                <h4>فاتوره مصروفات</h4>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <DataTable
                                dense
                                direction="rtl"
                                columns={columns}
                                data={selectedRows}
                            />
                            <div style={{ marginTop: 30, display: 'flex', width: '100%', justifyContent: 'start' }}>
                                <Typography color={'#000'} style={{ marginLeft: 50 }}>
                                    اجمالي المبلغ : {totalamount}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <h1>{totalprice}</h1>
                </div>
            </Modal>
            <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'start', flexDirection: 'row' }}>

            </div>
            <div style={{ width: '100%', display: 'flex', marginTop: 10, alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginTop: 10, alignItems: 'baseline' }}>
                    <TextField
                        style={{ marginLeft: 40 }}
                        autoFocus
                        margin="dense"
                        id="search"
                        label="الرقم المرجعي"
                        type="number"
                        value={searchrefid}
                        onChange={(e) => { setsearchrefid(e.target.value); search(e.target.value) }}
                        variant="standard"
                    />
                    <TextField
                        style={{ marginLeft: 40 }}
                        autoFocus
                        margin="dense"
                        id="search"
                        label="الاسم"
                        type="text"
                        value={searchname}
                        onChange={(e) => { setsearchname(e.target.value); searchnamef(e.target.value) }}
                        variant="standard"
                    />
                    <TextField
                        style={{ marginLeft: 40 }}
                        autoFocus
                        margin="dense"
                        id="search"
                        label="النوع"
                        type="text"
                        value={searchcat}
                        onChange={(e) => { setsearchcat(e.target.value); searchcatf(e.target.value) }}
                        variant="standard"
                    />
                    <Button style={{ height: 30, marginLeft: 20 }} disabled={searchload} variant='contained' color='error' onClick={() => {
                        setsearchtext(''); axios.get('http://localhost:1024/expenses').then((resp) => { setrows(resp.data.expenses) })
                    }}>Clear</Button>
                </div>
                <div>
                    <Button style={{ height: 30, marginRight: 20 }} disabled={refreshloading} variant='contained' color='warning' onClick={() => {
                        setrefreshloading(true);
                        axios.get('http://localhost:1024/expenses').then((resp) => { setrows(resp.data.expenses); setrefreshloading(false) })
                    }} endIcon={<Refresh />}>Refresh</Button>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <Button size='medium'
                        style={{ margin: 20 }}
                        disabled={newloadrn} variant='contained' onClick={() => { createnew() }}>اضافه</Button>
                </div>
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
                        seteditrn(true);
                        setelected(data);
                        console.log(data);
                        setnewsel('categeryname')
                        setcode(data.refid);
                        setexpenses(data.amount);
                        setname(data.name);
                        setsecondvaultname(data.vaultname)
                        setesel1(data.categeryname)
                        axios.post('http://localhost:1024/searchexpensescategory2byname', { searchtext: data.categeryname }).then((resp) => {
                            seteseccat(resp.data.foundproduts);
                            setesel2(data.nestedcategoryname)
                            console.log(resp.data)
                        })
                        setedittransdate(data.time.split('T')[0])
                    }} />
            </div>
            <Dialog open={editrn}>
                <DialogTitle>تعديل مصروف</DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            autoFocus
                            style={{ margin: 5 }}
                            margin="dense"
                            id="code"
                            label="الكود المرجعي"
                            type="number"
                            value={code}
                            onChange={(e) => { setcode(e.currentTarget.value) }}
                            size='small'
                            variant="outlined"
                        />
                        <Select
                            variant='outlined'
                            value={esel1}
                            size='small'
                            style={{ margin: 5 }}
                            onChange={(e) => {
                                setesel1(e.target.value);
                                axios.post('http://localhost:1024/searchexpensescategory2byname', { searchtext: e.target.value }).then((resp) => {
                                    seteseccat(resp.data.foundproduts);
                                    console.log(resp.data)
                                })
                            }}
                        >
                            {firstcat.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            variant='outlined'
                            value={esel2}
                            size='small'
                            style={{ margin: 5 }}
                            onChange={(e) => { setesel2(e.target.value) }}
                        >
                            {eseccat.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Autocomplete
                            id="free-solo-demo"
                            includeInputInList
                            freeSolo
                            style={{ width: 210, margin: 5 }}
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
                            renderInput={(params) => <TextField {...params} label="من" />}
                            size='small'
                        />
                        <TextField
                            margin="dense"
                            label="الاسم"
                            type="text"
                            style={{ margin: 5 }}
                            value={name}
                            onChange={(e) => { setname(e.currentTarget.value) }}
                            size='small'
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            size='small'
                            label="التاريخ"
                            type="date"
                            style={{ margin: 5 }}
                            value={edittransdate}
                            disabled={loadrn}
                            color={date2}
                            focused={date2 !== 'primary'}
                            onChange={(e) => {
                                setedittransdate(e.currentTarget.value)
                                setdate2(isNaN(Date.parse(new Date(e.currentTarget.value))) || new Date(e.currentTarget.value).getFullYear() > 5000 ? 'error' : 'primary')
                            }}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            label="المبلغ"
                            type="number"
                            value={expenses}
                            style={{ margin: 5 }}
                            onChange={(e) => { setexpenses(e.currentTarget.value) }}
                            size='small'
                            variant="outlined"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { seteditrn(false) }} >الغاء</Button>
                    <Button disabled={loadrn} variant='contained' onClick={() => { editsubmit() }}>حفظ</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default Expenses