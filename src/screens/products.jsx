import React, { useEffect, useState, useRef } from 'react'
import { Space, Table, Tag, Input, InputNumber, Tooltip, Button, Form, message, Popconfirm, Modal } from 'antd';
import axios from 'axios';
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
import { Checkbox, InputGroup, Overlay } from '@blueprintjs/core';
import ReactToPrint from 'react-to-print';
import logo from './../static/b2b.png'
import Refresh from '@mui/icons-material/RefreshRounded'
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete'


import DataTable, { createTheme } from 'react-data-table-component';
const { Search } = Input;







const NumericInput = (props) => {
    const { value, onChange } = props;
    const formatNumber = (value) => new Intl.NumberFormat().format(value);

    const handleChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };
    const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
        'Input a number'
    );
    return (
        <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
            <Input
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Input a number"
                maxLength={16}

            />
        </Tooltip>
    );
};








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
const ExpandedComponent = ({ data }) => <div>{JSON.stringify(data, null, 2)}</div>;

function Products() {
    const componentRef = useRef();

    const [rows, setrows] = useState([
    ]);
    const [editrn, seteditrn] = useState(false)
    const [selected, setelected] = useState(
    )
    const columns = [
        {
            title: 'م',
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'اسم الصنف',
            dataIndex: "name",
            key: "name",
            sortable: true,
            size: 20,
            sorter: (a, b) => a.name - b.name,

        },
        {
            title: 'الكمية بالمخزن',
            dataIndex: "quantity",
            key: "quantity",
            sortable: true,
            sorter: (a, b) => a.quantity - b.quantity,

        },
        {
            title: 'الكمية بالثلاجه',
            dataIndex: "famount",
            key: "famount",
            sortable: true,
            sorter: (a, b) => a.famount - b.famount,

        }
    ];


    useEffect(() => {
        axios.get('http://localhost:1024/products').then((resp) => {
            setrows(resp.data.products);
            setnewcode(resp.data.products.length + 1);
        })
    }, [])
    const [sel, setsel] = useState('unit')
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    const [amount, setamount] = useState('')
    const [code, setcode] = useState()
    const [selid, setselid] = useState()
    const [loadrn, setloadrn] = useState(false)
    const [AccesToken, setAccesToken] = useState([]);

    // useEffect(() => {
    //     const AccesToken = localStorage.getItem('AccesToken');
    //     if (AccesToken) {
    //         setAccesToken(AccesToken);
    //     }
    //     const Theme = localStorage.getItem('Theme');
    //     if (Theme == 'dark' || Theme == 'light') {
    //         updatetheme(Theme);
    //     } else {
    //         localStorage.setItem('Theme', 'light')
    //         updatetheme('light')
    //     }
    // }, []);



    const [newsel, setnewsel] = useState('unit')
    const [newname, setnewname] = useState('')
    const [newprice, setnewprice] = useState('0')
    const [newamount, setnewamount] = useState('0')
    const [newcode, setnewcode] = useState()
    const [newselid, setnewselid] = useState()
    const [newloadrn, setnewloadrn] = useState(false)
    const [searchload, setsearchload] = useState(false)
    const [searchtext, setsearchtext] = useState('')

    const onSearch = (value) => { setsearchtext(value); search(value) }

    const editsubmit = () => {
        setloadrn(true)
        axios.post('http://localhost:1024/editproduct', { name, price, amount, code, selid, sel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                message.success('Success')
                setrows([])
                setloadrn(false)
                seteditrn(false)
                axios.get('http://localhost:1024/products').then((resp) => { setrows(resp.data.products) })
            } else {
                setloadrn(false)
                message.error('Failed')
            }
        })
    }
    const createnew = () => {
        if (!newname) {
            message.error('name cannot be empty')
            return
        }
        if (newamount === '') {
            message.error('please enter an amount')
            return
        }
        if (newcode === '') {
            message.error('please enter a code')
            return
        }
        if (newprice === '') {
            message.error('please enter a price')
            return
        }
        setloadrn(true)
        axios.post('http://localhost:1024/addproduct', { name: newname, price: newprice, amount: newamount, code: newcode, selectmode: newsel }).then((resp) => {
            if (resp.data.status == 200) {
                console.log(resp.data)
                message.success('Success')
                setrows([])
                setloadrn(false)
                seteditrn(false)
                setnewcode(newcode + 1)
                setnewamount(0)
                setnewname('')
                setnewprice(0)
                axios.get('http://localhost:1024/products').then((resp) => { setrows(resp.data.products) })
            } else {
                setloadrn(false)
                message.error('Failed')
            }
        }).catch(e => message.error(e.message))
    }



    const search = (text) => {
        setsearchload(true)
        axios.post('http://localhost:1024/searchproduct', { searchtext: text }).then((resp) => {
            if (resp.data.status == 200) {
                setsearchload(false)
                console.log(resp.data)
                setrows([])
                setrows(resp.data.foundproduts)
            } else {
                setloadrn(false)
                alert('failed')
                setsearchload(false)
                axios.get('http://localhost:1024/products').then((resp) => { setrows(resp.data.products) })

            }
        })
    }


    const contextActions = () => (
        <>
            <Button color='error' variant='contained' onClick={() => {
                axios.post('http://localhost:1024/deleteproduct', { deleteproduct: selectedRows }).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data)
                        setrows([])
                        setrows(resp.data.products)
                    } else {
                        alert('failed')
                        axios.get('http://localhost:1024/products').then((resp) => { setrows(resp.data.products) })

                    }
                })
            }}>delete</Button>
            <Button color='success' style={{ marginRight: 20 }} variant='contained' onClick={() => {
                axios.post('http://localhost:1024/print/productssum', {}).then((resp) => {
                    setTimeout(() => {
                        window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                    }, 500);
                })
            }}> print</Button>
        </>
    );
    const [totalprice, settotalprice] = useState(0)
    const [totalamount, settotalamount] = useState(0)
    const [selectedRows, setselectedRows] = useState([])
    const [data, setdata] = useState('')

    const [newdata, setnewdata] = useState({})
    const [newloss, setnewloss] = useState(0)

    const [prt, setprt] = useState(false)
    const [refreshloading, setrefreshloading] = useState(false)
    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%', alignItems: 'baseline', display: 'flex', justifyContent: 'start', flexDirection: 'row' }}>
            </div>
            <div style={{ width: '100%', display: 'flex', marginTop: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginTop: 10, alignItems: 'baseline', width: '100%', justifyContent: 'space-between' }}>
                    <div>
                        <InputNumber
                            style={{
                                width: 200,
                                margin: 10
                            }}
                            value={newamount}
                            addonBefore='الكمية'
                            min='0'
                            max='100000000'
                            onChange={setnewamount}
                        />
                        <Input
                            style={{
                                width: 200,
                                margin: 10
                            }}
                            value={newname}
                            addonBefore='الاسم'
                            onChange={e => setnewname(e.target.value)}
                        />
                        <Button
                            loading={newloadrn}
                            style={{
                                margin: 10
                            }}
                            type='primary'
                            onClick={() => { createnew() }}>
                            تأكيد
                        </Button>

                    </div>
                    <div style={{ alignItems: 'center', display: 'flex' }}>

                        <Search
                            placeholder="search"
                            allowClear
                            onSearch={onSearch}
                            style={{
                                width: 200,
                                margin: 10
                            }}
                        />
                        <Button
                            type='primary'
                            onClick={() => {
                                message.loading('Request Sent, Please Wait...', 2, () => message.success('Success'))
                                axios.post('http://localhost:1024/print/productssum', {}).then((resp) => {
                                    setTimeout(() => {
                                        window.open('http://localhost:1024/' + resp.data.file, '_blank', 'noreferrer')
                                    }, 500);
                                })
                            }}
                            style={{
                                margin: 10
                            }} >
                            Print
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%' }}>

                <Table
                    dataSource={rows}
                    size='small'
                    columns={columns}
                    direction='ltr'

                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => { }, // click row
                            onDoubleClick: (event) => {
                                setelected(record);
                                console.log(record);
                                setcode(record.code);
                                setamount(record.quantity);
                                setname(record.name);
                                setprice(record.price);
                                setsel(mesures[record.wayofmesure].value);
                                setselid(record.id)
                                seteditrn(true);
                            }, // double click row
                            onContextMenu: (event) => { }, // right button click row
                            onMouseEnter: (event) => { }, // mouse enter row
                            onMouseLeave: (event) => { }, // mouse leave row
                        };
                    }}
                />;
            </div>
            <Modal
                title='Edit'
                open={editrn}
                centered
                closable
                maskClosable
                width={400}
                onCancel={() => { seteditrn(false); message.info('Canceled') }}
                footer={[

                    <Button
                        type='default'
                        loading={loadrn}
                        onClick={() => { seteditrn(false); message.info('Canceled') }} >
                        Cancel
                    </Button>,
                    <Button
                        type='primary'
                        loading={loadrn}
                        onClick={() => { editsubmit() }}>
                        Save
                    </Button>,
                    <Popconfirm
                        title="Delete"
                        style={{ zIndex: 9999 }}
                        description="Are you sure to delete this product?"
                        onConfirm={e => message.error('Failed')}
                        onCancel={e => message.info('Canceled')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            loading={loadrn}
                            type='default'
                            danger
                        >
                            delete
                        </Button>
                    </Popconfirm>
                ]}
            >
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 300 }}>
                    <InputNumber
                        style={{
                            width: '100%',
                            margin: 10
                        }}
                        value={amount}
                        addonBefore='الكمية'
                        min='0'
                        max='100000000'
                        onChange={setamount}
                    />
                    <Input
                        style={{
                            width: '100%',
                            margin: 10
                        }}
                        value={name}
                        addonBefore='الاسم'
                        onChange={e => setname(e.target.value)}
                    />
                </div>
            </Modal>
        </div>

    )
}

export default Products