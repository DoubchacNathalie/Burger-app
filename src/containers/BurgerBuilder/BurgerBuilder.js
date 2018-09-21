import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGR_PRICES = {
    salad: 0.5,
    cheese: 1,
    bacon: 1.5,
    meat: 2

}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {..}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
           .map(igKey => { return ingredients[igKey];})
           .reduce((sum, el) => { return sum + el}, 0);
           this.setState({
               purchasable: sum > 0
           });

    }

    addIngrHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGR_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    deleteIngrHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGR_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients:updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }


    render(){
        const disabledInfo = {
            ...this.state.ingredients // salad, cheese, bacon, meat
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice.toFixed(2)}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngrHandler}
                ingredientDeleted={this.deleteIngrHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;