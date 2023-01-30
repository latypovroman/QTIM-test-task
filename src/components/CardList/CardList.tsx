import React from 'react';
import styles from './CardList.module.css';
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { selectCardsSlice } from "../../store/cardsSlice";
import CardPopup from "../CardPopup/CardPopup";
import Pagination from '../Pagination/Pagination';

const CardList = () => {
    const { cards, status, limit } = useSelector(selectCardsSlice);
    const [activePage, setActivePage] = React.useState(1);

    const shownCards = React.useMemo(() => {
        return cards.slice((activePage - 1) * limit, limit * activePage);
    }, [cards, limit, activePage]);

    return (
        <>
            <div className={styles.root}>
                { status === "loading" && <h2>Загрузка блога...</h2>}
                { status === "error" && <h2>Ошибка при загрузке блога =(</h2>}
                {shownCards.map(card => {
                    return <Card
                        { ...card }
                        key={card.id}
                    />
                })}
                {}
                <CardPopup />
            </div>
            <Pagination activePage={activePage} setActivePage={setActivePage} />
        </>
    );
};

export default CardList;