import React from 'react';
import styles from "./Card.module.css";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface CardProps {
    title: string;
    id: string;
    image: string;
}

const Card: React.FC<CardProps> = ({ title, id, image}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onRevealClick = () => {
        navigate(id);
    }

    return (
        <div className={styles.root}>
            <img onClick={onRevealClick} className={styles.image} src={image}/>
            <div>{ id }</div>
            <h2>{ title }</h2>
            <p className={styles.more} onClick={onRevealClick}> Подробнее... </p>
        </div>
    );
};

export default Card;