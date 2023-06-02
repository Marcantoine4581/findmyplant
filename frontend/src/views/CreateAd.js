import Banner from '../components/Banner'
import Search from '../components/Search'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import { useState } from "react";
import { useNavigate } from "react-router";
import InputGroup from 'react-bootstrap/InputGroup';


function CreateAd() {
  const [form, setForm] = useState({
    userId: "",
    plantName: "",
    condition: "",
    price: "",
    comment: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
  
   // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

   // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

     // When a post request is sent to the create url, we'll add a new record to the database.
     const newProduct = { ...form };
 
     await fetch("http://localhost:5000/api/products", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newProduct),
     })
     .catch(error => {
       window.alert(error);
       return;
     });
   
     setForm({ userId: "", plantName: "", condition: "", price: "", comment: "", imageUrl: "" });
     navigate("/");
   }

  return (
    <div>
      <Banner />
      <Search />
      <Container style={{ border: "solid #16AF78 1px" }}>
        <h1>Déposer une annonce</h1>
        
        <Form onSubmit={onSubmit}>
          {/* userID */}
          <Form.Group controlId="userId">
            <Form.Label>userId</Form.Label>
            <Form.Control 
              type="text"
              placeholder="userId"
              value={form.userId}
              onChange={(e) => updateForm({ userId: e.target.value })}
            />
          </Form.Group>

          {/* Champ nom de la plante */}
          <Form.Group controlId="plantName">
            <Form.Label>Nom de la plante</Form.Label>
            <Form.Control 
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
                onChange={(e) => updateForm({ condition: e.target.value })}
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
                onChange={(e) => updateForm({ condition: e.target.value })}
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
            <Form.Control
              aria-label="Amount (to the nearest euro)"
              type="text"
              value={form.price}
              onChange={(e) => updateForm({ price: e.target.value })}
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
          <Form.Group controlId="submit">
            <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
              Créer
            </Button>
          </Form.Group>
        </Form>
      </Container>
      
      
    </div>
  );
}

export default CreateAd;
