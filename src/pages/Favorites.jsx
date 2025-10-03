import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("starwars-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "starwars-favorites") {
        setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const removeFavorite = (id, category) => {
    try {
      const updated = favorites.filter((fav) => !(fav.id === id && fav.category === category));
      setFavorites(updated);
      localStorage.setItem("starwars-favorites", JSON.stringify(updated));
    } catch (error) {
      console.error("Error eliminando favorito:", error);
    }
  };

  const goToDetails = (favorite) => navigate(`/detail/${favorite.category}/${favorite.id}`);

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      {/* Header */}
      <div className="row bg-black py-3 border-bottom border-secondary">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-warning" onClick={() => navigate("/")}>
              ← Volver al Banco de Datos
            </button>
            <h1 className="text-warning mb-0">MIS FAVORITOS</h1>
            <div className="text-warning">
              {favorites.length} {favorites.length === 1 ? "elemento" : "elementos"}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {favorites.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="text-warning mb-3">No hay favoritos todavía</h3>
            <p className="text-light mb-4">
              ¡Comienza a explorar el universo de Star Wars y añade tus elementos favoritos!
            </p>
            <button className="btn btn-warning btn-lg" onClick={() => navigate("/")}>
              Explorar Banco de Datos
            </button>
          </div>
        ) : (
          <div className="row">
            {favorites.map((favorite) => {
              const img = getCustomImage(favorite.category, favorite.imageId || favorite.id, favorite.name);
              return (
                <div key={`${favorite.category}-${favorite.id}`} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="card bg-secondary border-warning h-100">
                    <img
                      src={img}
                      className="card-img-top"
                      alt={favorite.name}
                      style={{ height: "250px", objectFit: "cover" }}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&h=600&fit=crop";
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-warning">{favorite.name}</h5>
                      <p className="card-text text-light small">
                        <span className="badge bg-dark text-warning border border-warning">
                          {favorite.category === "people"
                            ? "PERSONAJE"
                            : favorite.category === "planets"
                            ? "PLANETA"
                            : "VEHÍCULO"}
                        </span>
                      </p>
                      <div className="d-flex gap-2 justify-content-center mt-auto">
                        <button className="btn btn-outline-warning btn-sm flex-fill" onClick={() => goToDetails(favorite)}>
                          Ver Detalles
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFavorite(favorite.id, favorite.category)}
                          title="Quitar de favoritos"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
