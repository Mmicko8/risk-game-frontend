import Board from "./Board";

export default function Game() {
    const selectCountry = (e: any, country: string) => {
        console.log(e, country);
    }
    return (
        <div>
            <Board selectCountry={selectCountry}/>
        </div>
    );
}