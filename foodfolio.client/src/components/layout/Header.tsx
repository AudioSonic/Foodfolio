import ActiveDateSelect from "../ActiveDateSelect";
import NewRecipeButton from "../Buttons/NewRecipeButton";

import "./Header.css"

function Header() {
  return (
    <header id="header">
      <div id="day-view">
        <h1>Tagesplan</h1>
        <ActiveDateSelect />
      </div>

      <div id="new-recipe-and-profile">
        <NewRecipeButton />
        <div id="profile">
          <span id="user-tag">AS</span>
          <span>Hallo Alex! ˅</span>
        </div>

      </div>
    </header>
  );
}

export default Header;