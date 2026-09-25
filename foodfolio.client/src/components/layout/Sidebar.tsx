import "./Sidebar.css"
import Logo from "../../assets/Logo.png";
import NavigationButton from "../Buttons/NavigationButton";
import IconMeal from "../../assets/icons/icon_meal.svg";
import IconWeek from "../../assets/icons/icon_calendar_month.svg";
import IconRecipe from "../../assets/icons/icon_meal.svg";
import IconGrocery from "../../assets/icons/icon_grocery.svg";
import IconShoppingCard from "../../assets/icons/icon_shopping_card.svg"
import IconProfile from "../../assets/icons/icon_profile.svg"
import IconSettings from "../../assets/icons/icon_settings.svg"

function Sidebar() {
  return (
    <aside id="sidebar">
      <img id="app-logo" alt="foodfolio-logo" src={Logo}/>
      <hr/>

      <div className="navigation">
        <div>
          <nav>
            <ul className="navigation-list">
              <li><NavigationButton title="Tagesplan" iconSrc={IconMeal}/></li>
              <li><NavigationButton title="Wochenplan" iconSrc={IconWeek}/></li>
              <li><NavigationButton title="Rezepte" iconSrc={IconRecipe}/></li>
              <li><NavigationButton title="Lebensmittel" iconSrc={IconGrocery}/></li>
              <li><NavigationButton title="Einkaufsliste" iconSrc={IconShoppingCard}/></li>
            </ul>
          </nav>
        </div>

        <div>
          <nav>
            <ul className="navigation-list">
              <li><NavigationButton title="Profil" iconSrc={IconProfile}/></li>
              <li><NavigationButton title="Einstellungen" iconSrc={IconSettings}/></li>
            </ul>
          </nav>
        </div>
      </div>
        
      
      
    </aside>

    
  );
}

export default Sidebar;