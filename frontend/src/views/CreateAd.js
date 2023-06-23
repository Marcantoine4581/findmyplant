import NavBar from '../components/NavBar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CreateAd.css'
import Container from 'react-bootstrap/Container'
import { useState } from "react";
import { useNavigate } from "react-router";
import InputGroup from 'react-bootstrap/InputGroup';
import SearchPlant from '../components/SearchPlant';


function CreateAd() {
  const uid = localStorage.getItem('userId');
  const [form, setForm] = useState({
    userId: uid,
    plantName: "",
    condition: "",
    price: "",
    comment: "",
    image: null
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    /* const formData = new FormData(); */
    updateForm({ image: file });
  };


  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    /* const newProduct = { ...form }; */

    const formData = new FormData();
    formData.append("userId", form.userId);
    formData.append("plantName", form.plantName);
    formData.append("condition", form.condition);
    formData.append("price", form.price);
    formData.append("comment", form.comment);
    formData.append("image", form.image);

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData
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
      <NavBar />
      <Container className="createAd-wrapper">
        <div className='createdAd-title'>
          <h1>Déposer une annonce</h1>
        </div>
      
       <Form onSubmit={onSubmit}>
          <SearchPlant 
            searchTerm={form.plantName}
            handleSearch={updateForm}
          />
          {/*  <Form.Group controlId="userId">
            <Form.Label>userId</Form.Label>
            <Form.Control 
              type="text"
              placeholder="userId"
              value={form.userId}
              onChange={(e) => updateForm({ userId: e.target.value })}
            />
          </Form.Group> */}

          {/* Champ nom de la plante */}
          {/* <Form.Group controlId="plantName" className="createAd-group">
            <Form.Label>Nom de la plante</Form.Label>
            <Form.Control
              className='createAd-input' 
              type="text"
              placeholder="Nom de la plante"
              value={form.plantName}
              onChange={(e) => updateForm({ plantName: e.target.value })}
            />
          </Form.Group> */}

          {/* Select condition */}
          <Form.Group className="createAd-group">
            <Form.Label>Conditions: </Form.Label>
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
          <InputGroup className="createAd-group">
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
          <Form.Group controlId="comments" className="createAd-group">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.comment}
              onChange={(e) => updateForm({ comment: e.target.value })}
            />
          </Form.Group>

         {/*  <Form.Group controlId="image">
            <Form.Label>Lien de l'image</Form.Label>
            <Form.Control
              className='createAd-input' 
              type="text"
              placeholder="Ajouter le lien d'une image"
              value={form.imageUrl}
              onChange={(e) => updateForm({ imageUrl: e.target.value })}
            />
          </Form.Group> */}

          <Form.Group controlId="image" className="createAd-group">
            <Form.Label>Image</Form.Label>
            <Form.Control
              className="createAd-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Form.Group>

          <Form.Group controlId="submit" className="createAd-group">
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
