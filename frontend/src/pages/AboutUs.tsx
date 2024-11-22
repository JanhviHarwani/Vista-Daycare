import ApplicationStructure from "../components/ApplicationStructure";
import "./AboutUs.css";
import { useEffect, useState } from "react";
import {
  StaffsData_admin,
  StaffsData_act,
  StaffsData_health,
  StaffsData_whole,
  type StaffsUrl,
} from "../types/common";
import { getSignedMediaUrl } from "../lib/aws-config";

function AboutUs() {
  const [StaffAdmin, setStaffAdmin] = useState<StaffsUrl[]>([]);
  const [StaffAct, setStaffAct] = useState<StaffsUrl[]>([]);
  const [StaffHealth, setStaffHealth] = useState<StaffsUrl[]>([]);
  const [Staffs, setStaffs] = useState<StaffsUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStaffAdmin = async () => {
      try {
        const adminWithUrls = await Promise.all(
          StaffsData_admin.map(async (staff) => ({
            ...staff,
            imageUrl: await getSignedMediaUrl(staff.imageKey),
          }))
        );
        setStaffAdmin(adminWithUrls);
        setError(null);
      } catch (error) {
        console.error("Error loading activity images:", error);
        setError("Error loading activity images");
      } finally {
        setIsLoading(false);
      }
    };

    const loadStaffAct = async () => {
      try {
        const actWithUrls = await Promise.all(
          StaffsData_act.map(async (staff) => ({
            ...staff,
            imageUrl: await getSignedMediaUrl(staff.imageKey),
          }))
        );
        setStaffAct(actWithUrls);
        setError(null);
      } catch (error) {
        console.error("Error loading activity images:", error);
        setError("Error loading activity images");
      } finally {
        setIsLoading(false);
      }
    };
    const loadStaffHealth = async () => {
      try {
        const healthWithUrls = await Promise.all(
          StaffsData_health.map(async (staff) => ({
            ...staff,
            imageUrl: await getSignedMediaUrl(staff.imageKey),
          }))
        );
        setStaffHealth(healthWithUrls);
        setError(null);
      } catch (error) {
        console.error("Error loading activity images:", error);
        setError("Error loading activity images");
      } finally {
        setIsLoading(false);
      }
    };
    const loadStaffs = async () => {
      try {
        const staffsWithUrls = await Promise.all(
          StaffsData_whole.map(async (staff) => ({
            ...staff,
            imageUrl: await getSignedMediaUrl(staff.imageKey),
          }))
        );
        setStaffs(staffsWithUrls);
        setError(null);
      } catch (error) {
        console.error("Error loading activity images:", error);
        setError("Error loading activity images");
      } finally {
        setIsLoading(false);
      }
    };

    loadStaffAdmin();
    loadStaffAct();
    loadStaffHealth();
    loadStaffs();
  }, []);

  if (isLoading) {
    return <div>Loading About Us.......</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ApplicationStructure>
      <div className="ab_whole">
        <div className="parent-container">
          <h1 style={{ textAlign: "left" }}>
            <span style={{ fontSize: "1.4em" }}>About </span> us
          </h1>
          <p style={{ textAlign: "center", lineHeight: "1.6" }}>
            <strong>Vista Adult Day Health Care</strong> is a licensed and
            qualified provider of Community-Based Adult Services (CBAS), serving
            the Southern California community since 2007. We are committed to
            helping those who seek an enriched and healthy life.
            <br />
            <br />
            Our comprehensive services include individual assessment,
            professional nursing services, physical, occupational, and speech
            therapies, mental health services, therapeutic activities, social
            services, personal care, diverse meals, nutritional counseling, and
            transportation to and from surrounding areas.
            <br />
            <br />
            <strong>Our goal</strong> is to provide a community for seniors to{" "}
            <strong>socialize</strong> and improve their health, safety, and
            well-being. We offer both <em>therapeutic</em> and{" "}
            <em>recreational</em> services to our Vista ADHC members. Our
            dedicated staff treats members with{" "}
            <strong>professionalism, dignity, and compassion</strong>, helping
            them restore and maintain optimal health, self-reliance, and
            independence. We welcome participants of all races, nationalities,
            and religious backgrounds. Our team of highly qualified and trained
            healthcare professionals shares our goals and philosophy, striving
            to create a nurturing, inclusive, and supportive environment for
            all.
          </p>

          <h2 style={{ fontSize: "2em", textAlign: "center" }}>
            Mission Statement
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
            <strong>Vista's mission</strong> is to provide a{" "}
            <strong>nurturing and inclusive environment</strong> where adults
            can receive comprehensive care, support, and participate in engaging
            activities.
            <br />
            <br />
            We aim to enhance their{" "}
            <em>physical, emotional, and cognitive well-being</em>, promote
            social interaction, and empower individuals to maintain independence
            and lead fulfilling lives.
            <br />
            <br />
            Our dedicated team is committed to delivering{" "}
            <strong>personalized care</strong>, fostering a{" "}
            <strong>sense of community</strong>, and improving the overall
            quality of life for our participants and their families.
          </p>
          <h2 style={{ fontSize: "2em", textAlign: "center" }}>
            Meet Our Staff
          </h2>
          <hr />
          <img className="staffs" src={Staffs[0].imageUrl} alt="Staff Image" />

          <h3 className="section-heading" style={{ textAlign: "left" }}>
            Administration Department
          </h3>
          <div className="staff_container">
            <div className="wrapper">
              {StaffAdmin.map((staff) => (
                <div
                  key={staff.id}
                  className={staff.id === 1 ? "no-margin" : "image"}
                >
                  <img
                    className="staff_indiv"
                    src={staff.imageUrl}
                    alt={staff.title}
                  />
                  <div className="content">
                    <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                      {staff.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="section-heading" style={{ textAlign: "left" }}>
            Programs & Activities Department
          </h3>
          <div className="staff_container">
            <div className="wrapper">
              {StaffAct.map((staff) => (
                <div
                  key={staff.id}
                  className={staff.id === 1 ? "no-margin" : "image"}
                >
                  <img
                    className="staff_indiv"
                    src={staff.imageUrl}
                    alt={staff.title}
                  />
                  <div className={"content"}>
                    <h1 style={{ textAlign: "left", fontSize: "1.8em" }}>
                      {staff.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="section-heading" style={{ textAlign: "left" }}>
            Health & Therapy Department
          </h3>
          <div className="staff_container">
            <div className="wrapper">
              {StaffHealth.map((staff) => (
                <div
                  key={staff.id}
                  className={staff.id === 1 ? "no-margin" : "image"}
                >
                  <img
                    className="staff_indiv"
                    src={staff.imageUrl}
                    alt={staff.title}
                  />
                  <div className={"content"}>
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
    </ApplicationStructure>
  );
}

export default AboutUs;
