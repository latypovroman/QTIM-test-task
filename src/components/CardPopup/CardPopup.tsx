import React from 'react';
import styles from './CardPopup.module.css'
import closeIcon from '../../assets/close-icon.svg'
import { useAppDispatch } from "../../store/store";
import { closePopup, fetchCardById, selectFullCardSlice } from "../../store/fullCardSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CardPopup:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isOpened, status } = useSelector(selectFullCardSlice);
    const rootStyles = [styles.inner];

    React.useEffect(() => {
        if (id) {
            dispatch(fetchCardById(id))
        }
    }, [id])

    if (isOpened) {
        rootStyles.push(styles.active);
    }

    const onCloseClick = () => {
        dispatch(closePopup());
        navigate(`/`);
    }

    return (
        <div className={rootStyles.join(" ")} onClick={onCloseClick}>
            { status === "loading" && <h2>Пожалуйста, подождите...</h2> }
            <div className={styles.popup} onClick={(evt) => evt.stopPropagation()}>
                <button onClick={onCloseClick} className={styles.close}>
                    <img src={closeIcon} alt="Закрыть окно" />
                </button>
                <img src={data.image} alt="Картинка" />
                <h3 className={styles.title}>{data.title}</h3>
                <span className={styles.price}>{data.description}</span>
            </div>
        </div>
    );
};

export default CardPopup;