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
import { Print } from '@mui/icons-material';
import { Box, Step, StepButton, Stepper } from '@mui/material';

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

function Productsmerge() {
    const [newprodname, setnewprodname] = useState('')
    const [firstprodname, setfirstprodname] = useState('')
    const [firstproderror, setfirstproderror] = useState(false)
    const [firstproddata, setfirstproddata] = useState([])
    const [secondprodname, setsecondprodname] = useState('')
    const [secondproderror, setsecondproderror] = useState(false)
    const [secondproddata, setsecondproddata] = useState([])
    const [done, setdone] = useState(false)
    const [fa, setfa] = useState(0)
    const [sa, setsa] = useState(0)
    const [eq, seteq] = useState(false)



    const check = () => {
        axios.post('http://localhost:1024/checkifmergable', { first: firstprodname, second: secondprodname }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                setfirstproderror(false)
                setsecondproderror(false)
                setfa(resp.data.firstamount)
                setsa(resp.data.secondamount)
                seteq(resp.data.equal)
                setdone(true)
            } else if (resp.data.status == 400) {
                if (resp.data.error1 == true) {
                    setfirstproderror(true)
                } else {
                    setfirstproderror(false)
                }
                if (resp.data.error2 == true) {
                    setsecondproderror(true)
                } else {
                    setsecondproderror(false)
                }
                console.log(resp.data , {firstproderror , secondproderror})
            }
            else {
                console.log(resp.data)
                alert('failed')
            }
        })
    }


    return (
        <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <div style={{ filter: done ? 'blur(1px)' : '', width: '50%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Autocomplete
                    id="free-solo-demo"
                    label='d'
                    style={{ marginBottom: 50, width: 400, backgroundColor: firstproderror ? '#f00' : '#00000000' }}
                    onFocus={() => {
                        axios.get('http://localhost:1024/products').then((resp) => {
                            setfirstproddata(resp.data.products)
                        })
                    }}
                    value={firstprodname}
                    onInputChange={(event, newInputValue) => {
                        setfirstprodname(newInputValue);
                        setfirstproderror(false)
                    }}
                    options={firstproddata.map((option) => option.name)}
                    size='medium'
                    disabled={done}
                    renderInput={(params) => <TextField {...params} label="الصنف الاول" />}
                />
                <Autocomplete
                    id="free-solo-demo"
                    label='d'
                    style={{ marginBottom: 50, width: 400, backgroundColor: secondproderror ? '#f00' : '#00000000' }}
                    onFocus={() => {
                        axios.get('http://localhost:1024/products').then((resp) => {
                            setsecondproddata(resp.data.products)
                        })
                    }}
                    value={secondprodname}
                    disabled={done}
                    onInputChange={(event, newInputValue) => {
                        setsecondprodname(newInputValue);
                        setsecondproderror(false)
                    }}
                    options={secondproddata.map((option) => option.name)}
                    size='medium'
                    renderInput={(params) => <TextField {...params} label="الصنف الثاني" />}
                />
                <Button
                    disabled={done}
                    variant='contained'
                    style={{ width: 400 }}
                    onClick={() => {
                        check()
                    }}
                >
                    التالي
                </Button>

            </div>
            <div style={{ filter: !done ? 'blur(1px)' : '', width: '50%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color={eq ? '#fff' : '#f00'}>
                    الكميه الاولي : {fa}
                </Typography>
                <Typography color={eq ? '#fff' : '#f00'}>
                    الكميه الثانيه : {sa}
                </Typography>
                <TextField
                    style={{ marginBottom: 50, width: 400 }}
                    autoFocus
                    margin="dense"
                    size='medium'
                    id="expenses"
                    label="اسم الصنف الجديد"
                    type="text"
                    value={newprodname}
                    onChange={(e) => { setnewprodname(e.currentTarget.value) }}
                    disabled={!done}
                    variant="outlined"
                />
                <Button
                    disabled={!done}
                    variant='contained'
                    color='success'
                    style={{ width: 400 }}
                    onClick={() => {
                        setdone(false)
                    }}
                >
                    تأكيد
                </Button>

            </div>
        </div>
    )
}

export default Productsmerge