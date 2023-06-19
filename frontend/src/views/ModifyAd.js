import NavBar from '../components/NavBar'
import Search from '../components/Search'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CreateAd.css'
import Container from 'react-bootstrap/Container'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import InputGroup from 'react-bootstrap/InputGroup';

import { useParams } from 'react-router-dom';
import axios from 'axios';

function ModifyAd() {
    const { id } = useParams()
  /* const uid = localStorage.getItem('userId'); */
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    userId: "",
    plantName: "",
    condition: "",
    price: "",
    comment: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/' + id )
        .then(res => {
            console.log(res.data.product)
            setForm(res.data.product)
            
        })
        .catch(error => console.log(error))
}, [id]);
  
  
  
   // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (form.price === null) {
      updateForm({ price: "0" });
    }
    await axios.put('http://localhost:5000/api/products/' + id, form)
        .then(res => {
            console.log(res.data)
            console.log('Mise à jour réussie !');
            setMessage(res.data.message);
        })
        .catch(error => {
          window.alert(error);
          return;
        });
   
        navigate("/");
}

  return (
    <div>
      <NavBar />
      <Search />
      <Container className="createAd-wrapper">
        <h1>Modifier une annonce</h1>
      
       <Form onSubmit={onSubmit}>

          {/* Champ nom de la plante */}
          <Form.Group controlId="plantName">
            <Form.Label>Nom de la plante</Form.Label>
            <Form.Control
              className='createAd-input' 
              type="text"
              placeholder="Nom de la plante"
              value={form.plantName}
              onChange={(e) => updateForm({ plantName: e.target.value })}
            />
          </Form.Group>

          {/* Select condition */}
          <Form.Group>
            <div className="form-check form-check-inline">
              <Form.Check
                inline
                label="Je vends"
                type="radio"
                name="conditionOptions"
                id="vendre"
                value="Je vends"
                checked={form.condition === "Je vends"}
                onChange={(e) => updateForm({ condition: e.target.value })}
              />
            </div>
            <div className="form-check form-check-inline">
              <Form.Check
                inline
                label="Je donne"
                type="radio"
                name="conditionOptions"
                id="donner"
                value="Je donne"
                checked={form.condition === "Je donne"}
                onChange={(e) => {
                  updateForm({ condition: e.target.value });
                  updateForm({ price: "0" });
                }}

              />
            </div>
            <div className="form-check form-check-inline">
              <Form.Check
                inline
                label="Je troque"
                type="radio"
                name="conditionOptions"
                id="troquer"
                value="Je troque"
                checked={form.condition === "Je troque"}
                onChange={(e) => {
                  updateForm({ condition: e.target.value });
                  updateForm({ price: "0" });
                }}
              />
            </div>
          </Form.Group>        

          {/* <Form.Select aria-label="Default select example" style={{ marginTop: "20px" }}>
            <option>Je vends / Je donne / Je troque ?</option>
            <option value="Je vends">Je vends</option>
            <option value="Je donne">Je donne</option>
            <option value="Je troque">Je troque</option>
          </Form.Select> */}

          {/* Price */}
          <InputGroup className="price">
            <Form.Label className='text-price'>Prix :</Form.Label>
            <Form.Control
              className='createAd-input'
              aria-label="Amount (to the nearest euro)"
              type="text"
              value={form.price}
              onChange={(e) => updateForm({ price: e.target.value })}
              disabled={form.condition !== "Je vends"} 
            />
            <InputGroup.Text>€</InputGroup.Text>
          </InputGroup>

          {/* Comments */}
          <Form.Group controlId="comments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.comment}
              onChange={(e) => updateForm({ comment: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Lien de l'image</Form.Label>
            <Form.Control
              className='createAd-input' 
              type="text"
              placeholder="Ajouter le lien d'une image"
              value={form.imageUrl}
              onChange={(e) => updateForm({ imageUrl: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="submit">
            <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
              Modifier
            </Button>
          </Form.Group>
        </Form>
      </Container>
      {message && <p>{message}</p>}
      
      
    </div>
  );
}

export default ModifyAd;