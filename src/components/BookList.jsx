import { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';

class BookList extends Component {
  state = {
    searchValue: '',
    selectedAsin: null, // Stato per tenere traccia dell'ASIN del libro selezionato
  };

  handleBookSelect = (newAsin) => {
    this.setState({ selectedAsin: newAsin }); // Aggiorna l'ASIN selezionato
  };

  render() {
    return (
      <Container fluid>
        <Row className="my-5">
          <Col>
            <Form.Control
              type="text"
              placeholder="Cerca un libro"
              value={this.state.searchValue}
              onChange={(e) => {
                this.setState({
                  searchValue: e.target.value,
                });
              }}
            />
            <Row>
              {this.props.booksArray
                .filter((book) =>
                  book.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
                )
                .map((scifiBook) => (
                  <Col xs={12} md={6} key={scifiBook.asin}>
                    <SingleBook 
                      libro={scifiBook} 
                      handleBookSelect={this.handleBookSelect}
                      selectedAsin={this.state.selectedAsin}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <CommentArea asin={this.state.selectedAsin} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookList;