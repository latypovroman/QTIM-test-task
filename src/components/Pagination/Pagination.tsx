import React from 'react';
import styles from './Pagination.module.css';
import { useSelector } from "react-redux";
import { selectCardsSlice } from "../../store/cardsSlice";
import { useAppDispatch } from "../../store/store";
import { changeLimit } from "../../store/cardsSlice";

interface PaginationProps {
    activePage: number;
    setActivePage: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ activePage , setActivePage}) => {
    const { cards, status, limit } = useSelector(selectCardsSlice);
    const [paginationArray, setPaginationArray] = React.useState<number[]>([]);
    const [pagesCount, setPagesCount] = React.useState(0);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setPagesCount(Math.ceil(cards.length / limit))
        const result = new Array(pagesCount);

        let counter = 1;
        while (counter <= pagesCount) {
            result.push(counter);
            counter++;
        }
        setPaginationArray(result);
    }, [cards, limit, pagesCount])

    const itemStyle = (p: number): string => {
        const style: string[] = [styles.item];
        if (p === activePage) {
            style.push(styles.active)
        }
        return style.join(" ");
    };

    return (
        <div className={styles.root}>
            <ul className={styles.list}>
                {
                    status === "success"
                    && paginationArray.map((p) => <li
                        key={p}
                        className={itemStyle(p)}
                        onClick={() => setActivePage(p)}
                    >{p}</li>)
                }
            </ul>
            <select
                className={styles.select}
                value={limit}
                onChange={(evt) => dispatch(changeLimit(evt.target.value))}>
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="15">15</option>
            </select>
        </div>
    );
};

export default Pagination;