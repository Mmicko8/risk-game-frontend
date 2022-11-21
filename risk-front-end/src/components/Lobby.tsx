import Board from "./Board";
import {useTranslation} from "react-i18next";


export default function Lobby() {

    const {t} = useTranslation();


    return (
        <div>
            {t('welcome_message')}
        </div>
    );
}