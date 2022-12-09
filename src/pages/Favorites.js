import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { db } from "../database/firebase-config"
import { forceWebSockets } from "firebase/database"
import DeleteFavorite from "../components/DeleteFavorite"
import AddFavorite from "../components/AddFavorite"

const Favorites = (props) => {
    const [plants, setPlants] = useState([])
    const [userFavorites, setUserFavorites] = useState([])
    const [userFavoritesData, setUserFavoritesData] = useState([])

    const plantCollection = collection(db, "plants")
    const {userId} = props
    const userFavoritesCollection = collection(db, "worms", userId, "favorites")

    
    async function getFavorites() {
        const data = await getDocs(userFavoritesCollection)
        await setUserFavorites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        async function getPlants() {
            const data = await getDocs(plantCollection)
            await setPlants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getPlants()
        getFavorites()

    }, [])

    let favoritePlantData = []
    let userFavorites2 = []
    userFavorites.forEach(plant => userFavorites2.push(plant.plantId))
    console.log(userFavorites2)
    console.log("this is userfav", userFavorites)

    const matchFavorites = () => {
        let userFavorites2 = []
        userFavorites.forEach(plant => userFavorites2.push(plant.plantId))
        favoritePlantData = plants.filter(x => userFavorites2.includes(x.id))
    }
    matchFavorites()

    const removeFavorite = (thisPlantsId) => {
        let toBeDeletedData = userFavorites.filter(x => (x.plantId === thisPlantsId))
        console.log(userFavorites)
        DeleteFavorite(toBeDeletedData, userId)
        let toBeNewFavorites = userFavorites.filter(x => (x.plantId !== thisPlantsId))
        setUserFavorites(toBeNewFavorites)
    }

    return (
        <div className="favorites-container">
          <h2 className="plant-suggestions-header">FAVORITES</h2>
          {(favoritePlantData.length > 0) ?
          
          (favoritePlantData.map((curPlant) => (
              <div className="plant-list-favorites" key={curPlant.id}>
                <div>
                  <h3>
                    Name: {curPlant.name},
                  </h3>
                  <h3 className="italics">({curPlant.species})</h3>
                </div>
                <div>
                  <img src="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg" className="favoritePlant" />
                </div>
                <div>
                {userFavorites2.includes(curPlant.id) ? 
                      (<div onClick={()=>{removeFavorite(curPlant.id);}}><i className="fa fa-heart" aria-hidden="true"></i></div>
                      ) : (<div onClick={()=>{
                        AddFavorite(curPlant.id, userId)
                        getFavorites()
                        }}><i className="fa fa-heart-o" aria-hidden="true"></i></div>
                      )}
                </div>
              </div>))) :
              (
                <div>You do have have favorites yet.</div>
              )
            
          }
        </div>
      )
}

export default Favorites