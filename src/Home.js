import React from 'react'
import './style.css';
import img from './logo3.png';
import { Link, useNavigate } from 'react-router-dom';


const USER_ID = 'clarifai';
const APP_ID = 'main';
const PAT = '5aecdb6bcae74d4e84aae2e974508af1';
const MODEL_ID = 'food-item-recognition';
const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';



function Home() {
    const [fileLabel, setFileLabel] = useState('Choose a file');
    const [nutritionInfo, setNutritionInfo] = useState('');
    const [error, setError] = useState('');

    const handleFileInputChange = (event) => {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
            setFileLabel(fileInput.files[0].name);
        } else {
            setFileLabel('Choose a file');
        }
    };

    const submitImageAndIdentifyFood = () => {
        const testInput = document.getElementById("testInput");
        const outputDiv = document.getElementById("output");
        const uploadedImage = document.getElementById("uploaded-image");

        if (testInput.files.length > 0) {
            const file = testInput.files[0];
            const reader = new FileReader();

            reader.onload = function () {
                const base64Data = reader.result.split(',')[1];

                uploadedImage.src = reader.result;

                const raw = JSON.stringify({
                    "user_app_id": {
                        "user_id": USER_ID,
                        "app_id": APP_ID
                    },
                    "inputs": [
                        {
                            "data": {
                                "image": {
                                    "base64": base64Data
                                }
                            }
                        }
                    ]
                });

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Key ' + PAT
                    },
                    body: raw
                };

                fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        const concepts = result.outputs[0].data.concepts;
                        // To display the nutrition information
                        displayNutritionInfo(concepts);

                        // Stop the scan effect on the uploaded image
                        uploadedImage.style.animation = 'none';
                        uploadedImage.style.filter = 'none';
                    })
                    .catch(error => {
                        console.log('error', error);
                        setError('Error: ' + error.message);
                    });
            };

            reader.readAsDataURL(file);
        } else {
            setError('Please select an image file.');
        }
    };

    const displayNutritionInfo = (concepts) => {
        const nutritionData = calculateNutrition(concepts);
        const totalNutrition = getTotalNutrition(nutritionData);

        const items = [];
        for (const [key, value] of Object.entries(nutritionData)) {
            const colorCategory = getColorCategory(value, 20, 10); 
            const percentageValue = (value / totalNutrition) * 100;
            const roundedPercentage = percentageValue.toFixed(2);
            items.push(
                <div key={key} className={`nutrition-item ${colorCategory}`}>
                    <div>{roundedPercentage}%</div>
                    <div>{key}</div>
                </div>
            );
        }

        const isHealthy = isNutritionHealthy(nutritionData);
        setNutritionInfo(
            <div>
                {items}
                <div>Overall Health: {isHealthy ? 'Healthy' : 'Not Healthy'}</div>
            </div>
        );
    };

    const getTotalNutrition = (nutritionData) => {
        return Object.values(nutritionData).reduce((total, value) => total + value, 0);
    };

    const isNutritionHealthy = (nutrition) => {
        const healthyThresholds = {
            calories: 50,
            protein: 10,
            fat: 5,
            carbs: 20
        };

        for (const [key, value] of Object.entries(nutrition)) {
            if (value < healthyThresholds[key]) {
                return false;
            }
        }

        return true;
    };

    const getColorCategory = (value, highThreshold, lowThreshold) => {
        if (value > highThreshold) {
            return 'high';
        } else if (value < lowThreshold) {
            return 'low';
        } else {
            return 'moderate';
        }
    };

    const calculateNutrition = (concepts) => {
        const nutritionMapping = {
           
        'apple': { calories: 52, protein: 0.26, fat: 0.17, carbs: 14 },
        'banana': { calories: 105, protein: 1.3, fat: 0.3, carbs: 27 },
        'broccoli': { calories: 55, protein: 3.7, fat: 0.6, carbs: 11.2 },
        'carrot': { calories: 41, protein: 0.9, fat: 0.2, carbs: 10 },
        'fish': { calories: 206, protein: 22, fat: 13, carbs: 0 },
        'salmon': { calories: 206, protein: 22, fat: 13, carbs: 0 },
        'lemon': { calories: 17, protein: 0.6, fat: 0.2, carbs: 5.4 },
        'potato': { calories: 130, protein: 2, fat: 0.2, carbs: 30 },
        'chips': { calories: 152, protein: 2, fat: 10, carbs: 15 },
        'ginger': { calories: 80, protein: 2, fat: 1, carbs: 18 },
        'chocolate': { calories: 208, protein: 1.9, fat: 13.3, carbs: 24.2 },
        'cheese': { calories: 113, protein: 7, fat: 9, carbs: 0.4 },
        'pastry': { calories: 306, protein: 4.2, fat: 19, carbs: 31 },
        'salad': { calories: 5, protein: 0.5, fat: 0.1, carbs: 1.1 },
        'candy': { calories: 150, protein: 1, fat: 3, carbs: 30 },
        'flour': { calories: 364, protein: 10.3, fat: 1.1, carbs: 73 },
        'egg': { calories: 68, protein: 5.5, fat: 4.8, carbs: 0.6 },
        'tomato': { calories: 22, protein: 1, fat: 0.2, carbs: 5.5 },
        'garlic': { calories: 4, protein: 0.2, fat: 0, carbs: 1 },
        'onion': { calories: 40, protein: 1.1, fat: 0.1, carbs: 10 },
        'pork': { calories: 250, protein: 26, fat: 17, carbs: 0 },
        'beef': { calories: 250, protein: 26, fat: 17, carbs: 0 },
        'chicken': { calories: 165, protein: 31, fat: 3.6, carbs: 0 },
        'salt': { calories: 0, protein: 0, fat: 0, carbs: 0 },
        'sugar': { calories: 49, protein: 0, fat: 0, carbs: 12.6 },
        'vinegar': { calories: 3, protein: 0, fat: 0, carbs: 0.1 },
        'soy sauce': { calories: 8, protein: 1, fat: 0, carbs: 1 },
        'chilies': { calories: 18, protein: 1, fat: 1, carbs: 4 },
        'pepper corn': { calories: 7, protein: 0, fat: 0, carbs: 2 },
        'coconut milk': { calories: 552, protein: 5.5, fat: 57, carbs: 6 },
        'curry powder': { calories: 20, protein: 1, fat: 1, carbs: 4 },
        'cumin': { calories: 8, protein: 0.5, fat: 0.4, carbs: 1.4 },
        'chayote': { calories: 16, protein: 0.6, fat: 0.2, carbs: 3 },
        'fish sauce': { calories: 1, protein: 0, fat: 0, carbs: 0 },
        'olive oil': { calories: 119, protein: 0, fat: 13.5, carbs: 0 },
        'lemongrass': { calories: 99, protein: 1.8, fat: 0.5, carbs: 25 },
        'chilli leaf': { calories: 6, protein: 1, fat: 0, carbs: 1 },
        'bangus': { calories: 132, protein: 24, fat: 4, carbs: 0 },
        'okra': { calories: 33, protein: 2, fat: 0.2, carbs: 7 },
        'lemon juice': { calories: 4, protein: 0, fat: 0, carbs: 1 },
        'butter': { calories: 102, protein: 0.1, fat: 11.5, carbs: 0 },
        'spinach': { calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6 },
        'penne': { calories: 200, protein: 7, fat: 1, carbs: 42 },
        'linguine': { calories: 200, protein: 7, fat: 1, carbs: 42 },
        'shrimp': { calories: 84, protein: 18, fat: 1, carbs: 0 },
        'parsley': { calories: 1, protein: 0.1, fat: 0, carbs: 0.2 },
        };

        const totalNutrition = concepts.reduce((total, concept) => {
            const itemName = concept.name.toLowerCase();
            const itemNutrition = nutritionMapping[itemName];

            if (itemNutrition) {
                total.calories += itemNutrition.calories * concept.value;
                total.protein += itemNutrition.protein * concept.value;
                total.fat += itemNutrition.fat * concept.value;
                total.carbs += itemNutrition.carbs * concept.value;
            }

            return total;
        }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

        return totalNutrition;
    };

    return (
        <div className='container mt-3'>
            <form id="image-check-form" onSubmit={(e) => { e.preventDefault(); submitImageAndIdentifyFood(); }}>
            <h2 class="text-center mt-1 head-text">NutriAI Scan</h2>
            <img id="uploaded-image" src={img} alt="Uploaded" />
            <div className='form-context'>
                <input className='custom-file-input' type="file" id="testInput" onChange={handleFileInputChange} />
                <label className='custom-file-label' htmlFor="testInput">{fileLabel}</label>
                <button className='btn ai-btn' type="submit">Submit</button>
            </div>
                
            </form>
            <div id="output">{error ? error : nutritionInfo}</div>
        </div>
    );
}

export default Home
