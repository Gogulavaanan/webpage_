import React, { useEffect, useState } from "react";
import "./main.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useFormik } from "formik";
import * as yup from "yup"
const data = [
  { id: 1, Title: "Facial", price: 3000, count: 0 },
  { id: 2, Title: "Hair Dressing", price: 1800, count: 0 },
  { id: 3, Title: "Threading", price: 100, count: 0 },
  { id: 4, Title: "Manicure & Pedicure", price: 150, count: 0 },
  { id: 5, Title: "Nail extension", price: 400, count: 0 },
  { id: 6, Title: "Eyelash Extension", price: 400, count: 0 }
]
let Total = 0
let isClicked = false;
let productName = [];




function GridComplexExample() {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      address: '',
      city: '',
      zip: ''
    },
    validationSchema: yup.object({
      name: yup.string().min(3, "min 3 character required").required("Name is required"),
      email: yup.string().email().required("email is required"),
      mobile: yup.string().length(10).required("Mobile number is required"),
      address: yup.string().required("address is required"),
      city: yup.string().max(15).required("required"),
      zip: yup.string().required("pincode is required").length(6)

    }),
    onSubmit: () => {
      alert("successfully placed your order")
      window.location.reload(false);
    }
  })
  return (
    <div className="container">
      <div className="formstyle" >
        <form autoComplete="off" onSubmit={formik.handleSubmit}  >
          <div className="form-group">
            <label> First name:</label>
            <input className="form-control" type="text" name="name" value={formik.values.name} onChange={formik.handleChange}></input>

            {formik.errors.name ?
              <div className="text-danger">{formik.errors.name}</div>
              : null
            }
          </div>
          <div className="form-group">
            <label> Email:</label>
            <input className="form-control" type="email" name="email" value={formik.values.email} onChange={formik.handleChange}></input>
            {formik.errors.email ?
              <div className="text-danger">{formik.errors.email}</div>
              : null
            }
          </div>
          <div className="form-group">
            <label> Mobile:</label>
            <input className="form-control" type="number" name="mobile" value={formik.values.mobile} onChange={formik.handleChange}></input>
            {formik.errors.mobile ?
              <div className="text-danger">{formik.errors.mobile}</div>
              : null
            }
          </div>
          <div className="form-group">
            <label> Address:</label>
            <input className="form-control" type="text" name="address" value={formik.values.address} onChange={formik.handleChange}></input>
            {formik.errors.address ?
              <div className="text-danger">{formik.errors.address}</div>
              : null
            }
          </div>
          <div className="form-group">
            <label> City:</label>
            <input className="form-control" type="text" name="city" value={formik.values.city} onChange={formik.handleChange}></input>
            {formik.errors.city ?
              <div className="text-danger">{formik.errors.city}</div>
              : null
            }
          </div>
          <div className="form-group">
            <label> Zip:</label>
            <input className="form-control" type="number" name="zip" value={formik.values.zip} onChange={formik.handleChange}></input>
            {formik.errors.zip ?
              <div className="text-danger">{formik.errors.zip}</div>
              : null
            }
          </div><br></br>
          <div>
            <center>
              <button >submit</button>
            </center>
          </div>


        </form>
      </div>
      <div className="img">
      <img src="https://img.freepik.com/free-photo/makeup-brushes-with-whirling-pink-powder_23-2148208975.jpg?size=338&ext=jpg&ga=GA1.2.1416782506.1666104313"></img>
     
      </div>
    </div>
  );
}

function Example() {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    if (Total !== 0) {
      setFullscreen(breakpoint);
      setShow(true);
    } else {
      alert('Please add the items to cart to place the order');
    }
  }

  return (
    <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 modalButtons" onClick={() => handleShow(v)}>
          Place order
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <div className="formmodal">
        <Modal.Header closeButton>
          <Modal.Title className="fillyou"><marquee scrollamount="10" className="scroll">Thanks &nbsp;&nbsp; for &nbsp;&nbsp; placing &nbsp;&nbsp;your&nbsp;&nbsp; Order</marquee></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GridComplexExample
          />
        </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  if (isClicked) {
    productName = props.productId;
    isClicked = false;
    Total = 0;
    if (productName) {
      productName.map(item => {
        Total = Total + item.Price
      })
    }

  } else {
    productName = productName;

  }

  const [aftersplice, setaftersplice] = useState([])

  useEffect(() => {
    if (productName) {
      setaftersplice(productName)
    }
  }, [productName])

  const deleteProduct = (e) => {
    productName = productName.filter(obj => {
      return obj.id !== e.id;
    });
    setaftersplice(productName);
    Total = Total - e.Price
  }

  const modalclose = () => {
    if(props.cartcount){
      props.onHide();
      localStorage.clear();
      props.initializecart1()
      localStorage.setItem("testobject", productName)
    }else{
      props.onHide();
    }
   
  }
  let j = 1;

  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" class="modalTitle">
          Cart Items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table class="cartTable">
          {aftersplice && (
            aftersplice.map((items, idx) =>
              <tr>
                <td>{j++}.</td>
                <td>{items.Title}</td>
                <td>Rs. {items.Price}</td>
                <td>< BsTrash onClick={() => deleteProduct(items)} id="yourcart" /></td>
              </tr>
            ))}
          <tr>
            <td></td>
            <td class="totalText">Total:</td>
            <td class="totalText">Rs. {Total}</td>
            <td></td>
          </tr>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Example />
        <Button onClick={modalclose} className="modalButtons">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [getData, setgetData] = React.useState();
  const getproduct = () => {
    const cartItemsList = JSON.parse(localStorage.getItem('testObject'));
    setModalShow(true);
    isClicked = true;
    setgetData(cartItemsList)
  }

  return (
    <>
      <Button id="cartbtn" variant="primary" onClick={getproduct}>
        <span id="navcart"><AiOutlineShoppingCart />
          <span id="cartnum">{props.count1}</span></span>
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        productId={getData}
        cartcount={props.count1}
        initializecart1={props.initializecart}
      />
    </>
  );
}

export default class Main extends React.Component {

  state = {
    cartItems: productName,
    cartcount: 0
  }

  initializecartitem = () => {
    this.setState({
      cartItems: productName
    })
    if (productName) {
      this.setState({ cartcount: productName.length })
      Total = 0;
      productName.map(item => {
        Total = Total + item.Price
      })
    }
  }

  selectproduct = (id, title, price) => {
    let temp = false
    var obj = {
      id: id,
      Title: title,
      Price: price
    }

    if (this.state.cartItems !== null) {
      this.state.cartItems.map(items => {
        if (temp === false ) {
          if (items.id === id) {
            temp = true
          }
          else {
            temp = false
          }
        }

      })
     
    }

    if (temp === false) {
      this.state.cartItems.push(obj)
    }
    else {
      alert("Product is already in CART")
    }  
    localStorage.setItem('testObject', JSON.stringify(this.state.cartItems));
    this.setState({  cartcount : this.state.cartItems.length })
  }

  render() {
    return (
      <div>
        <div id="navbar">
          <nav id="nav1">
            <h2 id="shoptitle">Bridal Shop</h2>
            <App
              count1={this.state.cartcount}
              initializecart={this.initializecartitem}
            />
          </nav>
        </div>
        <div id="container1">
          {data.map((item, index) =>
            <div class="box1">
              <p id="title">{item.Title}</p>
              <p id="price" >Rs.{item.price}</p>
              <button class="addToCartBtn" onClick={() => this.selectproduct(item.id, item.Title, item.price)}>Add to cart</button>
            </div>
          )}
        </div>
      </div>
    )
  }
}