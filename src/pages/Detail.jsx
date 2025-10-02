// src/pages/Detail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Detail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  // Configuración de endpoints específicos por categoría
  const endpoints = {
    people: `https://www.swapi.tech/api/people/${id}/`,
    planets: `https://www.swapi.tech/api/planets/${id}/`,
    vehicles: `https://www.swapi.tech/api/vehicles/${id}/`,
    starships: `https://www.swapi.tech/api/starships/${id}/`,
    species: `https://www.swapi.tech/api/species/${id}/`,
    films: `https://www.swapi.tech/api/films/${id}/`
  };

  // Sistema de imágenes específicas por categoría e ID
  const getImageUrl = () => {
    if (imageError) {
      return getFallbackImage();
    }

    // Intentar con starwars-visualguide primero
    const categoryMap = {
      people: 'characters',
      planets: 'planets',
      vehicles: 'vehicles',
      starships: 'starships',
      species: 'species',
      films: 'films'
    };
    
    const mainImage = `https://starwars-visualguide.com/assets/img/${categoryMap[category] || 'characters'}/${id}.jpg`;
    
    return mainImage;
  };

  // Imágenes de respaldo específicas por categoría e ID
  const getFallbackImage = () => {
    // Imágenes específicas organizadas por categoría y ID
    const specificImages = {
      people: {
        1: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=400&h=300&fit=crop', // Luke Skywalker
        2: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=400&h=300&fit=crop', // C-3PO
        3: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', // R2-D2
        4: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop', // Darth Vader
        5: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', // Leia Organa
        13: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=300&fit=crop', // Chewbacca
        // Puedes agregar más IDs específicos aquí
      },
      planets: {
        1: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', // Tatooine - desierto
        2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop', // Alderaan - planeta azul
        3: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=400&h=300&fit=crop', // Yavin IV - jungla
        4: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', // Hoth - planeta helado
        5: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=400&h=300&fit=crop', // Dagobah - pantano
        8: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=300&fit=crop', // Naboo - planeta verde
      },
      vehicles: {
        4: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=400&h=300&fit=crop', // Sand Crawler
        6: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop', // T-16 skyhopper
        7: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', // X-34 landspeeder
        8: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', // TIE/LN starfighter
        14: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=400&h=300&fit=crop', // Snowspeeder
        16: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=300&fit=crop', // TIE bomber
      },
      starships: {
        2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop', // CR90 corvette
        3: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', // Star Destroyer
        5: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', // Sentinel-class landing craft
        9: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=400&h=300&fit=crop', // Death Star
        10: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=400&h=300&fit=crop', // Millennium Falcon
        11: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=300&fit=crop', // Y-wing
      },
      species: {
        1: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', // Human
        2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop', // Droid
        3: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', // Wookiee
        4: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=400&h=300&fit=crop', // Rodian
        5: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=400&h=300&fit=crop', // Hutt
      },
      films: {
        1: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=300&fit=crop', // A New Hope
        2: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop', // The Empire Strikes Back
        3: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', // Return of the Jedi
        4: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', // The Phantom Menace
        5: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=400&h=300&fit=crop', // Attack of the Clones
        6: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=400&h=300&fit=crop', // Revenge of the Sith
      }
    };

    // Si tenemos una imagen específica para este ID, usarla
    if (specificImages[category] && specificImages[category][id]) {
      return specificImages[category][id];
    }

    // Si no hay imagen específica, usar una genérica por categoría
    const genericImages = {
      people: 'https://images.unsplash.com/photo-1533616688419-b7a585564f70?w=400&h=300&fit=crop',
      planets: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop',
      vehicles: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=400&h=300&fit=crop',
      starships: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
      species: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      films: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=300&fit=crop'
    };

    return genericImages[category] || genericImages.people;
  };

  // Función para obtener descripción de la imagen
  const getImageDescription = () => {
    const descriptions = {
      people: "Character image",
      planets: "Planet landscape", 
      vehicles: "Vehicle illustration",
      starships: "Starship design",
      species: "Species representation",
      films: "Movie poster"
    };
    
    return descriptions[category] || "Star Wars image";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Fetch detalles del item
  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = endpoints[category];
        
        if (!endpoint) {
          throw new Error(`Categoría no válida: ${category}`);
        }

        console.log("Fetching details from:", endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Detalles recibidos:", data);
        
        if (data.result && data.result.properties) {
          setItem(data.result.properties);
        } else {
          throw new Error("Estructura de datos incorrecta");
        }
        
      } catch (error) {
        console.error("Error al cargar los detalles:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (category && id) {
      fetchItemDetails();
    }
  }, [category, id]);

  // ... (resto del código de renderDetails se mantiene igual)

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      {/* Header */}
      <div className="row bg-black py-3 border-bottom border-secondary">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-warning" onClick={() => navigate('/')}>
              ← Back to Databank
            </button>
            <h1 className="text-warning mb-0">STAR WARS DATABANK</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {/* Información del endpoint */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="card bg-secondary border-warning">
              <div className="card-body py-2">
                <small className="text-light">
                  <strong>Endpoint:</strong> <code className="text-warning">{endpoints[category]}</code>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Imagen con descripción */}
          <div className="col-md-4 mb-4">
            <div className="card bg-secondary border-warning">
              <img 
                src={getImageUrl()} 
                className="card-img-top"
                alt={item ? (item.name || item.title) : getImageDescription()}
                onError={handleImageError}
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <span className="badge bg-dark mb-2">
                  {category ? category.toUpperCase() : 'STAR WARS'}
                </span>
                {imageError && (
                  <p className="text-warning small mt-2">
                    🖼️ {getImageDescription()}
                  </p>
                )}
                {!imageError && (
                  <p className="text-light small mt-2">
                    {getImageDescription()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Detalles */}
          <div className="col-md-8">
            <div className="card bg-secondary border-warning">
              <div className="card-header bg-dark">
                <h2 className="card-title text-warning mb-0">
                  {item ? (item.name || item.title) : 'Loading...'}
                </h2>
              </div>
              <div className="card-body">
                {item ? (
                  <div className="row">
                    {Object.entries(item).map(([key, value]) => {
                      if (key === 'name' || key === 'title' || key === 'url' || key === 'created' || key === 'edited') {
                        return null; // Estos ya se muestran en el header
                      }
                      
                      if (Array.isArray(value) && value.length > 0) {
                        return (
                          <div key={key} className="col-12 mb-3">
                            <strong className="text-warning">
                              {key.replace(/_/g, ' ').toUpperCase()}:
                            </strong>
                            <br />
                            <span className="text-light">
                              {value.slice(0, 5).join(', ')}
                              {value.length > 5 && ` ... and ${value.length - 5} more`}
                            </span>
                          </div>
                        );
                      }
                      
                      return (
                        <div key={key} className="col-sm-6 mb-3">
                          <strong className="text-warning">
                            {key.replace(/_/g, ' ').toUpperCase()}:
                          </strong>
                          <br />
                          <span className="text-light">
                            {value || 'Unknown'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="spinner-border text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};