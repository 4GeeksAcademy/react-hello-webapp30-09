import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const CUSTOM_IMAGES = {
  byId: {
    people: {
      1: "https://wallpapercave.com/wp/ISmNLc8.jpg",
      2: "https://th.bing.com/th/id/R.121b35a07700fef964e869613e7774a5?rik=OA0touxwC9Lljg&riu=http%3a%2f%2fwww.mwctoys.com%2fimages3%2freview_pfc3po_1.jpg&ehk=kucEH6eh1bL7Q8XiC4j4NP2Gqu1DqSBV6NO5ggYDQ30%3d&risl=&pid=ImgRaw&r=0",
      3: "https://tse4.mm.bing.net/th/id/OIP.SfaTGzd6H1QkMn5qnxhU8wHaEj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      4: "https://th.bing.com/th/id/R.f09a5c96669c29e33de93ea9e7373a6f?rik=%2fGr1sMFLpJhfWg&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fStar-wars-darth-vader-images-wallpaper.jpg&ehk=U%2bJ%2f0LtlMuf%2f2W95dFpkDuXJQj%2fAZxjMQsaepzAB4so%3d&risl=1&pid=ImgRaw&r=0",
      5: "https://vignette.wikia.nocookie.net/worldsgreatestheroes/images/d/d5/Princess_Leia.jpg/revision/latest?cb=20140409120238",
      6: "https://lumiere-a.akamaihd.net/v1/images/owen-lars-bio-5_dd84f781.jpeg",
      7: "https://i.pinimg.com/736x/2b/79/e9/2b79e93257be79e0518c5c843d538f70--star-wars--lars.jpg",
      8: "https://th.bing.com/th/id/R.52c567670ade504c5523b28cf81102de?rik=rTpJxBSfWKASPw&pid=ImgRaw&r=0",
      9: "https://th.bing.com/th/id/R.75328c5f23199b79662784c4ad72a09b?rik=xYsjL66%2bvuOSEA&riu=http%3a%2f%2fimg2.wikia.nocookie.net%2f__cb20130305010406%2fstarwars%2fimages%2f0%2f00%2fBiggsHS-ANH.png&ehk=k5vXPduLLl46%2bHcAtOdVqw%2bgbmvB%2bNDPtzEFMGojdy0%3d&risl=&pid=ImgRaw&r=0",
      10: "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/03/11112046/obi-wan-kenobi-series.jpg",
    },
    planets: {
      1: "https://th.bing.com/th/id/R.5985d7b64d4dc6260b7fce37e0db79c2?rik=WJidGx4SAc77TA&pid=ImgRaw&r=0",
      2: "https://tse2.mm.bing.net/th/id/OIP.Tryzwy3GUgQEp79QHvyQGQHaDt?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      3: "https://th.bing.com/th/id/R.ed5821d76b9f984d15876913d71e8ca9?rik=nOwpVmNxodInaw&pid=ImgRaw&r=0",
      4: "https://content.pulse.ea.com/content/legacy/starwars-ea-com/en_US/starwars/battlefront/news-articles/creating-hoth/_jcr_content/featuredImage/renditions/rendition1.img.jpg",
      5: "https://lumiere-a.akamaihd.net/v1/images/Dagobah_890df592.jpeg?region=0%2C80%2C1260%2C630",
      6: "https://wallpaperaccess.com/full/5391314.jpg",
      7: "https://media.contentapi.ea.com/content/legacy/starwars-ea-com/en_GB/starwars/battlefront/news-articles/the-star-wars-battlefront-planets--creating-endor/_jcr_content/body/image_2/renditions/rendition1.img.jpg",
      8: "https://th.bing.com/th/id/R.5c41d2ecd4a0bb68d46f70224b4f1fa4?rik=3jx4PorM0zg49w&riu=http%3a%2f%2fimg.lum.dolimg.com%2fv1%2fimages%2fdatabank_naboo_01_169_6cd7e1e0.jpeg%3fregion%3d0%252C49%252C1560%252C780&ehk=NBRVGUKr8wqadIR%2fdjFJfS8vg5U3vTGh4afhYA96GYE%3d&risl=&pid=ImgRaw&r=0",
      9: "https://th.bing.com/th/id/R.f581a8303482d0b2a22d5e00e4ac5500?rik=BFKT3PbdQGSipg&pid=ImgRaw&r=0",
      10: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/f/f9/Kamino.jpeg",
    },
    vehicles: {
      1: "https://th.bing.com/th/id/R.16f9a832cb850302a7e88c3cf3ddf59f?rik=bQ%2bsp8IGwLPgVA&riu=http%3a%2f%2fvignette1.wikia.nocookie.net%2fstarwars%2fimages%2ff%2fff%2fSandcrawler.png%2frevision%2flatest%3fcb%3d20130812001443&ehk=6OWTgicuctgjInPjcH4FdeDXdTi0vWAImuGNbbRVs1U%3d&risl=&pid=ImgRaw&r=0",
      2: "https://tse4.mm.bing.net/th/id/OIP.CMPMEh-Vel1yDLGg5xR2PgHaDt?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      3: "https://tse1.mm.bing.net/th/id/OIP.ndpo1Hqg3tIuFqImsWyM1AHaFE?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      4: "https://th.bing.com/th/id/R.16f9a832cb850302a7e88c3cf3ddf59f?rik=bQ%2bsp8IGwLPgVA&riu=http%3a%2f%2fvignette1.wikia.nocookie.net%2fstarwars%2fimages%2ff%2fff%2fSandcrawler.png%2frevision%2flatest%3fcb%3d20130812001443&ehk=6OWTgicuctgjInPjcH4FdeDXdTi0vWAImuGNbbRVs1U%3d&risl=&pid=ImgRaw&r=0",
      5: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/657811c3-939d-4d1e-8fa5-d1adbf999420/dd8gj7i-999ce7fa-c804-4a74-ac03-6787eddb2c0a.jpg/v1/fill/w_1600,h_900,q_75,strp/luke_s_x_34_landspeeder___restored_by_ravendeviant_dd8gj7i-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvNjU3ODExYzMtOTM5ZC00ZDFlLThmYTUtZDFhZGJmOTk5NDIwXC9kZDhnajdpLTk5OWNlN2ZhLWM4MDQtNGE3NC1hYzAzLTY3ODdlZGRiMmMwYS5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.37XLIa0XjPp_9dELu_JhCIuhqJQAMewz2sUCI08j8uw",
      6: "https://tse3.mm.bing.net/th/id/OIP.buxdHXP65mR8VN7i5UO0RwHaIc?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      7: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/657811c3-939d-4d1e-8fa5-d1adbf999420/dd8gj7i-999ce7fa-c804-4a74-ac03-6787eddb2c0a.jpg/v1/fill/w_1600,h_900,q_75,strp/luke_s_x_34_landspeeder___restored_by_ravendeviant_dd8gj7i-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvNjU3ODExYzMtOTM5ZC00ZDFlLThmYTUtZDFhZGJmOTk5NDIwXC9kZDhnajdpLTk5OWNlN2ZhLWM4MDQtNGE3NC1hYzAzLTY3ODdlZGRiMmMwYS5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.37XLIa0XjPp_9dELu_JhCIuhqJQAMewz2sUCI08j8uw",
      8: "https://us.v-cdn.net/5021068/uploads/editor/cs/kb6uqwzqvpyi.jpg",
      9: "https://vignette.wikia.nocookie.net/starwars/images/5/5f/StormIV_btm.jpg/revision/latest?cb=20080623132545&path-prefix=nl",
      10: "https://www.desertusa.com/sandhills/starwar-returnofjedi.jpg",
      14:"https://lumiere-a.akamaihd.net/v1/images/snowspeeder_ef2f9334.jpeg?region=0%2C337%2C2048%2C1028",
      19:"https://cdna.artstation.com/p/assets/images/images/056/882/280/large/edgardo-paredes-at-st-walker-endor-1.jpg?1670325656",
    },
  },
  
  byName: {
    people: {
      "luke skywalker": "https://wallpapercave.com/wp/ISmNLc8.jpg",
      "c-3po": "https://www.mwctoys.com/images3/review_pfc3po_1.jpg",
      "r2-d2": "https://tse4.mm.bing.net/th/id/OIP.SfaTGzd6H1QkMn5qnxhU8wHaEj",
      "darth vader": "http://www.pixelstalk.net/wp-content/uploads/2016/05/Star-wars-darth-vader-images-wallpaper.jpg",
      "leia organa": "https://vignette.wikia.nocookie.net/worldsgreatestheroes/images/d/d5/Princess_Leia.jpg/revision/latest?cb=20140409120238",
    },
    planets: {
      "tatooine": "https://th.bing.com/th/id/R.5985d7b64d4dc6260b7fce37e0db79c2?rik=WJidGx4SAc77TA&pid=ImgRaw&r=0",
      "hoth": "https://content.pulse.ea.com/content/legacy/starwars-ea-com/en_US/starwars/battlefront/news-articles/creating-hoth/_jcr_content/featuredImage/renditions/rendition1.img.jpg",
      "dagobah": "https://lumiere-a.akamaihd.net/v1/images/Dagobah_890df592.jpeg?region=0%2C80%2C1260%2C630",
      "naboo": "http://img.lum.dolimg.com/v1/images/databank_naboo_01_169_6cd7e1e0.jpeg?region=0%2C49%2C1560%2C780",
    },
    vehicles: {
      "sand crawler": "https://vignette1.wikia.nocookie.net/starwars/images/f/ff/Sandcrawler.png",
      "x-34 landspeeder": "https://tse4.mm.bing.net/th/id/OIP.CMPMEh-Vel1yDLGg5xR2PgHaDt",
      "t-16 skyhopper": "https://tse2.mm.bing.net/th/id/OIP.kwAUiV5e--F0emhPYOWJpgHaD5",
      "tie/ln starfighter": "https://tse3.mm.bing.net/th/id/OIP.FJT_BdoXVpTDZS7dNTLlBQHaE7",
      "snowspeeder": "https://lumiere-a.akamaihd.net/v1/images/snowspeeder_ef2f9334.jpeg?region=0%2C337%2C2048%2C1028",
      "at-at": "https://cdnb.artstation.com/p/assets/images/images/054/247/695/large/nikolas-voisin-at-at-comp.jpg?1664113170",
      "tie bomber": "https://vignette.wikia.nocookie.net/disney/images/1/17/TIE_Bomber_BF2.png",
      "at-st": "https://www.desertusa.com/sandhills/starwar-returnofjedi.jpg",
      "storm iv twin-pod cloud car": "https://vignette.wikia.nocookie.net/starwars/images/5/5f/StormIV_btm.jpg",
      "sail barge": "https://www.desertusa.com/sandhills/starwar-returnofjedi.jpg",
    },
  },
};
const getCustomImage = (category, id, name) => {
  const byId = CUSTOM_IMAGES.byId?.[category]?.[String(id)];
  if (byId) return byId;
  const key = (name || "").toLowerCase();
  const byName = CUSTOM_IMAGES.byName?.[category]?.[key];
  return (
    byName ||
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&h=600&fit=crop"
  );
};

