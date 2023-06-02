import { useForm } from 'react-hook-form';
import Banner from '../components/Banner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Create() {
  const { register, handleSubmit, setValue } = useForm();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    // When a post request is sent to the create url, we'll add a new record to the database.
    await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setValue('userId', '');
    setValue('plantName', '');
    setValue('condition', '');
    setValue('price', '');
    setValue('comment', '');
    setValue('imageUrl', '');

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Banner />
      <Container style={{ border: 'solid #16AF78 1px' }}>
        <h1>Déposer une annonce</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* userID */}
          <Form.Group controlId="userId">
            <Form.Label>userId</Form.Label>
            <Form.Control
              type="text"
              placeholder="userId"
              {...register('userId')}
            />
          </Form.Group>

          {/* Champ nom de la plante */}
          <Form.Group controlId="plantName">
            <Form.Label>Nom de la plante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de la plante"
              {...register('plantName')}
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
                {...register('condition')}
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
                {...register('condition')}
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
                {...register('condition')}
              />
            </div>
          </Form.Group>

          {/* Price */}
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              {...register('price')}
              aria-describedby="price-addon"
            />
            <Form.Text id="price-addon">€</Form.Text>
          </Form.Group>

          {/* Comments */}
          <Form.Group controlId="comment">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('comment')}
            />
          </Form.Group>
          <Form.Group controlId="submit">
            <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
              Créer
            </Button>
          </Form.Group>
        </Form>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your ad has been created successfully.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Create;