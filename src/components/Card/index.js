import React from 'react';
import { Container } from './card.styles'

const Card = (image) => {
    return (
        <Container>
            <img className={Card.image} src={image} alt="placeholder"></img>
        </Container>
    )
}

export default Card;