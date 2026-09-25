import "./NavigationButton.css"

type NavigationButton = {
    title: string,
    iconSrc: string
}

function NavigationButton(prop: NavigationButton){

    
    return(
        <button className="btn navigation-button">
            <img src={prop.iconSrc}/>
            <span>{prop.title}</span>
        </button>
    )
}

export default NavigationButton