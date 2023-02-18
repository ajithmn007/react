import MealsSummary from "./MealsSummary"
import AvailableMeals from './AvailableMeals'
const Meals = props => {

    const AddMealHandler = (props) => {
        
    }
    return(
        <>
        <MealsSummary/>
        <AvailableMeals onAddMeal={AddMealHandler} reset={props.reset}/>
        </>
    )
}

export default Meals;