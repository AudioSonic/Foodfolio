import "./NavigationButton.css"

type NavigationButton = {
    title: string,
    iconSrc: string,
    onClick: () => void,
    active: boolean
}

function NavigationButton(prop: NavigationButton){

    return(
        <button type="button" className={`btn navigation-button ${prop.active ? "active" : ""}`} onClick={prop.onClick}>
            <img src={prop.iconSrc}/>
            <span>{prop.title}</span>
        </button>
    )
}

export default NavigationButton