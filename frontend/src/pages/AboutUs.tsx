import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ApplicationStructure from "../components/ApplicationStructure";
import styles from "./AboutUs.module.css";
import {
  StaffsData_admin,
  StaffsData_act,
  StaffsData_health,
  StaffsData_whole,
  type StaffsUrl,
} from "../types/common";
import { getCachedSignedMediaUrl } from "../lib/aws-config";
import CustomSpinner from "../components/Spinner";

function AboutUs() {
  const [StaffAdmin, setStaffAdmin] = useState<StaffsUrl[]>([]);
  const [StaffAct, setStaffAct] = useState<StaffsUrl[]>([]);
  const [StaffHealth, setStaffHealth] = useState<StaffsUrl[]>([]);
  const [Staffs, setStaffs] = useState<StaffsUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const userLanguage = navigator.language || "en";
    const supportedLanguages = ["en", "es"];
    const defaultLanguage = "en";
    const languageToUse = supportedLanguages.includes(userLanguage.slice(0, 2))
      ? userLanguage.slice(0, 2)
      : defaultLanguage;
    if (typeof i18n?.changeLanguage === "function") {
      i18n.changeLanguage(languageToUse);
    }
  }, [i18n]);

  useEffect(() => {
    const loadStaffData = async () => {
      try {
        const [admin, act, health, whole] = await Promise.all([
          Promise.all(
            StaffsData_admin.map(async (staff) => ({
              ...staff,
              imageUrl: await getCachedSignedMediaUrl(staff.imageKey),
            }))
          ),
          Promise.all(
            StaffsData_act.map(async (staff) => ({
              ...staff,
              imageUrl: await getCachedSignedMediaUrl(staff.imageKey),
            }))
          ),
          Promise.all(
            StaffsData_health.map(async (staff) => ({
              ...staff,
              imageUrl: await getCachedSignedMediaUrl(staff.imageKey),
            }))
          ),
          Promise.all(
            StaffsData_whole.map(async (staff) => ({
              ...staff,
              imageUrl: await getCachedSignedMediaUrl(staff.imageKey),
            }))
          ),
        ]);

        setStaffAdmin(admin);
        setStaffAct(act);
        setStaffHealth(health);
        setStaffs(whole);
        setError(null);
      } catch (error) {
        console.error("Error loading staff data:", error);
        setError("Error loading staff data");
      } finally {
        setIsLoading(false);
      }
    };

    loadStaffData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ApplicationStructure>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <CustomSpinner size={60} color="#3498db" />
        </div>
      ) : (
        <div className={styles.abWhole}>
          <div className={styles.parentContainer}>
            <h1 style={{ textAlign: "left" }}>
              <span style={{ fontSize: "1.4em" }}>{t("aboutUs.title")}</span>
            </h1>
            <div className={styles.aboutUsDescription}>
              <p style={{ textAlign: "center", lineHeight: "1.6" }}>
                {t("aboutUs.description1")}
                <br />
                <br />
                {t("aboutUs.description2")}
                <br />
                <br />
                {t("aboutUs.description3")}
              </p>
            </div>

            <h2 style={{ fontSize: "2em", textAlign: "center" }}>
              {t("aboutUs.missionStatement")}
            </h2>
            <hr />
            <p className={styles.missionDescription}>
              {t("aboutUs.missionDescription")}
            </p>
            <h2 style={{ fontSize: "2em", textAlign: "center" }}>
              {t("aboutUs.meetStaff")}
            </h2>
            <hr />
            <img className={styles.staffs} src={Staffs[0].imageUrl} alt="Staff Image" />

            <h3 className={styles.sectionHeading} style={{ textAlign: "left" }}>
              {t("aboutUs.adminDepartment")}
            </h3>
            <div className={styles.staffContainer}>
              <div className={styles.wrapper}>
                {StaffAdmin.map((staff, index) => (
                  <div
                    key={`${staff.id}-${index}`}
                    className={staff.id === 1 ? styles.noMargin : styles.image}
                  >
                    <img
                      className={styles.staffIndiv}
                      src={staff.imageUrl}
                      alt={staff.title}
                    />
                    <div className={styles.content}>
                      <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                        {staff.title}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className={styles.sectionHeading} style={{ textAlign: "left" }}>
              {t("aboutUs.activitiesDept")}
            </h3>
            <div className={styles.staffContainer}>
              <div className={styles.wrapper}>
                {StaffAct.map((staff, index) => (
                  <div
                    key={`${staff.id}-${index}`}
                    className={staff.id === 1 ? styles.noMargin : styles.image}
                  >
                    <img
                      className={styles.staffIndiv}
                      src={staff.imageUrl}
                      alt={staff.title}
                    />
                    <div className={styles.content}>
                      <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                        {staff.title}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className={styles.sectionHeading} style={{ textAlign: "left" }}>
              {t("aboutUs.healthTherapy")}
            </h3>
            <div className={styles.staffContainer}>
              <div className={styles.wrapper}>
                {StaffHealth.map((staff, index) => (
                  <div
                    key={`${staff.id}-${index}`}
                    className={staff.id === 1 ? styles.noMargin : styles.image}
                  >
                    <img
                      className={styles.staffIndiv}
                      src={staff.imageUrl}
                      alt={staff.title}
                    />
                    <div className={styles.content}>
                      <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                        {staff.title}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ApplicationStructure>
  );
}

export default AboutUs;