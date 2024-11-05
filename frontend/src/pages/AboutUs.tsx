import ApplicationStructure from "../components/ApplicationStructure";
import './AboutUs.css';

import staffs from '../assets/image/staffs.jpg';
import founder from '../assets/image/staff_founder.jpg';
import director from '../assets/image/staff_director.jpg';
import recep from '../assets/image/staff_recep.jpg';
import actCoord from '../assets/image/staff_actCoord.jpg';
import PAide1 from '../assets/image/staff_PAide1.jpg';
import PAide2 from '../assets/image/staff_PAide2.jpg';
import PAide3 from '../assets/image/staff_PAide3.jpg';
import social from '../assets/image/staff_social.jpg';
import driver1 from '../assets/image/staff_driver1.jpg';
import driver2 from '../assets/image/staff_driver2.jpg';
import pt1 from '../assets/image/staff_pt1.jpg';
import pt2 from '../assets/image/staff_pt2.jpg';
import cna from '../assets/image/staff_cna.jpg';
import kitchen from '../assets/image/staff_kitchen.jpg';
import rd from '../assets/image/staff_rd.jpg';

function AboutUs() {
  return (
    <ApplicationStructure>
        <div className="whole">
            <div className="parent-container">
                <h1 style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '1.4em' }}>About </span> us
                </h1>
                <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
                    <strong>Vista Adult Day Health Care</strong> is a licensed and qualified provider of Community-Based Adult Services (CBAS), serving the Southern California community since 2007. We are committed to helping those who seek an enriched and healthy life.

                    <br /><br />

                    Our comprehensive services include individual assessment, professional nursing services, physical, occupational, and speech therapies, mental health services, therapeutic activities, social services, personal care, diverse meals, nutritional counseling, and transportation to and from surrounding areas.

                    <br /><br />

                    <strong>Our goal</strong> is to provide a community for seniors to <strong>socialize</strong> and improve their health, safety, and well-being. We offer both <em>therapeutic</em> and <em>recreational</em> services to our Vista ADHC members.

                    Our dedicated staff treats members with <strong>professionalism, dignity, and compassion</strong>, helping them restore and maintain optimal health, self-reliance, and independence. We welcome participants of all races, nationalities, and religious backgrounds.


                    Our team of highly qualified and trained healthcare professionals shares our goals and philosophy, striving to create a nurturing, inclusive, and supportive environment for all.
                </p>

                <h2 style={{ fontSize: '2em', textAlign: 'center' }}>
                    Mission Statement
                </h2>
                <hr />
                <p style={{
                    textAlign: 'center',
                    backgroundColor: "#F7F3ED",
                    padding: "30px 60px",
                    margin: "20px 80px",
                    border: "8px solid transparent",
                    borderRadius: "15px",
                    lineHeight: "1.6"
                }}>
                    <strong>Vista's mission</strong> is to provide a <strong>nurturing and inclusive environment</strong> where adults can receive comprehensive care, support, and participate in engaging activities.

                    <br /><br />

                    We aim to enhance their <em>physical, emotional, and cognitive well-being</em>, promote social interaction, and empower individuals to maintain independence and lead fulfilling lives.

                    <br /><br />

                    Our dedicated team is committed to delivering <strong>personalized care</strong>, fostering a <strong>sense of community</strong>, and improving the overall quality of life for our participants and their families.
                </p>
                <h2 style={{ fontSize: '2em', textAlign: 'center' }}>
                    Meet Our Staff
                </h2>
                <hr />
                <img className="staffs" src={staffs}/>

                <h3 className="section-heading" style={{ textAlign: 'left' }}>Administration Department</h3>
                <div className="staff_container">
                    <div className= "wrapper">
                        <div className= "image">
                            <img className = "staff_indiv" src={founder}/>
                            <div className="content_first">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>Founder</h1>
                            </div>
                        </div>

                        <div className= "image">
                            <img className = "staff_indiv" src={director}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>Project Director</h1>
                            </div>
                        </div>

                        <div className= "image" >
                            <img className = "staff_indiv" src={recep}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>
                                    Office Assist. /<br />
                                    Recep.
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="section-heading" style={{ textAlign: 'left' }}>Programs & Activities Department</h3>
                <div className="staff_container">
                    <div className= "wrapper">
                        <div className= "image">
                            <img className = "staff_indiv" src={actCoord}/>
                            <div className="content_first">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>Activities Coordinator</h1>
                            </div>
                        </div>

                        <div className= "image">
                            <img className = "staff_indiv" src={PAide1}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>Program Aide</h1>
                            </div>
                        </div>

                        <div className= "image" >
                            <img className = "staff_indiv" src={PAide2}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>Program Aide</h1>
                            </div>
                        </div>

                        <div className= "image" >
                            <img className = "staff_indiv" src={PAide3}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>Program Aide</h1>
                            </div>
                        </div>
                    </div>

                    <div className= "wrapper">
                        <div className= "image">
                            <img className = "staff_indiv" src={social}/>
                            <div className="content_first">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>Social Worker</h1>
                            </div>
                        </div>

                        <div className= "image">
                            <img className = "staff_indiv" src={driver1}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>
                                    Program Aide /<br/>
                                    Driver
                                </h1>
                            </div>
                        </div>

                        <div className= "image">
                            <img className = "staff_indiv" src={driver2}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>
                                    Program Aide /<br/>
                                    Driver
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="section-heading" style={{ textAlign: 'left' }}>Health & Therapy Department</h3>
                <div className="staff_container">
                    <div className= "wrapper">
                        <div className= "image">
                            <img className = "staff_indiv" src={pt1}/>
                            <div className="content_first">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>PT/OT Aide </h1>
                            </div>
                        </div>

                        <div className= "image">
                            <img className = "staff_indiv" src={pt2}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>PT/OT Aide </h1>
                            </div>
                        </div>

                        <div className= "image">
                            <img className = "staff_indiv" src={cna}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>CNA </h1>
                            </div>
                        </div>

                        <div className= "image">
                            <img className = "staff_indiv" src={kitchen}/>
                            <div className="content">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>
                                    Program Aide /<br/>
                                    Kitchen</h1>
                            </div>
                        </div>
                    </div>

                    <div className= "wrapper">
                        <div className= "image">
                            <img className = "staff_indiv" src={rd}/>
                            <div className="content_first">
                                <h1 style={{ textAlign: 'left' , fontSize: '1.8em'}}>RD</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </ApplicationStructure>
  );
}

export default AboutUs;