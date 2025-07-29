import '../css/DisplayComponent.css'

export default function DisplayComponent({currentCalculation, handleDelete, previousCalculation}) {
    
    return (
        <div className="display-component">
            <div className="previous-calculation">
                <h4>{previousCalculation}</h4>
            </div>
            <div className="current-calculation">
                <h3>{currentCalculation}</h3>
            </div>

            <div className='delete-btn' role='button' aria-label='backspace'>
                <button onClick={handleDelete}>{'<='}</button>
            </div>
        </div>
    )
}