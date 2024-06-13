import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavScrollExample() {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.set('search', searchInput);
        navigate(`/Search_Moive?${searchParams.toString()}`);
    };

    return (
        <Navbar expand="lg" className="nav_Background navbar-dark">
            <Container>
                <Link className='text-light fs-3 text-decoration-none ' to="/" >MovieDb </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className='menu text-secondary' to="/">Popular</Link>
                        <Link className="menu text-secondary" to="/Top_Rated">Top Rated</Link>
                        <Link className="menu text-secondary" to="/Upcoming_Movie">Upcoming</Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearchInput(e.target.value)}
                            required                
                        />
                        <Button type="submit" variant="secondary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;