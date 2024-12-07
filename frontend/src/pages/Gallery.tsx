import ApplicationStructure from "../components/ApplicationStructure";
import styles from "./Gallery.module.css"; // Updated import for CSS Modules
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  GalleryData_Env,
  GalleryData_Act,
  type GalleryEnvUrl,
} from "../types/common";
import { getCachedSignedMediaUrl } from "../lib/aws-config";
import CustomSpinner from "../components/Spinner";

function Gallery() {
  const { t, i18n } = useTranslation();
  const [model, setModel] = useState(false);
  const [temImgSrc, setTempImgSrc] = useState("");
  const [activeTab, setActiveTab] = useState("environment");
  const [gallery, setGallery] = useState<GalleryEnvUrl[]>([]);
  const [activityGallery, setActivityGallery] = useState<GalleryEnvUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>(
    {}
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getImg = (imgSrc: string) => {
    setTempImgSrc(imgSrc);
    setModel(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModel(false);
    document.body.style.overflow = "auto";
  };

  const handleTabChange = (tab: string) => {
    setAnimate(true);
    setActiveTab(tab);
    setTimeout(() => setAnimate(false), 500);
  };

  useEffect(() => {
    const userLanguage = navigator.language || "en";
    const supportedLanguages = ["en", "es"];
    const defaultLanguage = "en";
    const languageToUse = supportedLanguages.includes(
      userLanguage.slice(0, 2)
    )
      ? userLanguage.slice(0, 2)
      : defaultLanguage;
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(languageToUse);
    }
  }, [i18n]);

  useEffect(() => {
    const loadServiceImages = async () => {
      try {
        setIsLoading(true);
        const envWithUrls = await Promise.all(
          GalleryData_Env.map(async (environment) => ({
            ...environment,
            imageUrl: await getCachedSignedMediaUrl(environment.imageKey),
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
            imageUrl: await getCachedSignedMediaUrl(activity.imageKey),
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

  useEffect(() => {
    // Create intersection observer for fade-in effect
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Observe new gallery items after render
    const galleryItems = document.querySelectorAll(`.${styles.galleryItem}`);
    galleryItems.forEach((item, index) => {
      if (observerRef.current) {
        (item as HTMLElement).style.transitionDelay = `${index * 100}ms`;
        observerRef.current.observe(item);
      }
    });
  }, [gallery, activityGallery, activeTab]);

  const handleImageLoad = (imageUrl: string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [imageUrl]: true,
    }));
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CustomSpinner size={60} color="#3498db" />
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <ApplicationStructure>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryHeader}>
          <h1 className={styles.galleryTitle}>{t("gallery.title")}</h1>
          <p className={styles.galleryDescription}>{t("gallery.description")}</p>

          <div className={styles.galleryTabs}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "environment" ? styles.tabButtonActive : ""
              }`}
              onClick={() => handleTabChange("environment")}
            >
              {t("gallery.environment")}
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "activities" ? styles.tabButtonActive : ""
              }`}
              onClick={() => handleTabChange("activities")}
            >
              {t("gallery.activities")}
            </button>
          </div>
        </div>

        <div
          className={`${styles.galleryContent} ${
            animate ? styles.galleryContentFade : ""
          }`}
        >
          {activeTab === "environment" && (
            <div className={styles.galleryGrid}>
              {gallery.map((item, index) => (
                <div
                  className={styles.galleryItem}
                  key={index}
                  onClick={() => getImg(item.imageUrl)}
                >
                  <div className={styles.imageWrapper}>
                    {!imagesLoaded[item.imageUrl] && (
                      <div className={styles.imagePlaceholder}>
                        <CustomSpinner size={30} color="rgb(162, 132, 94)" />
                      </div>
                    )}
                    <img
                      src={item.imageUrl}
                      alt={`Environment ${index + 1}`}
                      onLoad={() => handleImageLoad(item.imageUrl)}
                      style={{
                        opacity: imagesLoaded[item.imageUrl] ? 1 : 0,
                      }}
                    />
                  </div>
                  <div className={styles.galleryItemOverlay} />
                </div>
              ))}
            </div>
          )}

          {activeTab === "activities" && (
            <div className={styles.galleryGrid}>
              {activityGallery.map((item, index) => (
                <div
                  className={styles.galleryItem}
                  key={index}
                  onClick={() => getImg(item.imageUrl)}
                >
                  <div className={styles.imageWrapper}>
                    {!imagesLoaded[item.imageUrl] && (
                      <div className={styles.imagePlaceholder}>
                        <CustomSpinner size={30} color="rgb(162, 132, 94)" />
                      </div>
                    )}
                    <img
                      src={item.imageUrl}
                      alt={`Activity ${index + 1}`}
                      onLoad={() => handleImageLoad(item.imageUrl)}
                      style={{
                        opacity: imagesLoaded[item.imageUrl] ? 1 : 0,
                      }}
                    />
                  </div>
                  <div className={styles.galleryItemOverlay} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={model ? `${styles.modal} ${styles.modalOpen}` : styles.modal}>
          <img src={temImgSrc} alt="Enlarged view" className={styles.modalImage} />
          <button className={styles.modalClose} onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </ApplicationStructure>
  );
}

export default Gallery;
