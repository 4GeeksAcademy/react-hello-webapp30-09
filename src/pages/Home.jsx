import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [category, setCategory] = useState('people');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { 
      id: 'people', 
      name: 'CHARACTERS', 
      count: '---',
      endpoint: 'https://www.swapi.tech/api/people/'
    },
    { 
      id: 'planets', 
      name: 'LOCATIONS', 
      count: '---',
      endpoint: 'https://www.swapi.tech/api/planets/'
    },
    { 
      id: 'vehicles', 
      name: 'VEHICLES', 
      count: '---',
      endpoint: 'https://www.swapi.tech/api/vehicles/'
    },
    { 
      id: 'starships', 
      name: 'STARSHIPS', 
      count: '---',
      endpoint: 'https://www.swapi.tech/api/starships/'
    },
    { 
      id: 'species', 
      name: 'SPECIES', 
      count: '---',
      endpoint: 'https://www.swapi.tech/api/species/'
    },
    { 
      id: 'films', 
      name: 'FILMS', 
      count: '---',
      endpoint: 'https://www.swapi.tech/api/films/'
    }
  ];

  
  const getCurrentEndpoint = () => {
    const currentCategory = categories.find(cat => cat.id === category);
    return currentCategory ? currentCategory.endpoint : categories[0].endpoint;
  };

  
  const getCardImageUrl = (item, category) => {
    const itemId = item.uid;
    
    
    const cardImages = {
      people: {
        1: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=300&h=200&fit=crop',
        2: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=300&h=200&fit=crop',
        3: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
        4: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
        5: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop',
        6: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=200&fit=crop',
        10: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
      },
      planets: {
        1: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop',
        2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
        3: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=300&h=200&fit=crop',
        4: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
        5: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=300&h=200&fit=crop',
        8: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=200&fit=crop',
      },
      vehicles: {
        4: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=300&h=200&fit=crop',
        6: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
        7: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
        8: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop',
        14: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=300&h=200&fit=crop',
        16: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=200&fit=crop',
      },
      starships: {
        2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
        3: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
        5: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop',
        9: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=300&h=200&fit=crop',
        10: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=300&h=200&fit=crop',
        11: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=200&fit=crop',
      },
      species: {
        1: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
        2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
        3: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop',
        4: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=300&h=200&fit=crop',
      },
      films: {
        1: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=200&fit=crop',
        2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
        3: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', 
        4: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop', 
        5: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=300&h=200&fit=crop',
        6: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=300&h=200&fit=crop', 
      }
    };

   
    if (cardImages[category] && cardImages[category][itemId]) {
      return cardImages[category][itemId];
    }

    
    const genericCardImages = {
      people: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=300&h=200&fit=crop',
      planets: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop',
      vehicles: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=300&h=200&fit=crop',
      starships: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
      species: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
      films: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=200&fit=crop'
    };

    return genericCardImages[category] || genericCardImages.people;
  };

  
  const fetchData = async (currentCategory) => {
    setLoading(true);
    try {
      const categoryConfig = categories.find(cat => cat.id === currentCategory);
      const endpoint = categoryConfig ? categoryConfig.endpoint : categories[0].endpoint;
      
      console.log("Fetching from:", endpoint);
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Datos recibidos de", currentCategory, ":", data);
      
      
      let itemsData = [];
      if (currentCategory === 'films') {
      
        itemsData = data.result || [];
      } else {
  
        itemsData = data.results || [];
      }
      
      setItems(itemsData.slice(0, 12));
      
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      alert("No se pudieron cargar los datos. Verifica la consola para más detalles.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos cuando cambie la categoría
  useEffect(() => {
    fetchData(category);
  }, [category]);

  // Navegar a detalles - CORREGIDO PARA FILMS
  const goToDetails = (item) => {
    let id;
    
    if (category === 'films') {
      // Para films, el ID viene en item.uid directamente
      id = item.uid;
    } else {
      // Para otras categorías, extraer ID de la URL
      const urlParts = item.url.split('/');
      id = urlParts[urlParts.length - 2];
    }
    
    navigate(`/detail/${category}/${id}`);
  };

  // Función para obtener el nombre del item (corregido para films)
  const getItemName = (item) => {
    if (category === 'films') {
      return item.properties?.title || item.name || 'Unknown Film';
    }
    return item.name || 'Unknown';
  };

  // Función para obtener la descripción según categoría
  const getItemDescription = (item) => {
    const descriptions = {
      people: 'Character from Star Wars',
      planets: 'Planet in the Star Wars universe',
      vehicles: 'Vehicle from Star Wars',
      starships: 'Starship from Star Wars',
      species: 'Species from Star Wars',
      films: 'Star Wars film'
    };
    
    return descriptions[category] || 'Star Wars entity';
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      {/* Header */}
      <div className="row bg-black py-3 border-bottom border-secondary">
        <div className="col text-center">
          <h1 className="display-4 text-warning mb-0">STAR WARS DATABANK</h1>
          <p className="lead">Explore the Star Wars universe</p>
        </div>
      </div>

      <div className="container mt-4">
        {/* Categorías */}
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-warning mb-3">Browse Databank</h2>
            <div className="d-flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`btn ${category === cat.id ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Información del endpoint actual */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="card bg-secondary border-warning">
              <div className="card-body py-2">
                <small className="text-light">
                  <strong>Endpoint:</strong> <code className="text-warning">{getCurrentEndpoint()}</code>
                </small>
                {category === 'films' && (
                  <small className="text-warning d-block mt-1">
                    ⚠️ Films tiene una estructura de datos diferente
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grid de items */}
        <div className="row">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-warning">Loading {category}...</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.uid || item._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card bg-secondary border-warning h-100">
                  <img 
                    src={getCardImageUrl(item, category)} 
                    className="card-img-top"
                    alt={getItemName(item)}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      const genericImages = {
                        people: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=300&h=200&fit=crop',
                        planets: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=200&fit=crop',
                        vehicles: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=300&h=200&fit=crop',
                        starships: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop',
                        species: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
                        films: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=200&fit=crop'
                      };
                      e.target.src = genericImages[category] || genericImages.people;
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-warning">{getItemName(item)}</h5>
                    <p className="card-text text-light small">
                      {getItemDescription(item)}
                    </p>
                    <button 
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => goToDetails(item)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && items.length === 0 && (
          <div className="row">
            <div className="col-12 text-center py-5">
              <h4 className="text-warning">No data available</h4>
              <p className="text-light">Try selecting a different category.</p>
              {category === 'films' && (
                <p className="text-light small">
                  La API de films puede tener problemas de estructura de datos
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};