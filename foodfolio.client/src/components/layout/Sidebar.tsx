import "./Sidebar.css"
import Logo from "../../assets/Logo.png";
import NavigationButton from "../Buttons/NavigationButton";
import IconMeal from "../../assets/icons/icon_calendar_meal.svg";
import IconWeek from "../../assets/icons/icon_calendar_month.svg";
import IconRecipe from "../../assets/icons/icon_meal.svg";
import IconGrocery from "../../assets/icons/icon_grocery.svg";
import IconShoppingCard from "../../assets/icons/icon_shopping_card.svg"
import IconProfile from "../../assets/icons/icon_profile.svg"
import IconSettings from "../../assets/icons/icon_settings.svg"

export type Page =
  | "dashboard"
  | "weekPlan"
  | "recipes"
  | "foods"
  | "shoppingList"
  | "profile"
  | "settings";

type SidebarProps = {
  onNavigate: (page: Page) => void;
  currentPage: Page;
};

function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  return (
    <aside id="sidebar">
      <img id="app-logo" alt="foodfolio-logo" src={Logo}/>
      <hr/>

      <div className="navigation">
        <div>
          <nav>
            <ul className="navigation-list">
              <li>
                <NavigationButton
                  title="Tagesplan"
                  iconSrc={IconMeal}
                  onClick={() => onNavigate("dashboard")}
                  active={currentPage === "dashboard"}
                />
              </li>
              <li>
                <NavigationButton
                  title="Wochenplan"
                  iconSrc={IconWeek}
                  onClick={() => onNavigate("weekPlan")}
                  active={currentPage === "weekPlan"}
                />
              </li>
              <li>
                <NavigationButton
                  title="Rezepte"
                  iconSrc={IconRecipe}
                  onClick={() => onNavigate("recipes")}
                  active={currentPage === "recipes"}
                />
              </li>
              <li>
                <NavigationButton
                  title="Lebensmittel"
                  iconSrc={IconGrocery}
                  onClick={() => onNavigate("foods")}
                  active={currentPage === "foods"}
                />
              </li>
              <li>
                <NavigationButton
                  title="Einkaufsliste"
                  iconSrc={IconShoppingCard}
                  onClick={() => onNavigate("shoppingList")}
                  active={currentPage === "shoppingList"}
                />
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <nav>
            <ul className="navigation-list">
              <li>
                <NavigationButton 
                title="Profil" 
                iconSrc={IconProfile}
                onClick={() => onNavigate("profile")}
                active={currentPage === "profile"}/>
              </li>
              <li>
                <NavigationButton 
                title="Einstellungen" 
                iconSrc={IconSettings}
                onClick={() => onNavigate("settings")}
                active={currentPage === "settings"}/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
        
      
      
    </aside>

    
  );
}

export default Sidebar;