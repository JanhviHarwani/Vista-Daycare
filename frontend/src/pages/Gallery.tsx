import ApplicationStructure from "../components/ApplicationStructure";
import "./Gallery.css";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import {
  GalleryData_Env,
  GalleryData_Act,
  type GalleryEnvUrl,
} from "../types/common";
import { getSignedMediaUrl } from "../lib/aws-config";

function Gallery() {
  const [model, setModel] = useState(false);
  const [temImgSrc, setTempImgSrc] = useState("");
  const getImg = (imgSrc: string) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  const [gallery, setGallery] = useState<GalleryEnvUrl[]>([]);
  const [activityGallery, setActivityGallery] = useState<GalleryEnvUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServiceImages = async () => {
      try {
        setIsLoading(true);
        const envWithUrls = await Promise.all(
          GalleryData_Env.map(async (environment) => ({
            ...environment,
            imageUrl: await getSignedMediaUrl(environment.imageKey),
          }))
        );
        setGallery(envWithUrls);
        setError(null);
      } catch (error) {
        console.error("Error loading service images:", error);
        setError("Error loading images");
      } finally {
        setIsLoading(false);
      }
    };

    const loadActivityImages = async () => {
      try {
        const activityWithUrls = await Promise.all(
          GalleryData_Act.map(async (activity) => ({
            ...activity,
            imageUrl: await getSignedMediaUrl(activity.imageKey),
          }))
        );
        setActivityGallery(activityWithUrls);
        setError(null);
      } catch (error) {
        console.error("Error loading activity images:", error);
        setError("Error loading activity images");
      } finally {
        setIsLoading(false);
      }
    };

    loadServiceImages();
    loadActivityImages();
  }, []);

  if (isLoading) {
    return <div>Loading Gallery.......</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ApplicationStructure>
      <div className="gallery_whole">
        <div className={model ? "model open" : "model"}>
          <img src={temImgSrc} />
          <CloseIcon className="close-icon" onClick={() => setModel(false)} />
        </div>
        <div className="gallery-section1">
          <div className="parent-container">
            <h1 style={{ textAlign: "left" }}>
              <span style={{ fontSize: "1.4em" }}>Life </span> at our center
            </h1>
            <h4 style={{ textAlign: "left" }}>
              Discover the vibrant atmosphere, supportive environment, and
              engaging activities that make our elderly daycare center a special
              place to be.{" "}
            </h4>

            <h3 className="section-heading" style={{ textAlign: "left" }}>
              Our Environment
            </h3>
            <div className="gallery">
              {gallery.map((item, index) => {
                return (
                  <div
                    className="pics"
                    key={index}
                    onClick={() => getImg(item.imageUrl)}
                  >
                    <img src={item.imageUrl} style={{ width: "100%" }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={model ? "model open" : "model"}>
          <img src={temImgSrc} />
          <CloseIcon className="close-icon" onClick={() => setModel(false)} />
        </div>
        <div className="gallery-section2">
          <div className="parent-container">
            <h3 className="section-heading" style={{ textAlign: "left" }}>
              Activities
            </h3>
            <h4>
              Take a look at the engaging activities we offer, from group
              exercises to creative arts, that bring joy and connection to our
              residents.
            </h4>
            <div className="gallery">
              {activityGallery.map((item, index) => {
                return (
                  <div
                    className="pics"
                    key={index}
                    onClick={() => getImg(item.imageUrl)}
                  >
                    <img src={item.imageUrl} style={{ width: "100%" }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ApplicationStructure>
  );
}

export default Gallery;
