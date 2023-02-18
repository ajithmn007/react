import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "../Meals/MealItem";


const MealsItem = (props) => {
  const [mealItem, setMealItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const httpResponse = async() => {
      try{
        const response =  await fetch ('https://t1l0fxwygd.execute-api.ap-south-1.amazonaws.com/prd/')
        if (!response){
          throw new Error('Something went wrong while accessing database')
        }
        const data = await response.json()
        const body = JSON.parse(data['body'])
        const item = body['Item']
        const mealItems = [];
        for (let key in item){
          let data = item[key];
          if ( data['name'] && data['description'] && data['price']){
            mealItems.push({
              id: key,
              name: data["name"],
              description: data["description"],
              price: +data["price"],
            })
          }
        }
        setMealItem(mealItems);
        }
      catch {
        setHttpError("Something went wrong while fetching meals data. Please try after some time")
      }
      setIsLoading(false);
    }
    
    httpResponse()
   //Fetching dynamo DB through SDK

   /*  AWS.config.update({ region: "ap-south-1" });
    const dynamoClient = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
    const params = {
      TableName: "mealItem",
      Key: {
        meals: { S: "meal" },
      },
    };
    // Call DynamoDB to read the items
    dynamoClient.getItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        setIsLoading(false);
        setHttpError("Something went wrong while accessing database");
      } else {
        const meals = { ...data.Item };
        const mealItems = [];
        for (let key in meals) {
          let data = meals[key];
          let value = data["M"];
          if (value) {
            mealItems.push({
              id: key,
              name: value["name"]["S"],
              description: value["description"]["S"],
              price: +value["price"]["S"],
            })
          }
        }
        setMealItem(mealItems);
        setIsLoading(false);
      }
    }); */
  }, []);

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.httpError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealList = mealItem.map((meal) => (
    <MealItem
      name={meal.name}
      description={meal.description}
      price={meal.price}
      key={meal.id}
      id={meal.id}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default MealsItem;