export const Detail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // Chips cache
  const relatedCache = useMemo(() => new Map(), []);
  const [relatedNames, setRelatedNames] = useState({});
  const linkableCategories = new Set(["people", "planets", "vehicles"]);

  const endpoints = {
    people: `https://www.swapi.tech/api/people/${id}/`,
    planets: `https://www.swapi.tech/api/planets/${id}/`,
    vehicles: `https://www.swapi.tech/api/vehicles/${id}/`,
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("starwars-favorites");
      if (saved) {
        const favorites = JSON.parse(saved);
        setIsFavorited(favorites.some((fav) => fav.id === id && fav.category === category));
      }
    } catch {}
  }, [id, category]);

  const toggleFavorite = () => {
    if (!item) return;
    const favoriteItem = {
      id,
      name: item.name || item.title,
      category,
      url: `https://www.swapi.tech/api/${category}/${id}/`,
      imageId: id,
    };
    try {
      const saved = localStorage.getItem("starwars-favorites");
      let favorites = saved ? JSON.parse(saved) : [];
      if (isFavorited) {
        favorites = favorites.filter((f) => !(f.id === id && f.category === category));
      } else if (!favorites.some((f) => f.id === id && f.category === category)) {
        favorites.push(favoriteItem);
      }
      localStorage.setItem("starwars-favorites", JSON.stringify(favorites));
      setIsFavorited(!isFavorited);
    } catch {}
  };

  const formatKey = (key) => {
    const tr = {
      birth_year: "Año de Nacimiento",
      eye_color: "Color de Ojos",
      gender: "Género",
      hair_color: "Color de Cabello",
      height: "Altura",
      mass: "Masa",
      skin_color: "Color de Piel",
      homeworld: "Planeta Natal",
      climate: "Clima",
      diameter: "Diámetro",
      gravity: "Gravedad",
      orbital_period: "Periodo Orbital",
      population: "Población",
      rotation_period: "Periodo de Rotación",
      surface_water: "Agua Superficial",
      terrain: "Terreno",
      model: "Modelo",
      manufacturer: "Fabricante",
      cost_in_credits: "Costo en Créditos",
      length: "Longitud",
      max_atmosphering_speed: "Velocidad Atmosférica Máxima",
      crew: "Tripulación",
      passengers: "Pasajeros",
      cargo_capacity: "Capacidad de Carga",
      consumables: "Consumibles",
      vehicle_class: "Clase de Vehículo",
      films: "Películas",
      species: "Especies",
      starships: "Naves",
      vehicles: "Vehículos",
    };
    return tr[key] || key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const isIsoDate = (v) => typeof v === "string" && v.includes("T") && v.includes("Z");
  const formatScalar = (value) => {
    if (value === "n/a" || value === "unknown" || value === null || value === undefined || value === "")
      return "Desconocido";
    if (isIsoDate(value)) {
      try {
        return new Date(value).toLocaleDateString("es-ES");
      } catch {
        return value;
      }
    }
    return String(value);
  };

  const parseSwapiUrl = (url) => {
    try {
      const u = new URL(url);
      const parts = u.pathname.split("/").filter(Boolean);
      return { category: parts[1], id: parts[2] };
    } catch {
      return null;
    }
  };

  const resolveRelated = async (key, urls) => {
    if (!Array.isArray(urls) || urls.length === 0) {
      setRelatedNames((prev) => ({ ...prev, [key]: [] }));
      return;
    }
    const limited = urls.slice(0, 5);
    const results = await Promise.all(
      limited.map(async (url) => {
        if (relatedCache.has(url)) return relatedCache.get(url);
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("bad");
          const data = await res.json();
          const props = data?.result?.properties || {};
          const parsed = parseSwapiUrl(url) || {};
          const name = props.name || props.title || `#${parsed.id}`;
          const value = { url, name, category: parsed.category, id: parsed.id };
          relatedCache.set(url, value);
          return value;
        } catch {
          const parsed = parseSwapiUrl(url) || {};
          const fallback = { url, name: `#${parsed.id || "?"}`, category: parsed.category, id: parsed.id };
          relatedCache.set(url, fallback);
          return fallback;
        }
      })
    );
    setRelatedNames((prev) => ({ ...prev, [key]: { items: results, total: urls.length } }));
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      setError(null);
      setRelatedNames({});
      try {
        const endpoint = endpoints[category];
        if (!endpoint) throw new Error(`Categoría no válida: ${category}`);

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        if (data.result && data.result.properties) {
          const props = data.result.properties;
          setItem(props);
          for (const [k, v] of Object.entries(props)) {
            if (Array.isArray(v) && v.length && typeof v[0] === "string" && v[0].includes("swapi.tech")) {
              resolveRelated(k, v);
            }
          }
        } else {
          throw new Error("Estructura de datos incorrecta");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category && id) fetchItemDetails();
  }, [category, id]);

  if (loading) {
    return (
      <div className="container-fluid bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-warning" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-warning fs-5">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container-fluid bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h2 className="text-warning mb-3">Elemento no encontrado</h2>
          <p className="text-light mb-4 fs-5">{error}</p>
          <button className="btn btn-warning btn-lg" onClick={() => navigate("/")}>
            ← Volver al Banco de Datos
          </button>
        </div>
      </div>
    );
  }

  const itemName = item.name || item.title;
  const imgSrc = getCustomImage(category, id, itemName);

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      {/* Header */}
      <div className="row bg-black py-3 border-bottom border-secondary">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-warning btn-lg" onClick={() => navigate("/")}>
              ← Volver al Banco de Datos
            </button>
            <h1 className="text-warning mb-0 display-6">STAR WARS - BANCO DE DATOS</h1>
            <button className={`btn ${isFavorited ? "btn-warning" : "btn-outline-warning"} btn-lg`} onClick={toggleFavorite}>
              {isFavorited ? "★ Favorito" : "☆ Añadir a Favoritos"}
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {/* Imagen */}
          <div className="col-md-4 mb-4">
            <div className="card bg-secondary border-warning">
              <img
                src={imgSrc}
                className="card-img-top"
                alt={itemName}
                style={{ height: "400px", objectFit: "cover" }}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&h=600&fit=crop";
                }}
              />
              <div className="card-body text-center">
                <span className="badge bg-dark mb-2 fs-6">
                  {category === "people" ? "PERSONAJE" : category === "planets" ? "PLANETA" : "VEHÍCULO"}
                </span>
                <p className="text-light small mt-2">Imagen personalizada</p>
              </div>
            </div>
          </div>

          {/* Detalles */}
          <div className="col-md-8">
            <div className="card bg-secondary border-warning h-100">
              <div className="card-header bg-dark border-warning py-3">
                <h2 className="card-title text-warning mb-0 display-4">{itemName}</h2>
                <small className="text-light">
                  {category} • ID: {id}
                </small>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  {Object.entries(item).map(([key, value]) => {
                    if (["name", "title", "url", "created", "edited", "homeworld"].includes(key)) return null;

                    if (Array.isArray(value)) {
                      const rel = relatedNames[key];
                      const total = rel?.total ?? value.length;
                      const items = rel?.items ?? [];
                      if (total === 0) return null;

                      return (
                        <div key={key} className="col-12 mb-3">
                          <div className="border-bottom border-warning pb-2">
                            <strong className="text-warning d-block fs-6 mb-2">{formatKey(key)}</strong>
                            <div className="d-flex flex-wrap gap-2">
                              {items.map((r) => {
                                const pill = (
                                  <span className="badge bg-dark text-warning border border-warning" key={r.url}>
                                    {r.name}
                                  </span>
                                );
                                return linkableCategories.has(r.category) ? (
                                  <Link key={r.url} to={`/detail/${r.category}/${r.id}`} className="text-decoration-none">
                                    {pill}
                                  </Link>
                                ) : (
                                  pill
                                );
                              })}
                              {total > items.length && (
                                <span className="badge bg-dark text-light">+ {total - items.length} más</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    const formattedValue = formatScalar(value);
                    if (formattedValue === "Desconocido") return null;

                    return (
                      <div key={key} className="col-sm-6 col-md-4 mb-3">
                        <div className="border-bottom border-warning pb-2">
                          <strong className="text-warning d-block fs-6 mb-1">{formatKey(key)}</strong>
                          <span className="text-light fs-6">{formattedValue}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};