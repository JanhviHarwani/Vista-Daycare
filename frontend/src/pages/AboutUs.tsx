import ApplicationStructure from "../components/ApplicationStructure";
import "./AboutUs.css";
import { useTranslation } from "react-i18next";

import staffs from "../assets/image/staffs.jpg";
import founder from "../assets/image/staff_founder.jpg";
import director from "../assets/image/staff_director.jpg";
import recep from "../assets/image/staff_recep.jpg";
import actCoord from "../assets/image/staff_actCoord.jpg";
import PAide1 from "../assets/image/staff_PAide1.jpg";
import PAide2 from "../assets/image/staff_PAide2.jpg";
import PAide3 from "../assets/image/staff_PAide3.jpg";
import social from "../assets/image/staff_social.jpg";
import driver1 from "../assets/image/staff_driver1.jpg";
import driver2 from "../assets/image/staff_driver2.jpg";
import pt1 from "../assets/image/staff_pt1.jpg";
import pt2 from "../assets/image/staff_pt2.jpg";
import cna from "../assets/image/staff_cna.jpg";
import kitchen from "../assets/image/staff_kitchen.jpg";
import rd from "../assets/image/staff_rd.jpg";
import  { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
//const { t } = useTranslation();

function AboutUs() {
  const { i18n} = useTranslation(); 
  const { t} = useTranslation(); 

  useEffect(() => {
    const userLanguage = navigator.language || 'en'; 
    const supportedLanguages = ['en', 'es']; 
    const defaultLanguage = 'en'; 
    const languageToUse = supportedLanguages.includes(userLanguage.slice(0, 2)) ? userLanguage.slice(0, 2) : defaultLanguage;
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(languageToUse);
    }
  }, [i18n]);
  return (
  <HelmetProvider>  
    <ApplicationStructure>
    <Helmet>
        <title>About Us - Learn More About Our Team and Mission</title>
        <meta
          name="description"
          content="Discover our mission, meet our dedicated team members, and learn about the values that drive us."
        />
        <meta
          name="keywords"
          content="About Us, Our Team, Mission, Adult Day Care, Staff Profiles, Health Services, Community Support"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="whole">
        <div className="parent-container">
          <h1 style={{ textAlign: "left" }}>
            <span style={{ fontSize: "1.4em" }}>{t('aboutUs.title')}</span>
          </h1>
          <p style={{ textAlign: "center", lineHeight: "1.6" }}>
          {t('aboutUs.description1')}
            <br />
            <br />
            {t('aboutUs.description2')}
            <br />
            <br />
            {t('aboutUs.description3')}
          </p>

          <h2 style={{ fontSize: "2em", textAlign: "center" }}>
          {t('aboutUs.missionStatement')}
          </h2>
          <hr />
          <p
            style={{
              textAlign: "center",
              backgroundColor: "#F7F3ED",
              padding: "30px 60px",
              margin: "20px 80px",
              border: "8px solid transparent",
              borderRadius: "15px",
              lineHeight: "1.6",
            }}
          >
            {t('aboutUs.missionDescription')}
          </p>
          <h2 style={{ fontSize: "2em", textAlign: "center" }}>
          {t('aboutUs.meetStaff')}
          </h2>
          <hr />
          <img className="staffs" src={staffs} />

          <h3 className="section-heading" style={{ textAlign: "left" }}>
          {t('aboutUs.adminDepartment')}
          </h3>
          <div className="staff_container">
            <div className="wrapper">
              <div className="image">
                <img className="staff_indiv" src={founder} />
                <div className="content_first">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.founder')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={director} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.projectDirector')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={recep} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.officeAssistant')}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <h3 className="section-heading" style={{ textAlign: "left" }}>
          {t('aboutUs.activitiesDept')}
          </h3>
          <div className="staff_container">
            <div className="wrapper">
              <div className="image">
                <img className="staff_indiv" src={actCoord} />
                <div className="content_first">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.activitiesCoordinator')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={PAide1} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.programAide')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={PAide2} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.programAide')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={PAide3} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.programAide')}
                  </h1>
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="image">
                <img className="staff_indiv" src={social} />
                <div className="content_first">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.socialWorker')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={driver1} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.programAide')}/<br />
                  {t('aboutUs.driver')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={driver2} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.programAide')}/<br />
                  {t('aboutUs.driver')}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <h3 className="section-heading" style={{ textAlign: "left" }}>
          {t('aboutUs.healthTherapy')}
          </h3>
          <div className="staff_container">
            <div className="wrapper">
              <div className="image">
                <img className="staff_indiv" src={pt1} />
                <div className="content_first">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.ptOtAide')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={pt2} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.ptOtAide')}
                  </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={cna} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>{t('aboutUs.cna')} </h1>
                </div>
              </div>

              <div className="image">
                <img className="staff_indiv" src={kitchen} />
                <div className="content">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                  {t('aboutUs.kitchenStaff')}
                  </h1>
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="image">
                <img className="staff_indiv" src={rd} />
                <div className="content_first">
                  <h1 style={{ textAlign: "left", fontSize: "1.8em" }}> {t('aboutUs.rd')}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </ApplicationStructure>
  </HelmetProvider>
  );
}

export default AboutUs;
