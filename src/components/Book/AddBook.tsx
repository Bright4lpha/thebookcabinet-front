import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { AddBookProps } from '../../types/types';

const AddBook: React.FC<AddBookProps> = (props) => {

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [pages, setPages] = useState<number | ''>('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Ajouter un livre
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un livre</Modal.Title>
                    <button
                        type="button"
                        aria-label="Fermer"
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: '8px',
                            right: '16px',
                            zIndex: 1051,
                            background: 'transparent',
                            border: 'none',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: '#333'
                        }}
                    >
                        &times;
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => {
                        e.preventDefault();

                        if (!title || !author) {
                            alert("Veuillez remplir les champs obligatoires.");
                            return;
                        }
                        props.newBook(
                            title,
                            author.split(',').map(a => a.trim()),
                            genre.split(',').map(g => g.trim()),
                            isbn,
                            publisher,
                            publishedDate,
                            pages === '' ? 0 : pages,
                            language,
                            description,
                            imageURL);
                        setTitle('');
                        setAuthor('');
                        setGenre('');
                        setIsbn('');
                        setPublisher('');
                        setPublishedDate('');
                        setPages('');
                        setLanguage('');
                        setDescription('');
                        setImageURL('');
                        handleClose();
                    }} id="editmodal"
                        className="p-4">

                        {/* <Form> */}
                        <Form.Text className="text-muted">
                            Les champs marqués d'un * sont obligatoires.
                        </Form.Text>
                        <Form.Group className="mb-3" controlId="formBookTitle">
                            <Form.Label>Titre *</Form.Label>
                            <Form.Control required type="text" placeholder="Entrez le titre du livre" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookAuthor">
                            <Form.Label>Auteur *</Form.Label>
                            <Form.Control required type="text" placeholder="Entrez le nom de l'auteur" value={author} onChange={(e) => setAuthor(e.target.value)} />
                            <Form.Text className="text-muted">
                                Vous pouvez entrer plusieurs auteurs séparés par des virgules.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" placeholder="Entrez le genre du livre" onChange={(e) => setGenre(e.target.value)} />
                            <Form.Text className="text-muted">
                                Vous pouvez entrer plusieurs genres séparés par des virgules.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookISBN">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" placeholder="Entrez l'ISBN du livre" onChange={(e) => setIsbn(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookPublisher">
                            <Form.Label>Éditeur</Form.Label>
                            <Form.Control type="text" placeholder="Entrez le nom de l'éditeur" onChange={(e) => setPublisher(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookPublishedDate">
                            <Form.Label>Date de publication</Form.Label>
                            <Form.Control type="date" onChange={(e) => setPublishedDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookPages">
                            <Form.Label>Nombre de pages</Form.Label>
                            <Form.Control type="number" placeholder="Entrez le nombre de pages" onChange={(e) => setPages(parseInt(e.target.value))} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookLanguage">
                            <Form.Label>Langue</Form.Label>
                            <Form.Control type="text" placeholder="Entrez la langue du livre" onChange={(e) => setLanguage(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Entrez une description du livre" onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookImageURL">
                            <Form.Label>URL de l'image</Form.Label>
                            <Form.Control type="text" placeholder="Entrez l'URL de l'image du livre" onChange={(e) => setImageURL(e.target.value)} />
                        </Form.Group>
                        {/* </Form> */}

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" type="submit" form="editmodal">
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddBook;