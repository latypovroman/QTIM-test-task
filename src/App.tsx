import { useAppDispatch } from "./store/store";
import { fetchCards } from "./store/cardsSlice";
import React from "react";
import CardList from "./components/CardList/CardList";
import { Route, Routes } from "react-router-dom";
import CardPopup from "./components/CardPopup/CardPopup";

function App() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchCards());
    }, [])

   return (
     <div>
         <Routes>
             <Route path="/" element={<CardList />}>
                <Route path=":id" element={<CardPopup />}/>
             </Route>
             <Route path="/" element={<CardList />} />
         </Routes>
     </div>
   )
}

export default App
