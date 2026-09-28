import "./CaloricOverview.css"

function CaloricOverview(){
    return(
        <div className="nutrition-card">
            <div className="card-header">
                <h2>Tagesübersicht</h2>
                <a href="#">Ziele bearbeiten</a>
            </div>

            <div className="card-content">

                <div className="calorie-section">
                    <div className="calorie-chart">
                        <div className="calorie-center">
                            <strong>1.566</strong>
                            <span>/ 1.850 kcal</span>
                        </div>
                    </div>
                </div>

                <div className="nutrition-section">

                    <div className="remaining">
                        <span>Verbleibend</span>
                        <strong>284 <small>kcal</small></strong>
                    </div>

                    <div className="nutrition-row">
                        <div className="nutrition-label">
                            <span>Protein</span>
                            <span>108 / 130 g</span>
                        </div>

                        <div className="progress-bar">
                            <div className="progress protein"></div>
                        </div>
                    </div>

                    <div className="nutrition-row">
                        <div className="nutrition-label">
                            <span>Kohlenhydrate</span>
                            <span>188 / 220 g</span>
                        </div>

                        <div className="progress-bar">
                            <div className="progress carbs"></div>
                        </div>
                    </div>

                    <div className="nutrition-row">
                        <div className="nutrition-label">
                            <span>Fett</span>
                            <span>54 / 70 g</span>
                        </div>

                        <div className="progress-bar">
                            <div className="progress fat"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CaloricOverview