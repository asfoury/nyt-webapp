import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'


function App() {
  return (
    <Test />
  );
}

function Test() {
  const [articles, setArticles] = useState([]);
  const [section, setSection] = useState('science');
  const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
    const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=EwYB6m1Hl2r3Rdp13xHQpbZ4VSm256ue`);
    const data = await response.json();
    setArticles(data['results']);
    console.log(data['results'][0])
    setLoading(false);
  }

  useEffect(
    () => {
      loadData()
    }, [section]);
  // onClick={() => window.open(art['short_url'], "_blank")}
  return (
    <div class="container" >
      <ButtonGroup aria-label="Basic example" className="mb-4" size="lg">
        <Button variant="secondary" onClick={() => setSection('science')}>Science</Button>
        <Button variant="secondary" onClick={() => setSection('arts')}>Arts</Button>
        <Button variant="secondary" onClick={() => setSection('technology')}>Technology</Button>
        <Button variant="secondary" onClick={() => setSection('sports')}>Sports</Button>
        <Button variant="secondary" onClick={() => setSection('politics')}>Politics</Button>
        <Button variant="secondary" onClick={() => setSection('movies')}>Movies</Button>
        <Button variant="secondary" onClick={() => setSection('fashion')}>Fashion</Button>
        <Button variant="secondary" onClick={() => setSection('opinion')}>Opinion</Button>
        <Button variant="secondary" onClick={() => setSection('food')}>Food</Button>
        <Button variant="secondary" onClick={() => setSection('travel')}>Travel</Button>

      </ButtonGroup>
      {loading ? <Spinner animation="border" /> : <div></div>}
      <ol>
        {articles.map((art, index) => (
          <Card key={index} style={{ width: '50rem' }}>
            <Card.Img variant="top" src={art['multimedia'][0]['url']} />
            <Card.Body>
              <Card.Title>{art['title']}</Card.Title>
              <Card.Text>{art['abstract']}</Card.Text>
              <Button variant="primary" onClick={() => window.open(art['short_url'], "_blank")}>Go To Article</Button>
            </Card.Body>
          </Card>
        ))}
      </ol>
    </div>
  );
}

export default App;
